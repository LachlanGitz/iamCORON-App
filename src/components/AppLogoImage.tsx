import React from 'react';
import { cn } from '@/lib/utils';

interface AppLogoImageProps {
  className?: string;
}

const AppLogoImage: React.FC<AppLogoImageProps> = ({ className }) => {
  return (
    <img
      src="/app-logo.png" // Path to the uploaded logo image
      alt="iamCORON Logo"
      className={cn("h-10 w-auto", className)} // Default size, can be overridden
    />
  );
};

export default AppLogoImage;