import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react'; // Keep Auth for password reset flow if needed
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignUpForm from '@/components/auth/SignUpForm';
import SignInForm from '@/components/auth/SignInForm'; // Import the new SignInForm
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // This toast is now handled by SessionContextProvider
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="mb-8">
        <Logo className="scale-125" />
      </div>
      <div className="w-full max-w-md glass-panel p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Welcome!</h2>
        
        <Tabs defaultValue="signIn" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signIn" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Sign In
            </TabsTrigger>
            <TabsTrigger value="signUp" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" /> Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signIn">
            <SignInForm />
          </TabsContent>

          <TabsContent value="signUp">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;