
import React from 'react';

interface BlenderIconProps {
  isActive: boolean;
}

export const BlenderIcon: React.FC<BlenderIconProps> = ({ isActive }) => {
  return (
    <div className="flex justify-center">
      <div className="relative w-20 h-20">
        {/* Blender base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-dyyota-gold rounded-lg z-10"></div>
        
        {/* Blender jar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-14 bg-dyyota-lightBlue bg-opacity-50 rounded-lg overflow-hidden border-2 border-dyyota-gold">
          {/* Blender contents */}
          <div className="absolute inset-1 overflow-hidden">
            {isActive && (
              <>
                {/* Flying text particles */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-500 animate-bounce"></div>
                <div className="absolute top-1/3 left-1/2 w-1.5 h-1.5 bg-blue-500 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-green-500 animate-ping"></div>
                <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-yellow-500 animate-bounce"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-red-500 animate-ping"></div>
                
                {/* Swirling effect at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-70"></div>
              </>
            )}
          </div>
        </div>
        
        {/* Blender lid */}
        <div className="absolute bottom-[4.5rem] left-1/2 transform -translate-x-1/2 w-13 h-3 bg-dyyota-gold rounded-t-lg z-20 flex justify-center items-center">
          <div className="w-3 h-3 bg-dyyota-blue rounded-full"></div>
        </div>
        
        {/* Blender blades */}
        <div className={`absolute bottom-7 left-1/2 transform -translate-x-1/2 w-7 h-1 bg-gray-400 ${isActive ? 'animate-spin-slow' : ''} z-0`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-7 bg-gray-400"></div>
        </div>
        
        {/* Control button */}
        <div className={`absolute bottom-1 right-3 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} border-2 border-gray-300`}></div>
      </div>
    </div>
  );
};
