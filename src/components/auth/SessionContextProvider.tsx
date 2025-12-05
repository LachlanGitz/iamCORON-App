import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null; // To store the public.profiles data
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Initial state is true
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize fetchProfile to prevent unnecessary re-creations
  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        throw error;
      }
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      toast.error('Failed to load user profile.');
      return null;
    }
  }, []); // No dependencies, as it only uses supabase client and setters

  // Effect for initial session and auth state listener
  useEffect(() => {
    const getInitialSession = async () => {
      setLoading(true); // Start loading for initial session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      // Do NOT set loading to false here. Let the user-dependent effect handle it.
      // This ensures that if a user is found, the profile fetching also happens under 'loading' state.
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, currentSession) => {
      // Only set loading true if it's a significant auth event, not just token refresh
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
        setLoading(true); // Indicate loading for these major auth state changes
      }
      setSession(currentSession);
      setUser(currentSession?.user || null);
      // setLoading(false) will be handled by the user-dependent effect
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array: runs once on mount

  // Effect to react to user changes (fetch profile, handle redirects)
  useEffect(() => {
    const handleUserDependentActions = async () => {
      if (user) {
        // If user exists, fetch profile and handle redirects
        const userProfile = await fetchProfile(user.id);
        if (userProfile && (!userProfile.first_name || !userProfile.user_type) && location.pathname !== '/settings') {
          toast.info("Please complete your profile details to continue.");
          navigate('/settings');
        } else if (location.pathname === '/login') {
          navigate('/');
        }
      } else {
        // If no user, clear profile and handle protected routes
        setProfile(null);
        const protectedRoutes = ['/settings'];
        if (protectedRoutes.includes(location.pathname)) {
          toast.info("Please log in to access this page.");
          navigate('/login');
        }
      }
      setLoading(false); // Always set loading to false after all user-dependent actions are complete
    };

    // Only run this effect if the user object has actually changed, or if it's the initial load and user is null.
    // The initial setLoading(true) is handled by the first useEffect.
    // This effect will ensure setLoading(false) is called after all user-related async ops.
    handleUserDependentActions();
  }, [user, fetchProfile, navigate, location.pathname]); // Dependencies: user, fetchProfile, navigate, location.pathname

  const refreshProfile = async () => {
    if (user) {
      setLoading(true); // Start loading for manual refresh
      await fetchProfile(user.id);
      setLoading(false); // End loading after manual refresh
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, fetchProfile: refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};