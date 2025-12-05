import React from 'react';
import { Palmtree } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary/20 p-2 rounded-full border border-primary/20">
        <Palmtree className="h-6 w-6 text-primary fill-primary/20" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold text-secondary uppercase tracking-widest">iam</span>
        <span className="text-xl font-black text-secondary tracking-tighter drop-shadow-sm">CORON</span>
      </div>
    </div>
  );
};