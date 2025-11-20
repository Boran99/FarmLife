
import React, { useState } from 'react';
import { X, BookOpen, HelpCircle, Sprout, Droplets, Coins, Calendar, CloudRain, TrendingUp, Factory, ShieldCheck, Rocket, Snowflake, Sun, AlertTriangle, Zap, Monitor, ArrowRight } from 'lucide-react';
import { CROPS } from '../constants';
import { ItemIcon } from './Icons';

interface AlmanacProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Almanac: React.FC<AlmanacProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'CROPS'>('GUIDE');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh] relative border-4 border-slate-100">
        
        {/* Header */}
        <div className="p-6 pb-0 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-2xl">
               <BookOpen className="w-8 h-8 text-amber-600" />
            </div>
            <div>
                <h2 className="text-3xl font-black text-slate-800">Farm Guide</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">The Seasonal Steward</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 mt-6 gap-4 border-b border-slate-100">
            <button 
                onClick={() => setActiveTab('GUIDE')}
                className={`pb-4 px-2 font-black text-sm uppercase tracking-wide transition-all border-b-4 ${activeTab === 'GUIDE' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                <span className="flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Tutorial</span>
            </button>
            <button 
                onClick={() => setActiveTab('CROPS')}
                className={`pb-4 px-2 font-black text-sm uppercase tracking-wide transition-all border-b-4 ${activeTab === 'CROPS' ? 'border-green-500 text-green-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
                <span className="flex items-center gap-2"><Sprout className="w-4 h-4" /> Encyclopedia</span>
            </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
            {activeTab === 'GUIDE' ? <TutorialContent /> : <CropList />}
        </div>
        
      </div>
    </div>
  );
};

// --- Sub-Components ---

const TutorialContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto pb-10">
        
        {/* 1. The Basics */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-xl font-black text-slate-700 mb-4 flex items-center gap-2">
                <Sprout className="w-6 h-6 text-green-500" /> Farming Basics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">1. Plant</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        Select a seed from your bag. Drag it or click to plant on an empty tile. Different crops need specific seasons!
                    </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-1 flex items-center gap-2">2. Water</h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                        Soil needs moisture (>0%) to grow. Select the <Droplets className="inline w-3 h-3" /> tool and click to water. Costs <strong>$5</strong>.
                    </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                    <h4 className="font-bold text-amber-800 mb-1 flex items-center gap-2">3. Profit</h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                        When mature: 
                        <br/>• Click with <Coins className="inline w-3 h-3"/> to <strong>Sell</strong> immediately.
                        <br/>• Click with Hand (No Tool) to <strong>Harvest</strong> to Backpack.
                    </p>
                </div>
            </div>
        </section>

        {/* 2. Seasons & Weather */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-700 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" /> Time & Seasons
            </h3>
            
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-green-50 p-2 rounded-xl">
                        <p className="text-xs font-bold text-green-700 uppercase">Spring</p>
                        <p className="text-[10px] text-green-600">Jan - Mar</p>
                    </div>
                    <div className="bg-orange-50 p-2 rounded-xl">
                        <p className="text-xs font-bold text-orange-700 uppercase">Summer</p>
                        <p className="text-[10px] text-orange-600">Apr - Jun</p>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-xl">
                        <p className="text-xs font-bold text-amber-700 uppercase">Autumn</p>
                        <p className="text-[10px] text-amber-600">Jul - Sep</p>
                    </div>
                    <div className="bg-sky-50 p-2 rounded-xl">
                        <p className="text-xs font-bold text-sky-700 uppercase">Winter</p>
                        <p className="text-[10px] text-sky-600">Oct - Dec</p>
                    </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-2">
                    <p className="text-xs text-slate-600 font-medium">
                        <strong>Growth:</strong> Crops take several months to grow. A "3 Mo" crop planted in Jan (Spring) will be ready in Apr (Summer).
                    </p>
                    <div className="flex gap-2 flex-wrap">
                         <span className="px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Droughts dry soil instantly
                         </span>
                         <span className="px-2 py-1 bg-stone-100 text-stone-600 text-[10px] font-bold rounded flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Earthquakes break land
                         </span>
                    </div>
                </div>
            </div>
        </section>

        {/* 3. FarmOS Automation */}
        <section className="bg-slate-900 text-green-400 p-6 rounded-3xl shadow-lg border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Monitor className="w-32 h-32 -mr-6 -mt-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2 relative z-10">
                <Monitor className="w-6 h-6 text-green-500" /> FarmOS Automation
            </h3>
            <p className="text-xs text-green-200 mb-4 relative z-10">
                Use the <strong>OS</strong> button to buy upgrades for each farm area.
            </p>
            <div className="space-y-3 relative z-10">
                <div className="flex items-start gap-3">
                    <div className="bg-green-900/50 p-1.5 rounded text-green-400"><Droplets className="w-4 h-4" /></div>
                    <div>
                        <p className="text-sm font-bold text-white">Smart Irrigation ($5k)</p>
                        <p className="text-[10px] text-slate-400">Keeps moisture above 50% automatically. Fails during droughts.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-green-900/50 p-1.5 rounded text-green-400"><Rocket className="w-4 h-4" /></div>
                    <div>
                        <p className="text-sm font-bold text-white">Harvest Drone ($15k)</p>
                        <p className="text-[10px] text-slate-400">Auto-harvests mature crops. Toggle between "Harvest to Bag" or "Auto-Sell".</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="bg-green-900/50 p-1.5 rounded text-green-400"><Sprout className="w-4 h-4" /></div>
                    <div>
                        <p className="text-sm font-bold text-white">Auto Seeder ($30k)</p>
                        <p className="text-[10px] text-slate-400">Automatically replants your selected seed if the tile is empty.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* 4. The Stalk Market */}
        <section className="bg-yellow-50 p-6 rounded-3xl shadow-sm border border-yellow-100">
            <h3 className="text-xl font-black text-yellow-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" /> The Stalk Market
            </h3>
            <p className="text-xs text-yellow-900 mb-3">
                <strong>Golden Apples</strong> (Area 3) fluctuate wildly in price.
            </p>
            
            <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-3 rounded-xl border border-yellow-200 shadow-sm">
                    <h4 className="font-black text-emerald-700 text-sm mb-1">📉 Put Option (Insurance)</h4>
                    <p className="text-[10px] text-slate-600">
                        Pay 1 Apple now to lock in the current HIGH price. If the market crashes next month, exercise it to sell at the old high price.
                    </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-yellow-200 shadow-sm">
                    <h4 className="font-black text-rose-700 text-sm mb-1">📈 Call Option (Pre-order)</h4>
                    <p className="text-[10px] text-slate-600">
                        Pay 1 Apple now to lock in the current LOW price. If the market explodes next month, exercise it to buy cheap and sell high instantly.
                    </p>
                </div>
            </div>
        </section>

        {/* 5. Factory */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-xl font-black text-slate-700 mb-4 flex items-center gap-2">
                <Factory className="w-6 h-6 text-cyan-500" /> The Workshop
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-4">
                        Turn raw crops into high-value goods. This runs in <strong>Real Time</strong> (Seconds), not game months.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Wheat ➔ Flour
                        </li>
                        <li className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Sunflower ➔ Oil
                        </li>
                        <li className="flex items-center gap-2 text-xs font-bold text-slate-700">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Grapes ➔ Wine
                        </li>
                    </ul>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                     <h4 className="font-bold text-slate-800 mb-2 text-sm">Factory Upgrades</h4>
                     <div className="space-y-2">
                         <div className="flex justify-between text-xs">
                             <span className="text-slate-500">Input Hopper</span>
                             <span className="font-bold text-cyan-600">Auto-restarts jobs</span>
                         </div>
                         <div className="flex justify-between text-xs">
                             <span className="text-slate-500">Conveyor Belt</span>
                             <span className="font-bold text-green-600">Auto-collects output</span>
                         </div>
                     </div>
                </div>
            </div>
        </section>

    </div>
);

const CropList = () => (
    <div className="space-y-4 pb-10">
        {CROPS.filter(c => c.buyPrice > 0).map((crop) => (
            <div key={crop.id} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition bg-white group">
            <div className={`w-12 h-12 bg-slate-50 p-1 rounded-2xl group-hover:scale-110 transition-transform`}>
                <ItemIcon name={crop.iconKey} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                <h3 className="font-black text-lg text-slate-800">{crop.name}</h3>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-400">Seed Cost</span>
                    <span className="font-black text-rose-500">-${crop.buyPrice}</span>
                </div>
                </div>
                
                <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">{crop.description}</p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                {crop.suitableSeasons.map((season) => {
                    const colors: Record<string, string> = {
                        Spring: 'bg-green-100 text-green-700',
                        Summer: 'bg-orange-100 text-orange-700',
                        Autumn: 'bg-amber-100 text-amber-800',
                        Winter: 'bg-sky-100 text-sky-700',
                    }
                    return (
                    <span key={season} className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${colors[season]}`}>
                        {season}
                    </span>
                    );
                })}
                <span className="text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                    {crop.duration} Mo.
                </span>
                {!crop.isColdResistant && (
                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-rose-100 text-rose-500">
                        Needs Warmth
                    </span>
                )}
                {crop.isHeatSensitive && (
                    <span className="text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-orange-100 text-orange-500">
                        Hates Heat
                    </span>
                )}
                </div>
            </div>
            </div>
        ))}
    </div>
);
