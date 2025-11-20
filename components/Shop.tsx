
import React from 'react';
import { X, Store, ShoppingBag } from 'lucide-react';
import { CROPS, GOLDEN_APPLE_ID, GOLDEN_APPLE_FRUIT_ID } from '../constants';
import { SeasonType } from '../types';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  money: number;
  onBuy: (itemId: number, cost: number) => void;
  currentSeason: SeasonType;
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose, money, onBuy, currentSeason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] relative border-4 border-rose-100">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-rose-50 z-10 border-b border-rose-100">
          <div className="flex items-center gap-3">
            <div className="bg-rose-200 p-2.5 rounded-xl shadow-sm transform -rotate-3">
               <Store className="w-7 h-7 text-rose-600" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800">Seed Shop</h2>
                <p className="text-xs text-slate-500 font-bold">Spend your gold wisely!</p>
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
        
        {/* Content */}
        <div className="p-6 overflow-y-auto bg-[#faf7f5]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CROPS.map((crop) => {
              // Hide Golden Apples (Seed and Fruit) from normal shop
              // Hide items with no buy price (Produce)
              if (crop.id === GOLDEN_APPLE_ID || crop.id === GOLDEN_APPLE_FRUIT_ID || crop.buyPrice === 0) return null;

              const canAfford = money >= crop.buyPrice;
              const isSeason = crop.suitableSeasons.includes(currentSeason);
              
              return (
                <div key={crop.id} className="flex flex-col p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition border border-slate-100 group relative">
                    
                    {isSeason && (
                        <div className="absolute -top-2 -right-2 bg-green-400 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm rotate-3">
                            IN SEASON
                        </div>
                    )}

                    <div className="flex gap-4">
                        <div className={`bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner ${crop.emojiClass || ''}`}>
                            {crop.emoji}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-slate-700">{crop.name}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-tight mt-1 h-8 line-clamp-2">{crop.description}</p>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                            <span className={`text-lg font-black ${canAfford ? 'text-slate-700' : 'text-red-400'}`}>${crop.buyPrice}</span>
                        </div>
                        
                        <button 
                            onClick={() => canAfford && onBuy(crop.id, crop.buyPrice)}
                            disabled={!canAfford}
                            className={`
                                px-5 py-2 rounded-xl font-black text-sm flex items-center gap-2 transition-all active:scale-95
                                ${canAfford 
                                    ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-[0_4px_0_rgb(225,29,72)] hover:shadow-[0_2px_0_rgb(225,29,72)] hover:translate-y-[2px]' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                            `}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Buy
                        </button>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};
