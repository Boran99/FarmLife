
import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { CROPS, SEASON_CONFIG } from '../constants';
import { SeasonType } from '../types';

interface AlmanacProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Almanac: React.FC<AlmanacProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] relative">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-xl">
               <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Farm Guide</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 pt-0 overflow-y-auto">
          <div className="space-y-4">
            {CROPS.filter(c => c.buyPrice > 0).map((crop) => ( // Filter out Produce
              <div key={crop.id} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition bg-white group">
                <div className={`text-4xl bg-slate-50 p-4 rounded-2xl group-hover:scale-110 transition-transform ${crop.emojiClass || ''}`}>
                  {crop.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-lg text-slate-800">{crop.name}</h3>
                    <div className="flex flex-col items-end">
                       <span className="text-xs font-bold text-slate-400">Buy: <span className="text-rose-500">-${crop.buyPrice}</span></span>
                       {/* Seeds sell for 0 in this new model, Produce sells. Maybe hide sell price here or show Produce sell price? */}
                       {/* For simplicity in the Almanac, let's just hide sell price or show the harvest info if complex. 
                           Actually, showing the crop's yield sell price might be more useful. 
                           But for now, let's keep it simple. */}
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
                         No Frost
                       </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};
