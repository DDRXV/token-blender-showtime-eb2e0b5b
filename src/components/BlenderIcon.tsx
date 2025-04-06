
import React from 'react';

interface BlenderIconProps {
  isActive: boolean;
}

export const BlenderIcon: React.FC<BlenderIconProps> = ({ isActive }) => {
  return (
    <div className="flex justify-center py-4">
      <div className="relative w-48 h-48">
        {/* Blender base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-dyyota-gold rounded-lg z-10"></div>
        
        {/* Blender jar */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-28 h-32 bg-dyyota-lightBlue bg-opacity-50 rounded-lg overflow-hidden border-2 border-dyyota-gold">
          {/* Blender contents */}
          <div className="absolute inset-1 overflow-hidden">
            {isActive && (
              <>
                {/* Flying text particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 animate-bounce"></div>
                <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-blue-500 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-green-500 animate-ping"></div>
                <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-yellow-500 animate-bounce"></div>
                <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-red-500 animate-ping"></div>
                
                {/* Swirling effect at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-70"></div>
              </>
            )}
          </div>
        </div>
        
        {/* Blender lid */}
        <div className="absolute bottom-[10.5rem] left-1/2 transform -translate-x-1/2 w-30 h-6 bg-dyyota-gold rounded-t-lg z-20 flex justify-center items-center">
          <div className="w-6 h-6 bg-dyyota-blue rounded-full"></div>
        </div>
        
        {/* Blender blades */}
        <div className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-400 ${isActive ? 'animate-spin-slow' : ''} z-0`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-16 bg-gray-400"></div>
        </div>
        
        {/* Control button */}
        <div className={`absolute bottom-3 right-8 w-6 h-6 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} border-2 border-gray-300`}></div>
      </div>
    </div>
  );
};
