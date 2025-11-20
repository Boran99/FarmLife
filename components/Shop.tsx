
import React, { useState } from 'react';
import { X, Store, ShoppingBag, Coins, Lock } from 'lucide-react';
import { CROPS, GOLDEN_APPLE_ID, GOLDEN_APPLE_FRUIT_ID, AREA_CONFIG } from '../constants';
import { SeasonType } from '../types';
import { ItemIcon } from './Icons';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  money: number;
  onBuy: (itemId: number, cost: number) => void;
  currentSeason: SeasonType;
  inventory: Record<number, number>;
  onSell: (itemId: number, amount: number) => void;
  unlockedAreas: number[];
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose, money, onBuy, currentSeason, inventory, onSell, unlockedAreas }) => {
  if (!isOpen) return null;
  const [mode, setMode] = useState<'BUY' | 'SELL'>('BUY');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] relative border-4 border-rose-100">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-rose-50 z-10 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl shadow-sm transform -rotate-3 transition-colors ${mode === 'BUY' ? 'bg-rose-200' : 'bg-emerald-200'}`}>
               {mode === 'BUY' ? <Store className="w-7 h-7 text-rose-600" /> : <Coins className="w-7 h-7 text-emerald-600" />}
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800">General Store</h2>
                <p className="text-xs text-slate-500 font-bold">{mode === 'BUY' ? 'Spend your gold wisely!' : 'Sell your harvest!'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
              <div className="bg-white/80 px-4 py-2 rounded-full border border-rose-100 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Funds</span>
                  <span className="text-lg font-black text-slate-700">${money}</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-rose-100 rounded-full transition text-slate-400 hover:text-rose-500">
                <X className="w-6 h-6" />
              </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-4 pb-0 gap-2 bg-rose-50/50">
            <button 
                onClick={() => setMode('BUY')}
                className={`flex-1 py-3 rounded-t-2xl font-black text-sm transition-all ${mode === 'BUY' ? 'bg-white text-rose-500 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
                Buy Seeds
            </button>
            <button 
                onClick={() => setMode('SELL')}
                className={`flex-1 py-3 rounded-t-2xl font-black text-sm transition-all ${mode === 'SELL' ? 'bg-white text-emerald-600 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
            >
                Sell Produce
            </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto bg-[#faf7f5] flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {mode === 'BUY' && CROPS.map((crop) => {
              // Buy Mode: Show Seeds
              if (crop.id === GOLDEN_APPLE_ID || crop.id === GOLDEN_APPLE_FRUIT_ID || crop.category !== 'SEED') return null;

              const canAfford = money >= crop.buyPrice;
              const isSeason = crop.suitableSeasons.includes(currentSeason);
              
              // Unlock Check
              const requiredArea = crop.requiredAreaId !== undefined ? crop.requiredAreaId : 0;
              const isUnlocked = unlockedAreas.includes(requiredArea);
              const requiredAreaName = AREA_CONFIG.find(a => a.id === requiredArea)?.name || `Level ${requiredArea + 1}`;

              return (
                <div key={crop.id} className={`flex flex-col p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition border group relative ${!isUnlocked ? 'border-slate-200 opacity-75 grayscale-[0.3]' : 'border-slate-100'}`}>
                    {isSeason && isUnlocked && (
                        <div className="absolute -top-2 -right-2 bg-green-400 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm rotate-3">
                            IN SEASON
                        </div>
                    )}
                    <div className="flex gap-4">
                        <div className={`bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner`}>
                            {isUnlocked ? <div className="w-12 h-12"><ItemIcon name={crop.iconKey} /></div> : <Lock className="w-8 h-8 text-slate-300" />}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-slate-700">{crop.name}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-tight mt-1 h-8 line-clamp-2">
                                {isUnlocked ? crop.description : `Unlock ${requiredAreaName} to buy.`}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                            <span className={`text-lg font-black ${canAfford && isUnlocked ? 'text-slate-700' : 'text-slate-400'}`}>${crop.buyPrice}</span>
                        </div>
                        <button 
                            onClick={() => canAfford && isUnlocked && onBuy(crop.id, crop.buyPrice)}
                            disabled={!canAfford || !isUnlocked}
                            className={`px-5 py-2 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95
                                ${canAfford && isUnlocked
                                    ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-[0_4px_0_rgb(225,29,72)] hover:shadow-[0_2px_0_rgb(225,29,72)] hover:translate-y-[2px]' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                            `}
                        >
                            {isUnlocked ? <><ShoppingBag className="w-4 h-4" /> Buy</> : <Lock className="w-3 h-3" />}
                        </button>
                    </div>
                </div>
              );
            })}

            {mode === 'SELL' && CROPS.map((crop) => {
               // Sell Mode: Show Items in Inventory that have sellPrice > 0
               // Exclude Golden Apples (Sold in Stock Market)
               // Allow Products and Produce
               if (crop.id === GOLDEN_APPLE_ID || crop.id === GOLDEN_APPLE_FRUIT_ID) return null;
               
               const ownedCount = inventory[crop.id] || 0;
               if (ownedCount === 0 || crop.sellPrice === 0) return null;

               const isProduct = crop.category === 'PRODUCT';

               return (
                <div key={crop.id} className={`flex flex-col p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition border group ${isProduct ? 'border-blue-100' : 'border-emerald-100'}`}>
                    <div className="flex gap-4">
                        <div className={`${isProduct ? 'bg-blue-50' : 'bg-emerald-50'} w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner`}>
                            <div className="w-12 h-12"><ItemIcon name={crop.iconKey} /></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-black text-slate-700">{crop.name}</h3>
                                {isProduct && <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">CRAFTED</span>}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-slate-400 uppercase">Owned:</span>
                                <span className="text-sm font-black text-slate-700">{ownedCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Value</span>
                            <span className={`text-lg font-black ${isProduct ? 'text-blue-600' : 'text-emerald-600'}`}>${crop.sellPrice}</span>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => onSell(crop.id, 1)}
                                className={`px-3 py-2 rounded-xl font-black text-xs ${isProduct ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'} active:scale-95 transition-colors`}
                            >
                                Sell 1
                            </button>
                            <button 
                                onClick={() => onSell(crop.id, ownedCount)}
                                className={`px-3 py-2 rounded-xl font-black text-xs ${isProduct ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'} shadow-sm active:translate-y-[2px] active:shadow-none transition-all`}
                            >
                                Sell All (${crop.sellPrice * ownedCount})
                            </button>
                        </div>
                    </div>
                </div>
               );
            })}
            
            {mode === 'SELL' && Object.keys(inventory).every(key => {
                const id = Number(key);
                const crop = CROPS.find(c => c.id === id);
                // Return true if item shouldn't be shown
                return (inventory[id] === 0) || (crop?.sellPrice === 0) || (id === GOLDEN_APPLE_ID) || (id === GOLDEN_APPLE_FRUIT_ID);
            }) && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                    <ShoppingBag className="w-12 h-12 mb-2 opacity-20" />
                    <p className="font-bold">Nothing to sell right now.</p>
                </div>
            )}

          </div>
        </div>
        
      </div>
    </div>
  );
};
