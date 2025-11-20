
import React, { useState, useRef, useEffect } from 'react';
import { Tile, ToolType, SeasonType, AreaAutomationConfig } from '../types';
import { CROPS, LAND_COST, TILES_PER_AREA, AREA_CONFIG } from '../constants';
import { Lock, ChevronLeft, ChevronRight, Edit2, Check, Plane, Droplets, Sprout } from 'lucide-react';
import { ItemIcon } from './Icons';

interface GridProps {
  grid: Tile[];
  unlockedAreas: number[];
  areaNames: Record<number, string>;
  areaAutomation: Record<number, AreaAutomationConfig>;
  currentSeason: SeasonType;
  selectedTool: ToolType;
  selectedSeedId: number | null;
  onTileClick: (tileId: number) => void;
  onPlant: (tileId: number, seedId: number) => void;
  onUnlockArea: (areaId: number) => void;
  onRenameArea: (areaId: number, newName: string) => void;
}

export const Grid: React.FC<GridProps> = ({ 
  grid, 
  unlockedAreas,
  areaNames,
  areaAutomation,
  currentSeason, 
  selectedTool, 
  onTileClick,
  onPlant,
  onUnlockArea,
  onRenameArea
}) => {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePrev = () => setActiveAreaIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setActiveAreaIndex(prev => Math.min(AREA_CONFIG.length - 1, prev + 1));

  useEffect(() => {
    if (isEditing !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const startEditing = (id: number, currentName: string) => {
    setIsEditing(id);
    setEditName(currentName);
  };

  const saveName = (id: number) => {
    if (editName.trim()) {
      onRenameArea(id, editName.trim());
    }
    setIsEditing(null);
  };

  return (
    <div className="font-fredoka w-full flex flex-col items-center justify-center">
        
        <div className="relative w-full max-w-[500px] flex items-center justify-center aspect-square">
            {/* Navigation Arrows */}
            <button
                onClick={handlePrev}
                disabled={activeAreaIndex === 0}
                className={`absolute -left-4 sm:-left-12 z-20 bg-white/90 p-3 rounded-full shadow-xl transition-all border-2 border-white
                    ${activeAreaIndex === 0 ? 'opacity-0 pointer-events-none translate-x-4' : 'hover:bg-white hover:scale-110 cursor-pointer hover:-translate-x-1'}
                `}
            >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </button>

            <button
                onClick={handleNext}
                disabled={activeAreaIndex === AREA_CONFIG.length - 1}
                className={`absolute -right-4 sm:-right-12 z-20 bg-white/90 p-3 rounded-full shadow-xl transition-all border-2 border-white
                    ${activeAreaIndex === AREA_CONFIG.length - 1 ? 'opacity-0 pointer-events-none -translate-x-4' : 'hover:bg-white hover:scale-110 cursor-pointer hover:translate-x-1'}
                `}
            >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </button>

            {/* Viewport Container (Overflow Hidden) */}
            <div className="w-full h-full overflow-hidden rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] border-b-8 border-[#d4c5a6] bg-[#e8dcb9] relative z-10 flex items-center">
                
                {/* Sliding Track */}
                <div 
                    className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ transform: `translateX(-${activeAreaIndex * 100}%)` }}
                >
                    {AREA_CONFIG.map((area) => {
                        const isUnlocked = unlockedAreas.includes(area.id);
                        const startIndex = area.id * TILES_PER_AREA;
                        const areaTiles = grid.slice(startIndex, startIndex + TILES_PER_AREA);
                        const currentName = areaNames[area.id] || area.name;
                        const automation = areaAutomation[area.id];

                        return (
                            <div key={area.id} className="w-full h-full flex-shrink-0 relative flex flex-col p-6 pt-16">
                                
                                {/* Header for Area */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg text-sm font-black text-slate-500 border-4 border-[#e8dcb9] z-20 whitespace-nowrap flex items-center gap-2 ring-4 ring-black/5 min-w-[200px] justify-center">
                                    {isEditing === area.id ? (
                                      <div className="flex items-center gap-2 w-full">
                                        <input 
                                          ref={inputRef}
                                          value={editName}
                                          onChange={(e) => setEditName(e.target.value)}
                                          className="w-24 bg-slate-100 px-2 py-0.5 rounded outline-none text-slate-700"
                                          onKeyDown={(e) => e.key === 'Enter' && saveName(area.id)}
                                        />
                                        <button onClick={() => saveName(area.id)} className="text-green-500 hover:bg-green-50 p-1 rounded-full"><Check className="w-3 h-3" /></button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => startEditing(area.id, currentName)}>
                                        <span>{currentName}</span>
                                        <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                      </div>
                                    )}
                                    <span className="bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full text-[10px] ml-auto">{area.id + 1}/{AREA_CONFIG.length}</span>
                                </div>

                                {/* Inner Soil Bed - Square Container */}
                                <div className={`flex-1 bg-[#8d6e63] rounded-[2.5rem] shadow-[inset_0_4px_16px_rgba(0,0,0,0.25)] relative overflow-hidden transition-all duration-500 flex items-center justify-center ${!isUnlocked ? 'filter grayscale-[0.5] opacity-90' : ''}`}>
                                    
                                    {/* Automation Visuals */}
                                    {isUnlocked && automation && (
                                        <>
                                            {/* Irrigation Pipes */}
                                            {automation.hasIrrigation && (
                                                <div className="absolute inset-4 border-4 border-slate-400 rounded-[1.5rem] z-0 opacity-50 pointer-events-none">
                                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 bg-slate-400"></div>
                                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-2 bg-slate-400"></div>
                                                </div>
                                            )}
                                            
                                            {/* Drone Pad */}
                                            {automation.hasDrone && (
                                                <div className="absolute top-2 right-2 z-10 pointer-events-none">
                                                    <div className="w-8 h-8 bg-slate-700 rounded-full border-2 border-yellow-500 flex items-center justify-center shadow-lg">
                                                        <div className="text-xs text-yellow-500">H</div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Seeder Arm Base */}
                                            {automation.hasSeeder && (
                                                <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
                                                    <div className="w-8 h-8 bg-slate-700 rounded border-2 border-green-500 flex items-center justify-center shadow-lg">
                                                        <Sprout className="w-4 h-4 text-green-500" />
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Locked Area Overlay */}
                                    {!isUnlocked && (
                                        <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 animate-in fade-in">
                                            <div className="bg-white p-4 rounded-full mb-3 shadow-xl">
                                                <Lock className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <h3 className="text-white font-black text-2xl drop-shadow-md mb-3">Locked Area</h3>
                                            <button 
                                                onClick={() => onUnlockArea(area.id)}
                                                className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-black py-3 px-6 rounded-2xl shadow-[0_4px_0_rgb(217,119,6)] hover:shadow-[0_2px_0_rgb(217,119,6)] hover:translate-y-[2px] transition-all active:shadow-none active:translate-y-[4px]"
                                            >
                                                Unlock ${area.cost}
                                            </button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-4 gap-3 p-4 relative z-10">
                                        {areaTiles.map(tile => (
                                            <Plot 
                                                key={tile.id}
                                                tile={tile}
                                                currentSeason={currentSeason}
                                                selectedTool={selectedTool}
                                                onClick={() => isUnlocked && onTileClick(tile.id)}
                                                onPlant={onPlant}
                                                isAreaLocked={!isUnlocked}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative Screws */}
                                <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-[#d4c5a6] shadow-inner opacity-80"></div>
                                <div className="absolute top-8 right-8 w-4 h-4 rounded-full bg-[#d4c5a6] shadow-inner opacity-80"></div>
                                <div className="absolute bottom-8 left-8 w-4 h-4 rounded-full bg-[#d4c5a6] shadow-inner opacity-80"></div>
                                <div className="absolute bottom-8 right-8 w-4 h-4 rounded-full bg-[#d4c5a6] shadow-inner opacity-80"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-8">
            {AREA_CONFIG.map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => setActiveAreaIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${idx === activeAreaIndex ? 'bg-white w-8 scale-110' : 'bg-white/40 hover:bg-white/60'}`}
                />
            ))}
        </div>
    </div>
  );
};

interface PlotProps {
    tile: Tile;
    currentSeason: SeasonType;
    selectedTool: ToolType;
    onClick: () => void;
    onPlant: (tileId: number, seedId: number) => void;
    isAreaLocked: boolean;
}

const Plot: React.FC<PlotProps> = ({ tile, currentSeason, selectedTool, onClick, onPlant, isAreaLocked }) => {
    const crop = tile.cropId ? CROPS.find(c => c.id === tile.cropId) : null;
    
    // Determine visual icon: Use Produce icon if mature, otherwise Seed icon
    let visualIconKey = crop?.iconKey;
    if (tile.state === 'mature' && crop?.harvestYieldId) {
        const produce = CROPS.find(c => c.id === crop.harvestYieldId);
        if (produce) {
            visualIconKey = produce.iconKey;
        }
    } else if (tile.state === 'mature' && crop?.id === 999) {
        // Special case for Golden Apple if harvestYieldId linkage isn't enough (though it should be)
        visualIconKey = 'Golden Apple';
    }

    const [isDragOver, setIsDragOver] = useState(false);
    const isDamaged = tile.state === 'damaged';

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); 
        if (!tile.isLocked && !isAreaLocked && tile.state === 'empty' && !isDamaged) {
            e.dataTransfer.dropEffect = "copy";
            setIsDragOver(true);
        }
    };
  
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (tile.isLocked || isAreaLocked || tile.state !== 'empty' || isDamaged) return;
  
        const seedId = e.dataTransfer.getData('seedId');
        if (seedId) {
            onPlant(tile.id, Number(seedId));
        }
    };

    // Interaction Check
    const isInteractable = !isAreaLocked && !tile.isLocked && !isDamaged && (
        (selectedTool === ToolType.SHOVEL && tile.state === 'dead') ||
        (selectedTool === ToolType.WATER && tile.state !== 'empty' && tile.state !== 'dead' && tile.moisture < 100) ||
        (selectedTool === ToolType.SEED && tile.state === 'empty') ||
        (selectedTool === ToolType.SELL && tile.state === 'mature') || // Use SELL tool
        (selectedTool === ToolType.NONE && tile.state === 'mature')
    );
    
    // Visuals
    let bgClass = 'bg-[#a1887f]'; 
    let shadowClass = 'shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)]';

    if (tile.isLocked) {
        bgClass = 'bg-[#d7ccc8] opacity-50';
        shadowClass = 'shadow-inner';
    } else if (isDamaged) {
        bgClass = 'bg-[#8d6e63]'; 
    } else if (currentSeason === 'Winter') {
        bgClass = 'bg-[#eceff1]';
    } else if (tile.state !== 'empty' && tile.state !== 'dead') {
        if (tile.moisture > 60) bgClass = 'bg-[#8d6e63]'; 
    }

    return (
        <div 
            className={`
                relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl transition-all duration-300
                ${bgClass} ${shadowClass}
                ${isInteractable ? 'hover:brightness-105 cursor-pointer hover:-translate-y-0.5' : ''}
                ${isDragOver ? 'ring-4 ring-amber-300 scale-105 z-10' : ''}
                overflow-hidden
            `}
            onClick={onClick}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                
                {tile.isLocked && !isAreaLocked && (
                    <div className="flex flex-col items-center animate-fade-in scale-75">
                        <div className="bg-white/60 p-1.5 rounded-full mb-1 backdrop-blur-sm">
                             <Lock className="w-4 h-4 text-slate-500" />
                        </div>
                        <span className="text-[9px] font-black text-slate-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">${LAND_COST}</span>
                    </div>
                )}

                {isDamaged && (
                    <div className="flex flex-col items-center animate-pulse opacity-80">
                        <span className="text-2xl">🚧</span>
                        <span className="text-[8px] font-bold text-white bg-red-400 px-1 py-0.5 rounded-md mt-1 shadow-sm">{tile.recoveryTime}m</span>
                    </div>
                )}

                {!tile.isLocked && !isDamaged && !isAreaLocked && (
                    <>
                        <div className="transition-transform duration-500 transform hover:scale-110 relative z-10 w-full h-full p-1">
                            {tile.state === 'dead' && <span className="text-2xl grayscale opacity-70 block text-center mt-4">🥀</span>}
                            {tile.state === 'seeded' && <span className="text-lg block text-center mt-4">🌰</span>}
                            {tile.state === 'growing' && <span className="text-2xl animate-bounce-slow block text-center mt-4">🌱</span>}
                            {tile.state === 'mature' && visualIconKey && (
                                <div className="w-full h-full drop-shadow-lg">
                                    <ItemIcon name={visualIconKey} />
                                </div>
                            )}
                        </div>

                        {tile.state !== 'empty' && tile.state !== 'dead' && (
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-black/10 rounded-full p-[1px] backdrop-blur-sm">
                                <div 
                                    className={`h-full rounded-full transition-all duration-500 ${tile.moisture < 30 ? 'bg-red-400' : 'bg-blue-400'}`}
                                    style={{ width: `${tile.moisture}%` }}
                                ></div>
                            </div>
                        )}

                        {selectedTool === ToolType.WATER && isInteractable && (
                             <div className="absolute top-1 right-1 bg-blue-500 text-white text-[8px] font-black px-1 rounded-full shadow-sm animate-bounce">
                                $5
                             </div>
                        )}
                        
                        {selectedTool === ToolType.SELL && isInteractable && (
                             <div className="absolute top-1 right-1 bg-emerald-500 text-white text-[8px] font-black px-1 rounded-full shadow-sm animate-bounce">
                                $$$
                             </div>
                        )}
                    </>
                )}
            </div>

            {tile.note && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full flex justify-center z-20 pointer-events-none">
                    <div className="bg-black/75 text-white text-[6px] font-medium px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm text-center leading-tight max-w-[140%] whitespace-normal">
                        {tile.note}
                    </div>
                </div>
            )}
        </div>
    );
};
