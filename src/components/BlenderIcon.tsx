
import React from 'react';

interface BlenderIconProps {
  isActive: boolean;
}

export const BlenderIcon: React.FC<BlenderIconProps> = ({ isActive }) => {
  return (
    <div className={`flex justify-center ${isActive ? 'animate-bounce-gentle' : ''}`}>
      <div className="relative w-24 h-24">
        {/* Blender face */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 flex justify-center items-center w-full">
          {/* Eyes */}
          <div className="flex gap-3">
            <div className="w-2.5 h-2.5 bg-white rounded-full border border-dyyota-darkGray relative">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-dyyota-blue rounded-full"></div>
            </div>
            <div className="w-2.5 h-2.5 bg-white rounded-full border border-dyyota-darkGray relative">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-dyyota-blue rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Mouth - smiling when active */}
        <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 z-30 w-5 h-2 ${isActive ? 'bg-transparent border-b-2 border-dyyota-darkGray rounded-b-full' : 'bg-transparent border-b border-dyyota-darkGray'}`}></div>

        {/* Blender base */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-dyyota-gold rounded-lg z-10 shadow-md"></div>
        
        {/* Blender jar */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-14 h-16 bg-dyyota-lightBlue bg-opacity-50 rounded-lg overflow-hidden border-2 border-dyyota-gold shadow-lg">
          {/* Blender contents */}
          <div className="absolute inset-1 overflow-hidden rounded">
            {isActive ? (
              <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-b from-transparent via-transparent to-purple-200">
                {/* Flying text particles */}
                <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-purple-400 animate-bounce opacity-80"></div>
                <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 animate-ping opacity-80"></div>
                <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-pink-400 animate-ping opacity-80"></div>
                <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-yellow-300 animate-bounce opacity-80"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-red-400 animate-ping opacity-80"></div>
                
                {/* Text fragments */}
                <div className="absolute top-1/3 right-1/4 text-[8px] text-blue-500 font-bold animate-float">T</div>
                <div className="absolute top-2/3 left-1/3 text-[8px] text-purple-500 font-bold animate-float-reverse">k</div>
                <div className="absolute top-1/2 right-1/3 text-[8px] text-pink-500 font-bold animate-float">n</div>
                
                {/* Swirling effect at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-70 animate-pulse"></div>
              </div>
            ) : (
              <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 opacity-50"></div>
            )}
          </div>
        </div>
        
        {/* Blender lid */}
        <div className="absolute bottom-[5.5rem] left-1/2 transform -translate-x-1/2 w-15 h-3.5 bg-dyyota-gold rounded-t-lg z-20 flex justify-center items-center shadow-sm">
          <div className="w-3.5 h-3.5 bg-dyyota-blue rounded-full"></div>
        </div>
        
        {/* Blender blades */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-400 ${isActive ? 'animate-spin-slow' : ''} z-0`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-gray-400"></div>
        </div>
        
        {/* Control button with glow */}
        <div className={`absolute bottom-1.5 right-3 w-3 h-3 rounded-full ${isActive ? 'bg-green-500 shadow-glow' : 'bg-red-500'} border-2 border-gray-300`}></div>
      </div>
    </div>
  );
};
