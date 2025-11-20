
import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, ShoppingCart, ShieldCheck, Rocket, AlertCircle, History, Coins, Sprout } from 'lucide-react';
import { MarketCandle, FinancialOption, OptionHistoryRecord } from '../types';
import { ItemIcon } from './Icons';

interface StockMarketProps {
  isOpen: boolean;
  onClose: () => void;
  currentPrice: number;
  marketHistory: MarketCandle[];
  money: number;
  onBuySeed: (cost: number) => void;
  onBuyFruit: () => void;
  onSellFruit: () => void;
  fruitInventory: number;
  options: FinancialOption[];
  optionHistory: OptionHistoryRecord[];
  onBuyOption: (type: 'CALL' | 'PUT') => void;
  onExerciseOption: (optionId: string) => void;
}

export const StockMarket: React.FC<StockMarketProps> = ({ 
    isOpen, onClose, currentPrice, marketHistory, money, onBuySeed, 
    onBuyFruit, onSellFruit, fruitInventory,
    options, optionHistory, onBuyOption, onExerciseOption
}) => {
  if (!isOpen) return null;
  const [tab, setTab] = useState<'MARKET' | 'HISTORY'>('MARKET');

  const seedPrice = Math.floor(currentPrice * 0.9); // Seeds are 10% cheaper than fruit
  const canAffordSeed = money >= seedPrice;
  const canAffordFruit = money >= currentPrice;
  const canSellFruit = fruitInventory > 0;
  
  // Option Logic
  const canAffordOption = fruitInventory >= 1; // Costs 1 Apple
  const optionCostText = "1 Golden Apple";

  // Determine Chart Scale
  const allHighs = marketHistory.map(c => c.high);
  const allLows = marketHistory.map(c => c.low);
  const maxVal = Math.max(...allHighs, 15000) * 1.1;
  const minVal = Math.max(0, Math.min(...allLows) * 0.9);
  const range = maxVal - minVal || 1;

  // Trend
  const lastClose = marketHistory.length > 1 ? marketHistory[marketHistory.length - 2].close : currentPrice;
  const isUp = currentPrice >= lastClose;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh] relative border-8 border-yellow-300">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-yellow-50 z-10 border-b border-yellow-100">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-200 p-3 rounded-2xl shadow-sm">
               <TrendingUp className="w-8 h-8 text-yellow-700" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800 leading-none">Stalk Market</h2>
                <p className="text-xs text-slate-500 font-bold">Golden Apple Exchange</p>
            </div>
          </div>
          
          <div className="flex gap-2">
              <button onClick={() => setTab('MARKET')} className={`px-4 py-2 rounded-xl text-sm font-black transition-colors ${tab === 'MARKET' ? 'bg-yellow-400 text-yellow-900' : 'bg-transparent text-slate-400 hover:bg-yellow-100'}`}>Market</button>
              <button onClick={() => setTab('HISTORY')} className={`px-4 py-2 rounded-xl text-sm font-black transition-colors ${tab === 'HISTORY' ? 'bg-yellow-400 text-yellow-900' : 'bg-transparent text-slate-400 hover:bg-yellow-100'}`}>History</button>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-yellow-100 rounded-full transition text-slate-400 hover:text-yellow-600 ml-4">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {tab === 'MARKET' && (
        <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                
                {/* LEFT: Chart & Spot Market (Span 2) */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {/* Chart Card */}
                    <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-lg">
                        <div className="flex justify-between items-end mb-4 border-b border-slate-700 pb-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-400 uppercase">Spot Price (Fruit)</span>
                                <span className={`text-4xl font-black drop-shadow-lg flex items-center ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                                    ${currentPrice}
                                    {isUp ? <TrendingUp className="w-6 h-6 ml-2" /> : <TrendingDown className="w-6 h-6 ml-2" />}
                                </span>
                            </div>
                            <div className="text-[10px] text-slate-500">Monthly K-Line</div>
                        </div>

                        {/* Chart Container */}
                        <div className="h-64 w-full relative border border-slate-700 bg-slate-800/50 rounded-xl overflow-x-auto overflow-y-hidden no-scrollbar">
                            <div className="flex items-end h-full px-2 gap-2 min-w-max">
                                {marketHistory.map((candle, idx) => {
                                    const isGreen = candle.close >= candle.open;
                                    const bottomPct = ((candle.low - minVal) / range) * 100;
                                    const topPct = ((candle.high - minVal) / range) * 100;
                                    const heightPct = topPct - bottomPct;
                                    const bodyBottom = ((Math.min(candle.open, candle.close) - minVal) / range) * 100;
                                    const bodyHeight = (Math.abs(candle.close - candle.open) / range) * 100;

                                    return (
                                        <div key={idx} className="w-6 relative h-full flex items-end group hover:z-10">
                                            <div className="absolute w-full flex justify-center" style={{ height: `${heightPct}%`, bottom: `${bottomPct}%` }}>
                                                <div className={`w-[1px] h-full ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <div className={`absolute w-full ${isGreen ? 'bg-green-500' : 'bg-red-500'} border border-slate-900`}
                                                    style={{ height: `${Math.max(1, (bodyHeight / heightPct) * 100)}%`, bottom: `${((bodyBottom - bottomPct) / heightPct) * 100}%` }}></div>
                                            </div>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[8px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                                                O:{candle.open} C:{candle.close}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Trading Floor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Spot Market (Fruit) */}
                        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                             <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                <div className="bg-yellow-100 p-2 rounded-xl text-xl w-12 h-12">
                                    <ItemIcon name="Golden Apple" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800">Spot Market</h3>
                                    <p className="text-[10px] text-slate-400 font-bold">Trade Fruit directly</p>
                                </div>
                                <div className="ml-auto flex flex-col items-end">
                                    <span className="text-[10px] text-slate-400 uppercase font-bold">My Apples</span>
                                    <span className="text-lg font-black text-slate-700">{fruitInventory}</span>
                                </div>
                             </div>
                             <div className="flex gap-2">
                                <button 
                                    onClick={onBuyFruit}
                                    disabled={!canAffordFruit}
                                    className={`flex-1 py-3 rounded-xl font-black text-xs flex justify-center items-center gap-1 transition-all active:scale-95
                                    ${canAffordFruit ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-300'}
                                    `}
                                >
                                    <TrendingUp className="w-3 h-3" /> Buy
                                </button>
                                <button 
                                    onClick={onSellFruit}
                                    disabled={!canSellFruit}
                                    className={`flex-1 py-3 rounded-xl font-black text-xs flex justify-center items-center gap-1 transition-all active:scale-95
                                    ${canSellFruit ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-slate-100 text-slate-300'}
                                    `}
                                >
                                    <Coins className="w-3 h-3" /> Sell
                                </button>
                             </div>
                        </div>

                        {/* Seed Market */}
                        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3">
                             <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                                <div className="bg-green-100 p-2 rounded-xl text-xl w-12 h-12">
                                    <ItemIcon name="Golden Apple Seed" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800">Seed Market</h3>
                                    <p className="text-[10px] text-slate-400 font-bold">90% of Spot Price</p>
                                </div>
                             </div>
                             <div className="flex items-center justify-between mt-auto">
                                 <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-slate-400 uppercase">Cost</span>
                                     <span className="text-lg font-black text-slate-700">${seedPrice}</span>
                                 </div>
                                 <button 
                                    onClick={() => onBuySeed(seedPrice)}
                                    disabled={!canAffordSeed}
                                    className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 transition-all active:scale-95
                                        ${canAffordSeed 
                                            ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-sm' 
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                                    `}
                                >
                                    <Sprout className="w-4 h-4" /> Buy Seed
                                </button>
                             </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT: Derivatives (Span 1) */}
                <div className="flex flex-col gap-4">
                    
                    {/* Action Panel */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
                        <h3 className="font-black text-slate-800 mb-1 flex items-center gap-2">
                           <AlertCircle className="w-4 h-4 text-indigo-500" /> Options
                        </h3>
                        <div className="flex justify-between items-center mb-4">
                             <p className="text-xs text-slate-400 font-bold">Expire Next Month</p>
                             <div className="text-[10px] bg-slate-100 px-2 py-1 rounded-lg font-bold text-slate-600">
                                Cost: {optionCostText}
                             </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {/* PUT OPTION */}
                            <button
                                onClick={() => onBuyOption('PUT')}
                                disabled={!canAffordOption}
                                className={`group relative overflow-hidden p-3 rounded-xl border-2 text-left transition-all active:scale-95
                                    ${canAffordOption ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100 cursor-pointer' : 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-black text-emerald-700 flex items-center gap-1">
                                        <ShieldCheck className="w-4 h-4" /> Put (Insurance)
                                    </span>
                                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">Defensive</span>
                                </div>
                                <p className="text-[10px] text-emerald-600 font-bold leading-tight">
                                    Sell 1 Apple @ <span className="text-emerald-800">${currentPrice}</span> next month.
                                </p>
                            </button>

                            {/* CALL OPTION */}
                            <button
                                onClick={() => onBuyOption('CALL')}
                                disabled={!canAffordOption}
                                className={`group relative overflow-hidden p-3 rounded-xl border-2 text-left transition-all active:scale-95
                                    ${canAffordOption ? 'bg-rose-50 border-rose-200 hover:bg-rose-100 cursor-pointer' : 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-black text-rose-700 flex items-center gap-1">
                                        <Rocket className="w-4 h-4" /> Call (Order)
                                    </span>
                                    <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.5 rounded">Aggressive</span>
                                </div>
                                <p className="text-[10px] text-rose-600 font-bold leading-tight">
                                    Buy 1 Apple @ <span className="text-rose-800">${currentPrice}</span> next month.
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Portfolio Panel */}
                    <div className="bg-slate-100 p-4 rounded-3xl border border-slate-200 flex-1 min-h-[200px]">
                         <h3 className="font-black text-slate-600 text-sm mb-3">Active Contracts</h3>
                         
                         {options.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                                 <p className="text-xs font-bold">No active contracts.</p>
                             </div>
                         ) : (
                             <div className="space-y-2">
                                 {options.map(opt => {
                                     const isCall = opt.type === 'CALL';
                                     // Calc Profit per unit:
                                     // Call: Profit if Market > Strike.
                                     // Put: Profit if Strike > Market.
                                     const diffPerUnit = isCall 
                                        ? currentPrice - opt.strikePrice 
                                        : opt.strikePrice - currentPrice;
                                     
                                     const totalProfit = diffPerUnit * opt.contractSize;
                                     const isProfitable = totalProfit > 0;

                                     return (
                                        <div key={opt.id} className="bg-white p-3 rounded-xl shadow-sm flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <span className={`text-xs font-black px-2 py-0.5 rounded ${isCall ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                    {opt.type} @ ${opt.strikePrice}
                                                </span>
                                                <span className="text-[10px] text-slate-400 font-bold">
                                                    x{opt.contractSize} Units
                                                </span>
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Value</span>
                                                    <span className={`text-sm font-black ${isProfitable ? 'text-green-500' : 'text-slate-300'}`}>
                                                        ${Math.max(0, totalProfit)}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => onExerciseOption(opt.id)}
                                                    disabled={!isProfitable}
                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all active:scale-95
                                                        ${isProfitable 
                                                            ? 'bg-slate-800 text-white shadow-md hover:bg-black' 
                                                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'}
                                                    `}
                                                >
                                                    {isProfitable ? 'EXERCISE' : 'WAIT'}
                                                </button>
                                            </div>
                                        </div>
                                     );
                                 })}
                             </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
        )}
        
        {tab === 'HISTORY' && (
            <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
                {optionHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-50">
                        <History className="w-16 h-16 mb-4" />
                        <h3 className="text-xl font-black">No History</h3>
                        <p className="font-bold text-sm">Exercised options will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-3 max-w-3xl mx-auto">
                        {optionHistory.map((rec) => (
                             <div key={rec.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100">
                                 <div className="flex items-center gap-4">
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs
                                         ${rec.type === 'CALL' ? 'bg-rose-400' : 'bg-emerald-400'}
                                     `}>
                                         {rec.type}
                                     </div>
                                     <div>
                                         <p className="font-black text-slate-700 text-sm">Month {rec.turn}</p>
                                         <p className="text-xs text-slate-400 font-bold">Strike: ${rec.strikePrice} → Market: ${rec.marketPriceAtExercise}</p>
                                     </div>
                                 </div>
                                 <div className="text-right">
                                     <p className="text-[10px] text-slate-400 uppercase font-bold">Profit</p>
                                     <p className="text-green-500 font-black text-xl">+${rec.profit}</p>
                                 </div>
                             </div>
                        ))}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
