
import React, { useState } from 'react';
import { X, Monitor, Activity, Droplets, Plane, Sprout, ToggleLeft, ToggleRight, ShoppingCart, Hammer, ArrowRight, Lock } from 'lucide-react';
import { AREA_CONFIG, AUTOMATION_COSTS, CROPS } from '../constants';
import { AreaAutomationConfig } from '../types';

interface FarmOSProps {
  isOpen: boolean;
  onClose: () => void;
  money: number;
  unlockedAreas: number[];
  areaAutomation: Record<number, AreaAutomationConfig>;
  factoryHoppers: boolean[];
  factorySlots: number;
  hasConveyor: boolean;
  inventory: Record<number, number>;
  onBuyAreaUpgrade: (areaId: number, type: 'IRRIGATION' | 'DRONE' | 'SEEDER') => void;
  onToggleAreaUpgrade: (areaId: number, type: 'IRRIGATION' | 'DRONE' | 'SEEDER') => void;
  onSetAreaAutoSell: (areaId: number, enabled: boolean) => void;
  onSetAreaSeederId: (areaId: number, seedId: number | null) => void;
  onBuyFactoryUpgrade: (type: 'HOPPER' | 'CONVEYOR', slotIndex?: number) => void;
  onToggleFactoryUpgrade: (type: 'HOPPER' | 'CONVEYOR', slotIndex?: number) => void;
}

