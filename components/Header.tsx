
import React from 'react';
import { AppMode } from '../types';

interface HeaderProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  onOpenBookings: () => void;
}

const Header: React.FC<HeaderProps> = ({ mode, setMode, onOpenBookings }) => {
  return (
    <header className="sticky top-0 z-40 glass-effect border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-anchor"></i>
          </div>
          <span className="text-xl font-bold text-sky-600">Driftly</span>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setMode(mode === 'user' ? 'owner' : 'user')}
            className="text-xs font-medium bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
          >
            {mode === 'user' ? 'Switch to Owner' : 'Switch to User'}
          </button>
          
          {mode === 'user' && (
            <button 
              onClick={onOpenBookings}
              className="text-slate-600 hover:text-sky-500"
            >
              <i className="fas fa-calendar-check text-xl"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
