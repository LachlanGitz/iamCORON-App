import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 max-w-md mx-auto">
          <Logo />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto p-4 animate-in fade-in duration-500">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default AppLayout;