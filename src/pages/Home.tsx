import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HomeClassic from './HomeClassic';
import HomeV2 from './HomeV2';
import { Sparkles, X, ChevronUp, Layers } from 'lucide-react';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryVersion = searchParams.get('v');

  const [version, setVersion] = useState<'v1' | 'v2'>(() => {
    if (queryVersion === '1' || queryVersion === 'v1') return 'v1';
    if (queryVersion === '2' || queryVersion === 'v2') return 'v2';
    const saved = localStorage.getItem('luxcity_home_version');
    return saved === 'v1' ? 'v1' : 'v2';
  });

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('luxcity_switcher_collapsed') === 'true';
  });

  const handleVersionChange = (newVersion: 'v1' | 'v2') => {
    setVersion(newVersion);
    localStorage.setItem('luxcity_home_version', newVersion);
    setSearchParams({ v: newVersion === 'v1' ? '1' : '2' });
  };

  const toggleCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    localStorage.setItem('luxcity_switcher_collapsed', String(collapsed));
  };

  return (
    <>
      {/* Non-obstructive Collapsible Architecture Switcher (Docked in bottom-right corner) */}
      <div className="fixed bottom-5 right-5 z-50 transition-all duration-300">
        {isCollapsed ? (
          /* Collapsed discreet button */
          <button
            onClick={() => toggleCollapsed(false)}
            className="group flex items-center gap-2 bg-gray-950/90 hover:bg-gray-900 text-white backdrop-blur-xl border border-white/20 shadow-xl rounded-full px-3.5 py-2 transition-all duration-200 cursor-pointer text-xs"
            title="Expand Architecture Preview Switcher"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#DC5F12]" />
            <span className="font-medium text-slate-300 group-hover:text-white">
              {version === 'v2' ? 'v2 Preview' : 'v1 Classic'}
            </span>
            <ChevronUp className="w-3 h-3 text-slate-400 group-hover:text-white" />
          </button>
        ) : (
          /* Expanded Switcher Pill */
          <div className="bg-gray-950/95 text-white backdrop-blur-xl border border-white/20 shadow-2xl rounded-full p-1.5 flex items-center gap-1.5 sm:gap-2 text-xs animate-fadeIn">
            <div className="px-2.5 sm:px-3 py-1 text-gray-300 font-medium hidden sm:flex items-center gap-2 border-r border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-[#DC5F12]" />
              <span>Preview:</span>
            </div>

            <button
              onClick={() => handleVersionChange('v1')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                version === 'v1'
                  ? 'bg-white text-gray-950 shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="Switch to original Classic homepage"
            >
              v1 Classic
            </button>

            <button
              onClick={() => handleVersionChange('v2')}
              className={`px-3 py-1.5 rounded-full font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                version === 'v2'
                  ? 'bg-[#DC5F12] text-white shadow-md font-bold'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="Switch to research-driven parent brand architecture"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>v2 New</span>
            </button>

            {/* Collapse / Close Button */}
            <button
              onClick={() => toggleCollapsed(true)}
              className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/15 transition-colors ml-0.5 cursor-pointer"
              title="Minimize to corner"
              aria-label="Collapse switcher"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Render Active Version */}
      {version === 'v2' ? <HomeV2 /> : <HomeClassic />}
    </>
  );
}