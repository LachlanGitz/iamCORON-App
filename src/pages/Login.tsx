import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { useTheme } from 'next-themes'; // Import useTheme

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme from next-themes

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
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Welcome Back!</h2>
        <Auth
          supabaseClient={supabase}
          providers={[]} // Only email/password by default
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
                  // Adjust anchor text color for better visibility in dark mode
                  anchorTextColor: theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                  anchorTextHoverColor: theme === 'dark' ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))',
                },
              },
            },
          }}
          theme={theme === 'dark' ? 'dark' : 'light'} // Dynamically set theme based on app's theme
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Your password',
                button_label: 'Sign In',
                loading_button_label: 'Signing In...',
                link_text: 'Already have an account? Sign In',
              },
              sign_up: {
                email_label: 'Email address',
                password_label: 'Create a Password',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Your password',
                button_label: 'Sign Up',
                loading_button_label: 'Signing Up...',
                link_text: 'Don\'t have an account? Sign Up',
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
      </div>
    </div>
  );
};

export default Login;