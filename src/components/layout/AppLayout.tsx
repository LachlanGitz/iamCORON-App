import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { CircleUser, LogIn } from 'lucide-react';
import { useAuth } from '@/components/auth/SessionContextProvider';
import OfflineBanner from '../OfflineBanner';

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Use the auth context

  return (
    <div className="min-h-screen bg-background pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Marble Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none dark:opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/70 dark:bg-black/50 dark:border-white/10 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-4 max-w-md mx-auto">
          <Logo />
          {loading ? (
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/50 dark:hover:bg-white/10 text-secondary dark:text-primary"
              onClick={() => navigate(user ? '/settings' : '/login')}
            >
              {user ? <CircleUser className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
            </Button>
          )}
        </div>
      </header>

      <OfflineBanner />

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto p-4 animate-in fade-in duration-500">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default AppLayout;