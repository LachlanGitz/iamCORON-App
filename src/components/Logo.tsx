import React from 'react';
import { Palmtree } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary/10 p-2 rounded-full">
        <Palmtree className="h-6 w-6 text-primary" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">iam</span>
        <span className="text-xl font-black text-primary tracking-tighter">CORON</span>
      </div>
    </div>
  );
};