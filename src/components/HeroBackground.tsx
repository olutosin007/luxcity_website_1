import React from 'react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wireframe Buildings */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-20">
        <div className="absolute bottom-0 left-[10%] w-24 h-64 border-2 border-indigo-500/20 rotate-3d float-slow" 
             style={{ transformStyle: 'preserve-3d' }}></div>
        <div className="absolute bottom-0 left-[30%] w-32 h-96 border-2 border-purple-500/20 rotate-3d float-slow" 
             style={{ transformStyle: 'preserve-3d', animationDelay: '-5s' }}></div>
        <div className="absolute bottom-0 right-[20%] w-40 h-80 border-2 border-indigo-500/20 rotate-3d float-slow" 
             style={{ transformStyle: 'preserve-3d', animationDelay: '-10s' }}></div>
      </div>

      {/* Blueprint Patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[15%] w-40 h-40 border border-indigo-500/10 rounded-full pulse-glow"></div>
        <div className="absolute top-[40%] right-[25%] w-32 h-32 border border-purple-500/10 rounded-full pulse-glow"
             style={{ animationDelay: '-2s' }}></div>
        <div className="absolute bottom-[30%] left-[35%] w-24 h-24 border border-indigo-500/10 rounded-full pulse-glow"
             style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Connected Dots Network */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="rgba(99, 102, 241, 0.4)" className="pulse-glow" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]"></div>
    </div>
  );
};

export default HeroBackground;