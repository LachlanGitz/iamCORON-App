import React from 'react';
import AppLogoImage from './AppLogoImage'; // Import the new image component

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <AppLogoImage className={className} />
  );
};