
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Factory as FactoryIcon, Settings, Hammer, Lock, Clock, Zap, ShoppingCart, ArrowRight } from 'lucide-react';
import { CROPS, RECIPES } from '../constants';
import { ProcessingJob } from '../types';
import { ItemIcon } from './Icons';

interface FactoryProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Record<number, number>;
  money: number;
  activeJobs: ProcessingJob[];
  factorySlots: number;
  factoryHoppers: boolean[];
  hasConveyor: boolean;
  onStartJob: (recipeId: number) => void;
  onCollectJob: (jobId: string) => void;
  onBuySlot: () => void;
  t: (key: string) => string;
}

export const Factory: React.FC<FactoryProps> = ({ 
    isOpen, onClose, inventory, money, activeJobs, factorySlots, 
    factoryHoppers, hasConveyor,
    onStartJob, onCollectJob, onBuySlot, t
}) => {
  const [, setTick] = useState(0);
  useEffect(() => {
      const interval = setInterval(() => setTick(t => t + 1), 100);
      return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const SLOT_COST = 5000 * factorySlots;
  const now = Date.now();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-slate-200 font-fredoka overflow-hidden flex flex-col animate-in fade-in duration-300">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/20 to-transparent"></div>
            <Settings className="absolute top-10 right-10 w-96 h-96 text-slate-700 animate-spin-slow" />
            <Settings className="absolute bottom-10 left-10 w-64 h-64 text-slate-700 animate-spin-reverse-slow" />
        </div>

        {/* Header */}
        <div className="relative z-10 p-6 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex justify-between items-center shadow-xl">
             <div className="flex items-center gap-4">
                 <button 
                    onClick={onClose}
                    className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg border border-slate-600"
                 >
                     <ArrowLeft className="w-6 h-6" />
                 </button>
                 <div>
                     <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-wide">
                         <FactoryIcon className="w-8 h-8 text-cyan-400" /> 
                         {t('TECH_BARN')} <span className="text-xs bg-cyan-500 text-slate-900 px-2 py-0.5 rounded font-bold tracking-normal">LVL {factorySlots}</span>
                     </h1>
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Automated Processing Unit</p>
                 </div>
             </div>
             
             <div className="flex items-center gap-6">
                 <div className="flex flex-col items-end">
                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Funds</span>
                     <span className="text-xl font-black text-white">${money}</span>
                 </div>
             </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative z-10">
            
            {/* Left: Blueprints (Recipes) */}
            <div className="w-1/3 bg-slate-800/50 border-r border-slate-700 flex flex-col">
                <div className="p-4 bg-slate-800 border-b border-slate-700">
                    <h2 className="font-black text-slate-300 uppercase tracking-wide text-sm flex items-center gap-2">
                        <Settings className="w-4 h-4" /> {t('PRODUCTION_BLUEPRINTS')}
                    </h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {RECIPES.map(recipe => {
                        const inputItem = CROPS.find(c => c.id === recipe.inputItemId);
                        const outputItem = CROPS.find(c => c.id === recipe.outputItemId);
                        if (!inputItem || !outputItem) return null;

                        const owned = inventory[recipe.inputItemId] || 0;
                        const canAfford = owned >= recipe.inputCount;
                        const hasSpace = activeJobs.length < factorySlots;

                        return (
                            <div key={recipe.id} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
                                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-800 p-2 rounded-lg w-12 h-12 shadow-inner border border-slate-600">
                                            <ItemIcon name={outputItem.iconKey} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{outputItem.name}</h4>
                                            <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono">
                                                <Clock className="w-3 h-3" /> {recipe.realTimeSeconds}s
                                            </div>
                                        </div>
                                    </div>
                                    <span className="font-mono text-emerald-400 font-bold">${outputItem.sellPrice}</span>
                                </div>

                                <div className="bg-slate-800/80 p-2 rounded-lg flex justify-between items-center mb-3">
                                     <div className="text-xs text-slate-400 font-bold flex items-center gap-2">
                                         REQ: <span className="w-4 h-4 inline-block"><ItemIcon name={inputItem.iconKey} /></span> x{recipe.inputCount}
                                     </div>
                                     <span className={`text-xs font-black ${canAfford ? 'text-white' : 'text-red-400'}`}>
                                         {t('OWNED')}: {owned}
                                     </span>
                                </div>

                                <button 
                                    onClick={() => canAfford && hasSpace && onStartJob(recipe.id)}
                                    disabled={!canAfford || !hasSpace}
                                    className={`w-full py-3 rounded-lg font-black text-xs uppercase tracking-wider transition-all active:scale-95
                                        ${canAfford && hasSpace 
                                            ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]' 
                                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
                                    `}
                                >
                                    {!hasSpace ? t('LINES_FULL') : !canAfford ? t('INSUFFICIENT_INPUT') : t('START_JOB')}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Active Lines */}
            <div className="flex-1 bg-slate-900 p-8 overflow-y-auto relative flex">
                 {/* Conveyor Background */}
                 {hasConveyor && (
                     <div className="absolute right-0 top-0 bottom-0 w-24 bg-slate-950 border-l border-slate-800 flex flex-col items-center justify-center z-20 shadow-2xl">
                         <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMEw0MCA0ME0wIDQwTDQwIDAiIHN0cm9rZT0iIzIyMiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] animate-[slide-down_2s_linear_infinite]"></div>
                         <ArrowRight className="w-8 h-8 text-green-500/50 rotate-90 mb-8" />
                         <span className="text-[10px] font-mono text-green-500 rotate-90 whitespace-nowrap">AUTO-EXPORT</span>
                         <ArrowRight className="w-8 h-8 text-green-500/50 rotate-90 mt-8" />
                         <style>{`@keyframes slide-down { from { background-position: 0 0; } to { background-position: 0 40px; } }`}</style>
                     </div>
                 )}

                 <div className="flex-1 z-10">
                     <h2 className="font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                        <Hammer className="w-5 h-5" /> Manufacturing Floor
                     </h2>

                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10 pr-8">
                         {/* Slots */}
                         {Array.from({ length: factorySlots }).map((_, idx) => {
                             const job = activeJobs.find(j => j.slotIndex === idx);
                             const hasHopper = factoryHoppers[idx];

                             if (job) {
                                 const recipe = RECIPES.find(r => r.id === job.recipeId);
                                 const outputItem = recipe ? CROPS.find(c => c.id === recipe.outputItemId) : null;
                                 
                                 const totalDuration = job.endTime - job.startTime;
                                 const elapsed = now - job.startTime;
                                 const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
                                 const isFinished = pct >= 100;

                                 return (
                                     <div key={job.id} className="bg-slate-800 border border-slate-600 p-5 rounded-2xl shadow-2xl relative overflow-visible group mt-4">
                                         {/* Hopper Visual */}
                                         {hasHopper && (
                                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-slate-700 rounded-t-lg border-t border-x border-slate-500 flex items-center justify-center shadow-lg z-0">
                                                 <ShoppingCart className="w-4 h-4 text-green-500" />
                                             </div>
                                         )}

                                         <div className={`absolute inset-0 transition-opacity duration-500 rounded-2xl ${isFinished ? 'bg-emerald-500/10' : 'bg-cyan-500/5'}`}></div>
                                         
                                         <div className="flex justify-between items-start mb-6 relative z-10">
                                             <div className="flex items-center gap-4">
                                                 <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-slate-600 bg-slate-900 relative`}>
                                                     {outputItem && <ItemIcon name={outputItem.iconKey} />}
                                                     {!isFinished && (
                                                         <div className="absolute inset-0 border-2 border-cyan-500/50 rounded-xl animate-pulse"></div>
                                                     )}
                                                 </div>
                                                 <div>
                                                     <h3 className="font-black text-white text-lg">{recipe?.name}</h3>
                                                     <p className="text-xs font-mono text-cyan-400">
                                                         {isFinished ? t('COMPLETE') : `${t('PROCESSING')} ${(Math.max(0, (job.endTime - now)/1000)).toFixed(1)}s`}
                                                     </p>
                                                 </div>
                                             </div>
                                             {isFinished && !hasConveyor ? (
                                                 <button 
                                                    onClick={() => onCollectJob(job.id)}
                                                    className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-bounce"
                                                 >
                                                     {t('COLLECT')}
                                                 </button>
                                             ) : (
                                                 <Settings className={`w-6 h-6 text-slate-600 ${!isFinished ? 'animate-spin' : ''}`} />
                                             )}
                                         </div>

                                         <div className="h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-700 relative z-10">
                                             <div 
                                                className={`h-full transition-all duration-100 relative ${isFinished ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                                                style={{ width: `${pct}%` }}
                                             ></div>
                                         </div>
                                     </div>
                                 );
                             } else {
                                 return (
                                     <div key={`empty-${idx}`} className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-600 bg-slate-800/30 relative mt-4">
                                        {hasHopper && (
                                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-8 bg-slate-700 rounded-t-lg border-t border-x border-slate-500 flex items-center justify-center shadow-lg z-0">
                                                 <ShoppingCart className="w-4 h-4 text-green-500" />
                                             </div>
                                         )}
                                         <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center mb-3">
                                             <Zap className="w-6 h-6" />
                                         </div>
                                         <span className="font-bold uppercase tracking-wider text-xs">System Standby</span>
                                     </div>
                                 );
                             }
                         })}

                         {/* Expansion Slot */}
                         {factorySlots < 4 && (
                             <button 
                                 onClick={onBuySlot}
                                 className="mt-4 border-2 border-dashed border-amber-500/30 bg-amber-500/5 rounded-2xl p-8 flex flex-col items-center justify-center text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all group"
                             >
                                 <Lock className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                 <span className="font-black text-sm uppercase tracking-wider">{t('NEW_LINE')}</span>
                                 <span className="text-xs font-mono mt-1 opacity-80 group-hover:opacity-100">${SLOT_COST}</span>
                             </button>
                         )}
                     </div>
                 </div>
            </div>

        </div>
    </div>
  );
};
