
import React from 'react';
import { SeasonType, ToolType, WeatherType } from '../types';
import { SEASONS, SEASON_CONFIG, CROPS, WEATHER_CONFIG } from '../constants';
import { BookOpen, Sprout, Droplets, Axe, Shovel, Coins, ArrowRight, Store, Backpack, TrendingUp, PlusCircle, Lock } from 'lucide-react';

// --- Header (HUD) ---

interface HeaderProps {
  season: SeasonType;
  weather: WeatherType;
  turn: number;
  money: number;
  currentMonth: number;
  unlockedAreas: number[];
  onOpenAlmanac: () => void;
  onOpenShop: () => void;
  onOpenInventory: () => void;
  onOpenStockMarket: () => void;
  onAddDebugMoney: () => void;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const Header: React.FC<HeaderProps> = ({ 
    season, weather, turn, money, currentMonth, unlockedAreas,
    onOpenAlmanac, onOpenShop, onOpenInventory, onOpenStockMarket, onAddDebugMoney
}) => {
  const weatherConfig = WEATHER_CONFIG[weather];
  const WeatherIcon = weatherConfig.icon;
  const seasonConfig = SEASON_CONFIG[season];
  const SeasonIcon = seasonConfig.icon;
  const year = Math.floor((turn) / 12) + 1;
  const isMarketUnlocked = unlockedAreas.includes(3); // Area 3 is Golden Orchard

  // Season badge colors
  const seasonBadgeColors: Record<SeasonType, string> = {
    Spring: 'bg-green-400 text-white shadow-green-200 ring-green-100',
    Summer: 'bg-orange-400 text-white shadow-orange-200 ring-orange-100',
    Autumn: 'bg-amber-500 text-white shadow-amber-200 ring-amber-100',
    Winter: 'bg-sky-400 text-white shadow-sky-200 ring-sky-100',
  };

  // Particle colors
  const particleColors: Record<SeasonType, string[]> = {
      Spring: ['bg-pink-300', 'bg-green-300', 'bg-yellow-200'],
      Summer: ['bg-yellow-400', 'bg-orange-400', 'bg-green-400'],
      Autumn: ['bg-red-400', 'bg-amber-500', 'bg-orange-300'],
      Winter: ['bg-white', 'bg-sky-200', 'bg-blue-300'],
  };

  return (
    <div className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-40 pointer-events-none flex justify-between items-start max-w-5xl mx-auto w-full font-fredoka">
      
      {/* Left: Money & Shop */}
      <div className="pointer-events-auto flex flex-col gap-3">
          <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.08)] border-2 border-white flex items-center gap-3 transition-transform hover:scale-105 group cursor-default relative">
            <div className="bg-amber-100 p-2 rounded-full group-hover:bg-amber-200 transition-colors">
              <Coins className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Farm</span>
              <span className="text-2xl font-black text-slate-700 leading-none">${money}</span>
            </div>
            <button 
                onClick={onAddDebugMoney}
                className="absolute -right-2 -top-2 text-slate-300 hover:text-green-500 transition-colors"
                title="Debug: Add $10k"
            >
                <PlusCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-2">
             <button 
                onClick={onOpenShop}
                className="flex-1 bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded-2xl shadow-lg shadow-rose-200 flex items-center justify-center gap-2 font-bold transition-all active:scale-95 border-2 border-white/20"
             >
                <Store className="w-4 h-4" /> Shop
             </button>
          </div>
      </div>

      {/* Center: Season Badge */}
      <div className="pointer-events-auto flex flex-col items-center -mt-2">
         <div className="bg-white/90 backdrop-blur-md p-2 pr-6 pl-2 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.1)] border-2 border-white flex items-center gap-4">
            
