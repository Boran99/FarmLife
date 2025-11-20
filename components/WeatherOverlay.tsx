
import React from 'react';
import { SeasonType, WeatherType } from '../types';

interface WeatherOverlayProps {
  season: SeasonType;
  weather: WeatherType;
}

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ weather }) => {

  // Helper to render particles
  const Particles = ({ 
    emoji, 
    count, 
    animationName, 
    className = '',
    duration = '5s',
    delayBase = 0
  }: { 
    emoji: string, 
    count: number, 
    animationName: string, 
    className?: string,
    duration?: string,
    delayBase?: number
  }) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`absolute text-2xl select-none ${className}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
            animation: `${animationName} ${Math.random() * 2 + parseFloat(duration)}s linear infinite`,
            animationDelay: `${Math.random() * 5 + delayBase}s`, // Increased delay variance for sparse falling
            opacity: Math.random() * 0.6 + 0.4,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );

  const renderWeatherParticles = () => {
      if (weather === 'Rainy' || weather === 'Storm') {
          return (
            <>
              <div className="absolute inset-0 bg-slate-900/30 pointer-events-none mix-blend-multiply"></div>
              {/* Reduced rain count from 120 to 60 */}
              <Particles emoji="💧" count={60} animationName="rain-drop" duration="0.6s" className="text-blue-300 opacity-70 scale-75" />
              {weather === 'Storm' && (
                 <div className="absolute inset-0 bg-white animate-pulse opacity-10 pointer-events-none" style={{ animationDuration: '3s' }}></div>
              )}
              <style>{`
                @keyframes rain-drop {
                  0% { transform: translateY(-50px); opacity: 0.6; }
                  100% { transform: translateY(110vh); opacity: 0.6; }
                }
              `}</style>
            </>
          );
      }
      
      if (weather === 'Sunny') {
          return (
            <>
              <div className="absolute inset-0 bg-orange-500/10 pointer-events-none mix-blend-overlay"></div>
              {/* Sparse falling suns */}
              <Particles emoji="☀️" count={8} animationName="fall-sun" duration="8s" className="drop-shadow-md opacity-90" />
              <style>{`
                @keyframes fall-sun {
                  0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
                  10% { opacity: 1; }
                  100% { transform: translateY(110vh) rotate(360deg); opacity: 1; }
                }
              `}</style>
            </>
          );
      }

      if (weather === 'Drought') {
          return (
            <>
              <div className="absolute inset-0 bg-red-500/20 pointer-events-none mix-blend-overlay"></div>
              <Particles emoji="♨️" count={15} animationName="heat-wave" duration="2.5s" className="text-red-300 opacity-30" />
              <style>{`
                @keyframes heat-wave {
                  0% { transform: translateY(100vh) translateX(0); opacity: 0; }
                  50% { opacity: 0.5; }
                  100% { transform: translateY(50vh) translateX(20px); opacity: 0; }
                }
              `}</style>
            </>
          );
      }

      if (weather === 'Snowy') {
          return (
            <>
               <div className="absolute inset-0 bg-blue-100/10 pointer-events-none"></div>
               {/* Trace amount of snow: reduced count to 20 */}
               <Particles emoji="❄️" count={20} animationName="fall-snow-slow" className="text-white drop-shadow-md" duration="5s" />
               <style>{`
                @keyframes fall-snow-slow {
                  0% { transform: translateY(-50px) translateX(0); opacity: 0; }
                  10% { opacity: 0.9; }
                  100% { transform: translateY(110vh) translateX(-20px); opacity: 0.9; }
                }
              `}</style>
            </>
          );
      }

      if (weather === 'Earthquake') {
          return (
            <>
               <Particles emoji="☁️" count={40} animationName="quake-dust" className="text-stone-600 opacity-40 scale-150" duration="2s" />
               <Particles emoji="🪨" count={10} animationName="quake-debris" className="text-stone-800" duration="1s" />
               <style>{`
                @keyframes quake-dust {
                  0% { transform: translateY(100vh) scale(1); opacity: 0; }
                  20% { opacity: 0.5; }
                  100% { transform: translateY(0) scale(2); opacity: 0; }
                }
                @keyframes quake-debris {
                  0% { transform: translateY(-50px); opacity: 1; }
                  100% { transform: translateY(100vh); opacity: 1; }
                }
              `}</style>
            </>
          );
      }
      return null;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {renderWeatherParticles()}
    </div>
  );
};
