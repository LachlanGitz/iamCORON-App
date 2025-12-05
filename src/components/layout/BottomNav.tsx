import React from 'react';
import { Home, Phone, AlertTriangle, Map, LayoutGrid } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutGrid, label: 'Services', path: '/services' },
    { icon: Phone, label: 'Emergency', path: '/emergency' },
    { icon: AlertTriangle, label: 'Report', path: '/report' },
    { icon: Map, label: 'Map', path: '/map' },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-panel rounded-2xl mx-auto max-w-md shadow-2xl border border-white/50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative",
                  isActive ? "text-secondary" : "text-gray-400 hover:text-secondary/70"
                )}
              >
                {isActive && (
                  <div className="absolute -top-3 w-8 h-1 bg-secondary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                )}
                <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive && "-translate-y-1")} />
                <span className={cn("text-[10px] font-medium transition-opacity duration-300", isActive ? "opacity-100" : "opacity-70")}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;