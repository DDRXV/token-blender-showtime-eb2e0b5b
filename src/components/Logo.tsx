
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <img 
      src="/lovable-uploads/1755dfeb-5882-4f23-a578-ddead4e0e2e0.png" 
      alt="Dyyota Logo" 
      className={`h-10 ${className}`}
    />
  );
};
