
import React from 'react';
import { X, Backpack } from 'lucide-react';
import { CROPS } from '../constants';

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Record<number, number>;
}

export const Inventory: React.FC<InventoryProps> = ({ isOpen, onClose, inventory }) => {
  if (!isOpen) return null;

  const items = Object.entries(inventory)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const crop = CROPS.find(c => c.id === Number(id));
      return { ...crop, count, id: Number(id) };
    })
    .filter(item => item.name); // Filter out unknown items

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] relative border-4 border-orange-100">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-orange-50 z-10 border-b border-orange-100">
          <div className="flex items-center gap-3">
            <div className="bg-orange-200 p-2.5 rounded-xl shadow-sm">
               <Backpack className="w-7 h-7 text-orange-600" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800">Backpack</h2>
                <p className="text-xs text-slate-500 font-bold">Your supplies</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-orange-100 rounded-full transition text-slate-400 hover:text-orange-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto bg-[#faf7f5] min-h-[300px]">
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Backpack className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-bold">Your bag is empty.</p>
                    <p className="text-xs">Visit the Shop to buy seeds!</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center relative group">
                            <div className={`text-4xl mb-2 drop-shadow-sm transform transition-transform group-hover:scale-110 ${item.emojiClass || ''}`}>{item.emoji}</div>
                            <span className="text-xs font-bold text-slate-700 text-center leading-tight mb-1">{item.name}</span>
                            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-2 py-0.5 rounded-full">x{item.count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
      </div>
    </div>
  );
};