export const FarmOS: React.FC<FarmOSProps> = ({
    isOpen, onClose, money, unlockedAreas, areaAutomation, 
    factoryHoppers, factorySlots, hasConveyor, inventory,
    onBuyAreaUpgrade, onToggleAreaUpgrade, onSetAreaAutoSell, onSetAreaSeederId,
    onBuyFactoryUpgrade, onToggleFactoryUpgrade
}) => {
  if (!isOpen) return null;
  const [tab, setTab] = useState<'AREAS' | 'FACTORY'>('AREAS');

  const seeds = CROPS.filter(c => c.category === 'SEED');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 font-mono text-green-500 flex flex-col animate-in fade-in duration-300">
        
        {/* Matrix Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(34, 197, 94, .3) 25%, rgba(34, 197, 94, .3) 26%, transparent 27%, transparent 74%, rgba(34, 197, 94, .3) 75%, rgba(34, 197, 94, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }}></div>

        {/* Header */}
        <div className="relative z-10 p-4 border-b border-green-900 bg-slate-900 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Monitor className="w-6 h-6 animate-pulse" />
                <div>
                    <h1 className="text-xl font-bold tracking-widest text-green-400">FarmOS <span className="text-xs bg-green-900 text-green-200 px-1 rounded">v2.0</span></h1>
                    <p className="text-[10px] text-green-700 uppercase">Centralized Automation Control</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-[10px] text-green-700 uppercase">Available Funds</p>
                    <p className="text-lg font-bold text-white">${money}</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-green-900/30 rounded-full text-green-600 hover:text-green-400 transition-colors">
                    <X className="w-6 h-6" />
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-green-900 bg-slate-900/50 relative z-10">
            <button 
                onClick={() => setTab('AREAS')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${tab === 'AREAS' ? 'bg-green-900/20 text-green-400 border-b-2 border-green-500' : 'text-green-800 hover:text-green-600'}`}
            >
                <Activity className="w-4 h-4" /> Area Monitor
            </button>
            <button 
                onClick={() => setTab('FACTORY')}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${tab === 'FACTORY' ? 'bg-green-900/20 text-green-400 border-b-2 border-green-500' : 'text-green-800 hover:text-green-600'}`}
            >
                <Hammer className="w-4 h-4" /> Factory Config
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 relative z-10">
            
            {tab === 'AREAS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {AREA_CONFIG.map(area => {
                        const isUnlocked = unlockedAreas.includes(area.id);
                        const config = areaAutomation[area.id];
                        if (!config) return null; // Should exist if init correctly

                        return (
                            <div key={area.id} className={`border border-green-900 bg-slate-900/80 p-4 rounded-lg ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}>
                                <div className="flex justify-between items-center mb-4 pb-2 border-b border-green-900/50">
                                    <h3 className="font-bold text-green-300 text-sm">{area.name}</h3>
                                    {!isUnlocked && <Lock className="w-4 h-4 text-green-800" />}
                                </div>

                                {isUnlocked ? (
                                    <div className="space-y-6">
                                        {/* Irrigation */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <Droplets className="w-4 h-4" /> <span className="text-xs font-bold">Smart Irrigation</span>
                                                </div>
                                                {config.hasIrrigation ? (
                                                    <button onClick={() => onToggleAreaUpgrade(area.id, 'IRRIGATION')}>
                                                        {config.irrigationEnabled 
                                                            ? <ToggleRight className="w-6 h-6 text-green-400" /> 
                                                            : <ToggleLeft className="w-6 h-6 text-green-800" />}
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => onBuyAreaUpgrade(area.id, 'IRRIGATION')}
                                                        disabled={money < AUTOMATION_COSTS.IRRIGATION}
                                                        className={`text-[10px] px-2 py-1 border rounded font-bold ${money >= AUTOMATION_COSTS.IRRIGATION ? 'border-green-500 text-green-400 hover:bg-green-900' : 'border-red-900 text-red-900 cursor-not-allowed'}`}
                                                    >
                                                        BUY ${AUTOMATION_COSTS.IRRIGATION}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Drone */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <Plane className="w-4 h-4" /> <span className="text-xs font-bold">Harvest Drone</span>
                                                </div>
                                                {config.hasDrone ? (
                                                    <button onClick={() => onToggleAreaUpgrade(area.id, 'DRONE')}>
                                                        {config.droneEnabled 
                                                            ? <ToggleRight className="w-6 h-6 text-green-400" /> 
                                                            : <ToggleLeft className="w-6 h-6 text-green-800" />}
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => onBuyAreaUpgrade(area.id, 'DRONE')}
                                                        disabled={money < AUTOMATION_COSTS.DRONE}
                                                        className={`text-[10px] px-2 py-1 border rounded font-bold ${money >= AUTOMATION_COSTS.DRONE ? 'border-green-500 text-green-400 hover:bg-green-900' : 'border-red-900 text-red-900 cursor-not-allowed'}`}
                                                    >
                                                        BUY ${AUTOMATION_COSTS.DRONE}
                                                    </button>
                                                )}
                                            </div>
                                            {config.hasDrone && (
                                                <div className="flex items-center justify-between bg-slate-950 p-2 rounded border border-green-900/30">
                                                    <span className="text-[10px] text-green-700">Mode: {config.autoSell ? 'AUTO-SELL' : 'STORE'}</span>
                                                    <button 
                                                        onClick={() => onSetAreaAutoSell(area.id, !config.autoSell)}
                                                        className="text-[10px] text-green-500 hover:text-green-300 border border-green-800 px-2 rounded"
                                                    >
                                                        SWITCH
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Seeder */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <Sprout className="w-4 h-4" /> <span className="text-xs font-bold">Auto Seeder</span>
                                                </div>
                                                {config.hasSeeder ? (
                                                    <button onClick={() => onToggleAreaUpgrade(area.id, 'SEEDER')}>
                                                        {config.seederEnabled 
                                                            ? <ToggleRight className="w-6 h-6 text-green-400" /> 
                                                            : <ToggleLeft className="w-6 h-6 text-green-800" />}
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => onBuyAreaUpgrade(area.id, 'SEEDER')}
                                                        disabled={money < AUTOMATION_COSTS.SEEDER}
                                                        className={`text-[10px] px-2 py-1 border rounded font-bold ${money >= AUTOMATION_COSTS.SEEDER ? 'border-green-500 text-green-400 hover:bg-green-900' : 'border-red-900 text-red-900 cursor-not-allowed'}`}
                                                    >
                                                        BUY ${AUTOMATION_COSTS.SEEDER}
                                                    </button>
                                                )}
                                            </div>
                                            {config.hasSeeder && (
                                                <select 
                                                    className="w-full bg-slate-950 border border-green-900 text-green-500 text-[10px] p-2 rounded outline-none"
                                                    value={config.seederSeedId || ''}
                                                    onChange={(e) => onSetAreaSeederId(area.id, e.target.value ? Number(e.target.value) : null)}
                                                >
                                                    <option value="">[ SELECT SEED ]</option>
                                                    {seeds.map(seed => (
                                                        <option key={seed.id} value={seed.id}>
                                                            {seed.name} ({inventory[seed.id] || 0})
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-40 flex items-center justify-center text-green-900 text-xs font-bold">
                                        AREA LOCKED
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {tab === 'FACTORY' && (
                <div className="max-w-3xl mx-auto space-y-8">
                    
                    {/* Global Conveyor */}
                    <div className="bg-slate-900 border border-green-800 p-6 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-900/20 p-3 rounded-lg">
                                <ArrowRight className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-green-300">Output Conveyor Belt</h3>
                                <p className="text-xs text-green-700">Auto-collects finished products.</p>
                            </div>
                        </div>
                        {hasConveyor ? (
                             <div className="text-green-400 font-bold flex items-center gap-2">
                                 <span className="text-xs uppercase tracking-wider">INSTALLED</span>
                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                             </div>
                        ) : (
                            <button 
                                onClick={() => onBuyFactoryUpgrade('CONVEYOR')}
                                disabled={money < AUTOMATION_COSTS.CONVEYOR}
                                className={`px-4 py-2 border rounded font-bold transition-all ${money >= AUTOMATION_COSTS.CONVEYOR ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-slate-900' : 'border-red-900 text-red-900 cursor-not-allowed'}`}
                            >
                                PURCHASE SYSTEM ${AUTOMATION_COSTS.CONVEYOR}
                            </button>
                        )}
                    </div>

                    {/* Slot Hoppers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => {
                            const isSlotUnlocked = idx < factorySlots;
                            const hasHopper = factoryHoppers[idx];

                            return (
                                <div key={idx} className={`border border-green-900 bg-slate-900/50 p-4 rounded-lg ${!isSlotUnlocked ? 'opacity-30 pointer-events-none' : ''}`}>
                                     <div className="flex justify-between items-start mb-4">
                                         <h4 className="font-bold text-green-600">Production Slot #{idx + 1}</h4>
                                         {!isSlotUnlocked && <Lock className="w-4 h-4 text-green-900" />}
                                     </div>
                                     
                                     <div className="flex justify-between items-center bg-slate-950 p-3 rounded border border-green-900/30">
                                         <div className="flex items-center gap-2">
                                             <ShoppingCart className="w-4 h-4 text-green-500" />
                                             <div className="flex flex-col">
                                                 <span className="text-xs font-bold text-green-400">Input Hopper</span>
                                                 <span className="text-[9px] text-green-800">Auto-restart jobs</span>
                                             </div>
                                         </div>
                                         {hasHopper ? (
                                             <span className="text-[10px] bg-green-900/50 text-green-400 px-2 py-1 rounded">ACTIVE</span>
                                         ) : (
                                            <button 
                                                onClick={() => onBuyFactoryUpgrade('HOPPER', idx)}
                                                disabled={money < AUTOMATION_COSTS.HOPPER}
                                                className={`text-[10px] px-2 py-1 border rounded font-bold ${money >= AUTOMATION_COSTS.HOPPER ? 'border-green-500 text-green-400 hover:bg-green-900' : 'border-red-900 text-red-900 cursor-not-allowed'}`}
                                            >
                                                ${AUTOMATION_COSTS.HOPPER}
                                            </button>
                                         )}
                                     </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            )}

        </div>

    </div>
  );
};
