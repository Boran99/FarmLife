
import React, { useState } from 'react';
import { X, ClipboardCheck, Star, CheckCircle, Lock, Trophy, HelpCircle } from 'lucide-react';
import { Quest, Language } from '../types';
import { TUTORIAL_CONTENT } from '../constants';
import { ItemIcon } from './Icons';

interface QuestBoardProps {
  isOpen: boolean;
  onClose: () => void;
  quests: Quest[];
  onClaimReward: (questId: number) => void;
  t: (key: string) => string;
  language: Language;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ isOpen, onClose, quests, onClaimReward, t, language }) => {
  if (!isOpen) return null;
  const [showGuide, setShowGuide] = useState(false);

  const activeQuest = quests.find(q => q.status === 'ACTIVE');
  const completedQuests = quests.filter(q => q.status === 'CLAIMED');
  const lockedQuests = quests.filter(q => q.status === 'LOCKED');
  const readyToClaimQuests = quests.filter(q => q.status === 'COMPLETED');

  const guideSteps = activeQuest ? TUTORIAL_CONTENT[activeQuest.id] : undefined;

  const getQuestTitle = (q: Quest) => language === 'ZH' && q.titleZH ? q.titleZH : q.title;
  const getQuestDesc = (q: Quest) => language === 'ZH' && q.descriptionZH ? q.descriptionZH : q.description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-fredoka">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] relative border-8 border-indigo-100">
        
        {/* Header */}
        <div className="p-6 pb-4 flex justify-between items-center bg-indigo-50 z-10 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-200 p-3 rounded-2xl shadow-sm text-indigo-700">
               <ClipboardCheck className="w-8 h-8" />
            </div>
            <div>
                <h2 className="text-2xl font-black text-slate-800">{t('QUEST_BOARD')}</h2>
                <p className="text-xs text-slate-500 font-bold">{t('QUEST_SUBTITLE')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-indigo-100 rounded-full transition text-slate-400 hover:text-indigo-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
            
            {/* Ready to Claim */}
            {readyToClaimQuests.map(quest => (
                <div key={quest.id} className="bg-green-50 border-2 border-green-400 p-6 rounded-3xl shadow-lg relative overflow-hidden animate-bounce-slow">
                     <div className="absolute top-0 right-0 bg-green-400 text-white px-4 py-1 rounded-bl-2xl font-black text-xs uppercase">{t('MISSION_COMPLETE')}!</div>
                     <h3 className="text-xl font-black text-green-800 mb-2">{getQuestTitle(quest)}</h3>
                     <p className="text-sm text-green-700 mb-4 font-medium">{language === 'ZH' ? '做得好！你完成了任务。' : "Great job! You've finished this mission."}</p>
                     <button 
                        onClick={() => onClaimReward(quest.id)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-black shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                     >
                        <Trophy className="w-5 h-5" /> {t('CLAIM')} ${quest.rewardMoney}
                     </button>
                </div>
            ))}

            {/* Active Quest */}
            {activeQuest ? (
                <div className="bg-white border-2 border-indigo-200 p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full uppercase tracking-wider">{t('ACTIVE')}</span>
                            <h3 className="text-2xl font-black text-slate-800 mt-2">{getQuestTitle(activeQuest)}</h3>
                        </div>
                        <div className="text-right">
                             <span className="text-[10px] font-bold text-slate-400 uppercase">{t('REWARD')}</span>
                             <div className="font-black text-xl text-amber-500">${activeQuest.rewardMoney}</div>
                        </div>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-6 font-medium leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                        {getQuestDesc(activeQuest)}
                    </p>

                    {/* Interactive Guide Toggle */}
                    {guideSteps && (
                        <div className="mb-6">
                            <button 
                                onClick={() => setShowGuide(!showGuide)}
                                className="flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                            >
                                <HelpCircle className="w-4 h-4" /> {showGuide ? t('HIDE_GUIDE') : t('SHOW_GUIDE')}
                            </button>
                            
                            {showGuide && (
                                <div className="mt-3 space-y-2 animate-in slide-in-from-top-2">
                                    {guideSteps.map((step, i) => (
                                        <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex gap-3 items-start">
                                            <div className="bg-indigo-100 text-indigo-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-black flex-shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-700">{language === 'ZH' ? step.textZH : step.textEN}</p>
                                            </div>
                                            {step.iconKey && (
                                                <div className="w-8 h-8">
                                                    <ItemIcon name={step.iconKey} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="space-y-3">
                        {activeQuest.tasks.map((task, idx) => (
                            <div key={idx} className="relative">
                                <div className="flex justify-between items-center mb-1 text-xs font-bold">
                                    <span className={task.isComplete ? "text-green-600 line-through" : "text-slate-700"}>
                                        {task.description}
                                    </span>
                                    <span className={task.isComplete ? "text-green-600" : "text-slate-400"}>
                                        {task.current}/{task.count}
                                    </span>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-500 ${task.isComplete ? 'bg-green-500' : 'bg-indigo-500'}`}
                                        style={{ width: `${Math.min(100, (task.current / task.count) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                readyToClaimQuests.length === 0 && (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center">
                        <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-slate-700">{t('ALL_DONE')}</h3>
                        <p className="text-slate-500 text-sm mt-2">{t('MASTER_FARMER')}</p>
                    </div>
                )
            )}

            {/* Upcoming (Locked) */}
            {lockedQuests.length > 0 && (
                <div className="opacity-60">
                    <h4 className="text-sm font-black text-slate-400 uppercase mb-3 pl-2">{t('UPCOMING')}</h4>
                    <div className="space-y-3">
                        {lockedQuests.map(quest => (
                            <div key={quest.id} className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex items-center gap-4">
                                <div className="bg-slate-200 p-2 rounded-xl">
                                    <Lock className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-600">{getQuestTitle(quest)}</h4>
                                    <span className="text-xs font-medium text-slate-400">{t('LOCKED')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Completed History */}
            {completedQuests.length > 0 && (
                <div>
                     <h4 className="text-sm font-black text-slate-400 uppercase mb-3 pl-2 mt-6">{t('COMPLETED')}</h4>
                     <div className="space-y-2">
                        {completedQuests.map(quest => (
                            <div key={quest.id} className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-600 line-through decoration-slate-300">{getQuestTitle(quest)}</span>
                                <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                        ))}
                     </div>
                </div>
            )}

        </div>
      </div>
    </div>
  );
};
