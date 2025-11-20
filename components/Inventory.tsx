
import React from 'react';
import { X, Backpack } from 'lucide-react';
import { CROPS } from '../constants';
import { ItemIcon } from './Icons';

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
  inventory: Record<number, number>;
  t: (key: string) => string;
}

export const Inventory: React.FC<InventoryProps> = ({ isOpen, onClose, inventory, t }) => {
  if (!isOpen) return null;

  const items = Object.entries(inventory)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const crop = CROPS.find(c => c.id === Number(id));
      return { ...crop, count, id: Number(id) };
    })
    .filter(item => item.name); 

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
                <h2 className="text-2xl font-black text-slate-800">{t('BACKPACK')}</h2>
                <p className="text-xs text-slate-500 font-bold">{t('OWNED')} Items</p>
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
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-3">
                    {items.map((item) => {
                        const isProduct = item.category === 'PRODUCT';
                        return (
                        <div key={item.id} className={`bg-white p-3 rounded-2xl shadow-sm flex flex-col items-center relative group border ${isProduct ? 'border-blue-100' : 'border-slate-100'}`}>
                            {isProduct && <span className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>}
                            <div className="w-12 h-12 mb-2 drop-shadow-sm transform transition-transform group-hover:scale-110">
                                <ItemIcon name={item.iconKey} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 text-center leading-tight mb-1">{item.name}</span>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isProduct ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>x{item.count}</span>
                        </div>
                        );
                    })}
                </div>
            )}
        </div>
        
      </div>
    </div>
  );
};