            <div key={season} className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg ring-4 ${seasonBadgeColors[season]} relative overflow-visible animate-season-pop z-10`}>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   {[...Array(12)].map((_, i) => {
                       const rotation = i * 30; 
                       const colors = particleColors[season];
                       const color = colors[i % colors.length];
                       const delay = Math.random() * 0.2; 
                       return (
                           <div 
                               key={i} 
                               className="absolute w-full h-full flex justify-center top-0 left-0"
                               style={{ transform: `rotate(${rotation}deg)` }}
                           >
                               <div 
                                   className={`w-2 h-2 rounded-full ${color} animate-explode`} 
                                   style={{ animationDelay: `${delay}s` }}
                               ></div>
                           </div>
                       );
                   })}
               </div>
               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full z-0 pointer-events-none"></div>
               <SeasonIcon className="w-7 h-7 relative z-10 drop-shadow-sm" />
               <span className="text-[10px] font-black uppercase tracking-wide relative z-10 drop-shadow-md">{season}</span>
            </div>

            <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-slate-700">Year {year}</span>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full w-10 text-center">
                        {MONTH_NAMES[currentMonth - 1]}
                    </span>
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-bold ${weather === 'Drought' || weather === 'Storm' || weather === 'Earthquake' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-500'}`}>
                    <WeatherIcon className="w-3 h-3" />
                    <span>{weatherConfig.label}</span>
                </div>
            </div>
         </div>
      </div>

      {/* Right: Buttons */}
      <div className="pointer-events-auto flex flex-col gap-2">
        <button 
          onClick={onOpenAlmanac}
          className="bg-white/90 hover:bg-white active:scale-95 transition-all text-slate-600 p-3.5 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] border-2 border-white group"
          title="Guide"
        >
          <BookOpen className="w-6 h-6 group-hover:text-amber-600 transition-colors" />
        </button>
        
        <div className="flex gap-2">
            <button 
            onClick={onOpenInventory}
            className="bg-orange-400 hover:bg-orange-500 text-white p-3.5 rounded-2xl shadow-lg shadow-orange-200 border-2 border-white/20 active:scale-95 transition-all"
            title="Backpack"
            >
            <Backpack className="w-6 h-6" />
            </button>

            <button 
            onClick={isMarketUnlocked ? onOpenStockMarket : undefined}
            disabled={!isMarketUnlocked}
            className={`p-3.5 rounded-2xl shadow-lg border-2 border-white/20 transition-all
                ${isMarketUnlocked 
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-yellow-200 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}
            `}
            title={isMarketUnlocked ? "Stalk Market" : "Unlock Golden Orchard to Access"}
            >
            {isMarketUnlocked ? <TrendingUp className="w-6 h-6" /> : <Lock className="w-6 h-6 opacity-50" />}
            </button>
        </div>
      </div>

    </div>
  );
};

// --- Action Dock (Toolbelt) ---

interface ActionDockProps {
  selectedTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  onNextMonth: () => void;
  onSelectSeed: (id: number) => void;
  selectedSeedId: number | null;
  money: number;
  season: SeasonType;
  inventory: Record<number, number>;
}

