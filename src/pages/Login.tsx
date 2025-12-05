import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { useTheme } from 'next-themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Import Tabs components
import SignUpForm from '@/components/auth/SignUpForm'; // Import the new SignUpForm
import { LogIn, UserPlus } from 'lucide-react'; // Import icons

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
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary-foreground))',
                      inputBackground: 'hsl(var(--input))',
                      inputBorder: 'hsl(var(--border))',
                      inputBorderHover: 'hsl(var(--ring))',
                      inputBorderFocus: 'hsl(var(--ring))',
                      inputText: 'hsl(var(--foreground))',
                      inputPlaceholder: 'hsl(var(--muted-foreground))',
                      messageText: 'hsl(var(--foreground))',
                      messageBackground: 'hsl(var(--background))',
                      anchorTextColor: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                      anchorTextHoverColor: theme === 'dark' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
                    },
                  },
                },
              }}
              theme={theme === 'dark' ? 'dark' : 'light'}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email address',
                    password_label: 'Password',
                    email_input_placeholder: 'Your email address',
                    password_input_placeholder: 'Your password',
                    button_label: 'Sign In',
                    loading_button_label: 'Signing In...',
                    link_text: 'Forgot your password?', // Only show forgot password here
                  },
                  forgotten_password: {
                    email_label: 'Email address',
                    email_input_placeholder: 'Your email address',
                    button_label: 'Send Reset Instructions',
                    loading_button_label: 'Sending Instructions...',
                    link_text: 'Forgot your password?',
                  },
                  update_password: {
                    password_label: 'New Password',
                    password_input_placeholder: 'Your new password',
                    button_label: 'Update Password',
                    loading_button_label: 'Updating Password...',
                  },
                },
              }}
            />
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