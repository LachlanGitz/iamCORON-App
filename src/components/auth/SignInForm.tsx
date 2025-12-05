"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, User as UserIcon } from 'lucide-react'; // Removed Mail icon as email is internal
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call RPC to get the internal email based on the provided username
      const { data: internalEmail, error: rpcError } = await supabase.rpc('get_internal_email_by_username', {
        p_username: username,
      });

      if (rpcError || !internalEmail) {
        throw new Error('Invalid username or password.'); // Generic error for security
      }

      // 2. Sign in using the internal email and provided password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: internalEmail,
        password,
      });

      if (authError) {
        throw authError;
      }

      toast.success("Signed in successfully!");
      navigate('/'); // Redirect to home page
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      toast.error("Sign in failed", { description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="username"
            type="text"
            placeholder="yourusername"
            className="pl-9"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      <div className="text-center text-sm mt-4">
        <a href="#" className="text-primary hover:underline" onClick={() => toast.info("Please contact support to reset your password.")}>
          Forgot your password?
        </a>
      </div>
    </form>
  );
};

export default SignInForm;