export const ActionDock: React.FC<ActionDockProps> = ({ 
  selectedTool, 
  onSelectTool, 
  onNextMonth,
  onSelectSeed,
  selectedSeedId,
  money,
  season,
  inventory
}) => {
  
  const tools = [
    { id: ToolType.WATER, icon: Droplets, label: 'Water', color: 'text-blue-500', bg: 'bg-blue-50', activeBg: 'bg-blue-500', activeColor: 'text-white' },
    { id: ToolType.SELL, icon: Coins, label: 'Sell', color: 'text-emerald-600', bg: 'bg-emerald-50', activeBg: 'bg-emerald-500', activeColor: 'text-white' },
    { id: ToolType.SHOVEL, icon: Shovel, label: 'Clear', color: 'text-rose-500', bg: 'bg-rose-50', activeBg: 'bg-rose-500', activeColor: 'text-white' },
  ];

  const handleDragStart = (e: React.DragEvent, seedId: number) => {
      e.dataTransfer.setData('seedId', seedId.toString());
      e.dataTransfer.effectAllowed = "copy";
      onSelectTool(ToolType.SEED);
      onSelectSeed(seedId);
  };

  // Filter crops to show only what is in inventory (only seeds have buyPrice > 0, so this check works if they have seeds)
  // We want to show only seeds in the seed pouch
  const ownedSeeds = CROPS.filter(crop => (inventory[crop.id] || 0) > 0 && crop.buyPrice > 0);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-30 flex flex-col items-center pointer-events-none font-fredoka">
      
      {/* Seed Pouch (Pop-up Bubble) */}
      {selectedTool === ToolType.SEED && (
        <div className="pointer-events-auto mb-6 bg-white/95 backdrop-blur-md p-3 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-4 fade-in duration-300 border border-white/50">
            
            {ownedSeeds.length === 0 ? (
                <div className="px-6 py-3 text-center">
                    <p className="text-slate-500 font-bold text-sm">No seeds!</p>
                    <p className="text-[10px] text-slate-400">Visit the Shop or Market.</p>
                </div>
            ) : (
                <div className="flex gap-3 overflow-x-auto max-w-[85vw] no-scrollbar px-1 py-1">
                {ownedSeeds.map(crop => {
                    const count = inventory[crop.id];
                    const isRecommended = crop.suitableSeasons.includes(season);
                    return (
                    <div
                        key={crop.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, crop.id)}
                        onClick={() => {
                            onSelectTool(ToolType.SEED);
                            onSelectSeed(crop.id);
                        }}
                        className={`
                        flex-shrink-0 flex flex-col items-center p-3 rounded-2xl transition-all min-w-[5.5rem] cursor-pointer relative border-2
                        ${selectedSeedId === crop.id ? 'bg-amber-100 border-amber-400 shadow-md scale-95' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-sm'}
                        active:scale-90
                        `}
                    >
                        <span className={`text-4xl mb-2 drop-shadow-sm transform transition-transform hover:scale-110 ${crop.emojiClass || ''}`}>{crop.emoji}</span>
                        <span className="text-xs font-black text-slate-600">x{count}</span>
                        {isRecommended && (
                            <div className="absolute -top-2 -right-2 bg-green-400 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm ring-2 ring-white">
                            BEST
                            </div>
                        )}
                    </div>
                    )
                })}
                </div>
            )}
        </div>
      )}

      {/* Main Toolbar - Glass Pill */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-xl p-2.5 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-white/60 flex items-center gap-3 sm:gap-5">
          
          {/* Plant Button */}
          <button
            onClick={() => onSelectTool(selectedTool === ToolType.SEED ? ToolType.NONE : ToolType.SEED)}
            className={`
               group relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex flex-col items-center justify-center transition-all duration-300
               ${selectedTool === ToolType.SEED 
                 ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 scale-110' 
                 : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}
            `}
          >
            <Sprout className={`w-7 h-7 ${selectedTool === ToolType.SEED ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold uppercase mt-1 opacity-90">Bag</span>
          </button>

          <div className="w-px h-10 bg-slate-200 mx-1"></div>

          {/* Tools */}
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => onSelectTool(selectedTool === tool.id ? ToolType.NONE : tool.id)}
              className={`
                relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-200
                ${selectedTool === tool.id 
                  ? `${tool.activeBg} ${tool.activeColor} shadow-lg scale-110 -translate-y-1` 
                  : `${tool.bg} ${tool.color} hover:scale-105 hover:bg-opacity-80`}
              `}
            >
              <tool.icon className="w-6 h-6" />
            </button>
          ))}

          <div className="w-px h-10 bg-slate-200 mx-1"></div>

          {/* Next Month (Big Pill Button) */}
          <button 
            onClick={onNextMonth}
            className="group relative px-6 h-16 sm:h-18 bg-slate-800 hover:bg-slate-900 active:scale-95 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl transition-all"
          >
            <span className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Advance</span>
            <div className="flex items-center gap-2 font-black text-lg">
               Month <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
      </div>

    </div>
  );
};
