import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { CircleUser } from 'lucide-react';

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900 pb-20 relative overflow-hidden transition-colors duration-300">
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/50 dark:hover:bg-white/10 text-secondary dark:text-primary"
            onClick={() => navigate('/settings')}
          >
            <CircleUser className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto p-4 animate-in fade-in duration-500">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default AppLayout;