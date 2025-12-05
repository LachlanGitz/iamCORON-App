import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = async (userId: string) => {
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
      return data; // Return data for immediate check
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      toast.error('Failed to load user profile.');
      return null;
    }
  };

  useEffect(() => {
    const handleAuthChange = async (event: string, currentSession: Session | null) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setLoading(true);

      if (currentSession?.user) {
        const userProfile = await fetchProfile(currentSession.user.id);
        // Check if profile is incomplete and redirect to settings
        if (userProfile && (!userProfile.first_name || !userProfile.user_type) && location.pathname !== '/settings') {
          toast.info("Please complete your profile details to continue.");
          navigate('/settings');
        } else if (location.pathname === '/login') {
          // If user just logged in and profile is complete, redirect to home
          navigate('/');
        }
      } else {
        setProfile(null); // Clear profile on sign out
        // If signed out and trying to access a protected route, redirect to login
        const protectedRoutes = ['/settings']; // Define routes that require authentication
        if (protectedRoutes.includes(location.pathname)) {
          toast.info("Please log in to access this page.");
          navigate('/login');
        }
      }
      setLoading(false);
    };

    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleAuthChange('INITIAL_SESSION', session);
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
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