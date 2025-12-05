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
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-md z-50 pb-safe shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          // Check if active, including sub-routes for services
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200",
                isActive ? "text-secondary font-semibold" : "text-muted-foreground hover:text-secondary/70"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-current scale-110")} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;