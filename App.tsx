
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, ToolType, Tile, SeasonType, WeatherType, MarketCandle, OptionType, FinancialOption, OptionHistoryRecord, ProcessingJob, AreaUpgradeType, AreaAutomationConfig, QuestTaskType, Language } from './types';
import { SEASONS, GRID_SIZE, INITIAL_MONEY, CROPS, LAND_COST, WEATHER_CHANCE, WATER_COST, WATER_AMOUNT, MAX_MOISTURE, EVAPORATION_RATE, AREA_CONFIG, GOLDEN_APPLE_ID, GOLDEN_APPLE_FRUIT_ID, RECIPES, AUTOMATION_COSTS, MONTH_NAMES, TUTORIAL_QUESTS, TRANSLATIONS } from './constants';
import { Grid } from './components/Grid';
import { Header, ActionDock } from './components/GameUI';
import { Almanac } from './components/Almanac';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { StockMarket } from './components/StockMarket';
import { Factory } from './components/Factory';
import { FarmOS } from './components/FarmOS';
import { QuestBoard } from './components/QuestBoard';
import { WeatherOverlay } from './components/WeatherOverlay';
import { AlertTriangle, Info } from 'lucide-react';

const App: React.FC = () => {
  
  // --- Helper: Generate Candle ---
  const generateCandle = (prevClose: number): MarketCandle => {
      let priceFactor = 0.95 + Math.random() * 0.15; 
      const rand = Math.random();
      
      if (rand < 0.05) {
          priceFactor = 1.2 + Math.random() * 0.15; 
      }
      else if (rand > 0.95) {
          priceFactor = 0.75 + Math.random() * 0.15; 
      }
      
      let close = Math.floor(prevClose * priceFactor);
      close = Math.max(2000, Math.min(80000, close));
      
      const open = prevClose;
      const bodyMax = Math.max(open, close);
      const bodyMin = Math.min(open, close);
      const volatility = bodyMax * 0.15;
      const high = Math.floor(bodyMax + Math.random() * volatility);
      const low = Math.floor(Math.max(100, bodyMin - Math.random() * volatility));

      return { open, close, high, low };
  };

  // --- Initial Market Data ---
  const initialMarketHistory: MarketCandle[] = [];
  let lastPrice = 10000;
  for (let i = 0; i < 12; i++) {
      const candle = generateCandle(lastPrice);
      initialMarketHistory.push(candle);
      lastPrice = candle.close;
  }

  // --- Initial Automation Config ---
  const initialAreaAutomation: Record<number, AreaAutomationConfig> = {};
  AREA_CONFIG.forEach(area => {
      initialAreaAutomation[area.id] = {
          areaId: area.id,
          hasIrrigation: false,
          irrigationEnabled: true,
          hasDrone: false,
          droneEnabled: true,
          autoSell: false,
          hasSeeder: false,
          seederEnabled: true,
          seederSeedId: null
      };
  });

  // --- State ---
  const [gameState, setGameState] = useState<GameState>({
    language: 'EN',
    turn: 0,
    currentMonth: 1,
    season: 'Spring',
    weather: 'Sunny',
    money: INITIAL_MONEY,
    selectedTool: ToolType.NONE,
    selectedSeedId: null,
    grid: Array.from({ length: GRID_SIZE }, (_, i) => ({
      id: i,
      state: 'empty',
      isLocked: false, 
      cropId: null,
      growthProgress: 0,
      isWatered: false,
      moisture: 60
    })),
    inventory: { 104: 3 }, 
    unlockedAreas: [0], 
    areaNames: { 0: "Main Garden", 1: "East Field", 2: "South Valley", 3: "Golden Orchard" },
    
    isFactoryUnlocked: false,
    isFarmOSUnlocked: false,

    areaAutomation: initialAreaAutomation,
    factoryHoppers: [false, false, false, false],
    hasConveyor: false,

    view: 'FARM',
    factorySlots: 1,
    activeJobs: [],

    goldenApplePrice: lastPrice,
    marketHistory: initialMarketHistory,
    options: [],
    optionHistory: [],

    quests: TUTORIAL_QUESTS,

    isAlmanacOpen: false,
    isShopOpen: false,
    isInventoryOpen: false,
    isStockMarketOpen: false,
    isFarmOSOpen: false,
    isQuestBoardOpen: false,
    messages: []
  });

  const [toast, setToast] = useState<{msg: string, type: 'error'|'success'|'info'} | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  // --- TRANSLATION HELPER ---
  const t = useCallback((key: string) => {
      const entry = TRANSLATIONS[key];
      return entry ? (gameState.language === 'ZH' ? entry.ZH : entry.EN) : key;
  }, [gameState.language]);

  const showToast = (msg: string, type: 'error'|'success'|'info' = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addMoney = (amount: number) => {
    setGameState(prev => ({ ...prev, money: prev.money + amount }));
  };

  const handleRenameArea = (areaId: number, newName: string) => {
    setGameState(prev => ({
      ...prev,
      areaNames: { ...prev.areaNames, [areaId]: newName }
    }));
  };

  // Month Change Toast Effect
  useEffect(() => {
      if (gameState.turn > 0) {
          const monthName = MONTH_NAMES[gameState.currentMonth - 1];
          const welcomeMsg = gameState.language === 'ZH' ? `欢迎来到 ${monthName}!` : `Welcome to ${monthName}!`;
          showToast(welcomeMsg, 'info');
      }
  }, [gameState.currentMonth, gameState.language]);

  // --- QUEST LOGIC ---
  const handleQuestProgress = useCallback((type: QuestTaskType, targetId?: number | string, amount = 1) => {
      setGameState(prev => {
          let questUpdated = false;
          const updatedQuests = prev.quests.map(quest => {
              if (quest.status !== 'ACTIVE') return quest;

              const updatedTasks = quest.tasks.map(task => {
                  if (task.isComplete) return task;
                  if (task.type === type) {
                      if (task.targetId !== undefined && targetId !== undefined && task.targetId != targetId) {
                          return task; 
                      }
                      if (type === 'WAIT_SEASON') {
                          return task; 
                      }
                      if (type === 'HAVE_MONEY') {
                          const newCurrent = Math.max(task.current, amount); 
                          if (newCurrent !== task.current) {
                               questUpdated = true;
                               return { ...task, current: newCurrent, isComplete: newCurrent >= task.count };
                          }
                          return task;
                      }

                      const newCurrent = Math.min(task.count, task.current + amount);
                      if (newCurrent !== task.current) {
                          questUpdated = true;
                          return { ...task, current: newCurrent, isComplete: newCurrent >= task.count };
                      }
                  }
                  return task;
              });

              const allComplete = updatedTasks.every(t => t.isComplete);
              if (allComplete) {
                   const msg = prev.language === 'ZH' 
                    ? `任务完成: ${quest.titleZH || quest.title}!`
                    : `Mission Complete: ${quest.title}!`;
                   showToast(msg, 'success');
                   questUpdated = true;
                   return { ...quest, tasks: updatedTasks, status: 'COMPLETED' as const };
              }

              return { ...quest, tasks: updatedTasks };
          });

          if (!questUpdated) return prev;
          return { ...prev, quests: updatedQuests };
      });
  }, []);
  
  useEffect(() => {
      handleQuestProgress('HAVE_MONEY', undefined, gameState.money);
  }, [gameState.money, handleQuestProgress]);

  const handleClaimQuestReward = (questId: number) => {
      setGameState(prev => {
          const quest = prev.quests.find(q => q.id === questId);
          if (!quest || quest.status !== 'COMPLETED') return prev;

          const nextQuestId = quest.id + 1;
          const updatedQuests = prev.quests.map(q => {
              if (q.id === questId) return { ...q, status: 'CLAIMED' as const };
              if (q.id === nextQuestId) return { ...q, status: 'ACTIVE' as const };
              return q;
          });
          
          let extraUpdates: Partial<GameState> = {};

          if (quest.rewardType === 'UNLOCK_FEATURE') {
              if (quest.rewardFeature === 'FACTORY') {
                  extraUpdates.isFactoryUnlocked = true;
                  showToast(t('TECH_BARN') + " Unlocked!", 'success');
              }
              if (quest.rewardFeature === 'FARM_OS') {
                  extraUpdates.isFarmOSUnlocked = true;
                  const currentAuto = prev.areaAutomation[0];
                  extraUpdates.areaAutomation = {
                      ...prev.areaAutomation,
                      [0]: { ...currentAuto, hasIrrigation: true }
                  }
                  showToast(t('FARM_OS') + " Installed!", 'success');
              }
          }

          showToast(`${t('CLAIM')} ${t('REWARD')}: $${quest.rewardMoney}`, 'success');
          return {
              ...prev,
              money: prev.money + quest.rewardMoney,
              quests: updatedQuests,
              ...extraUpdates
          };
      });
  };


  // --- AUTOMATION HANDLERS ---

  const handleBuyAreaUpgrade = (areaId: number, type: AreaUpgradeType) => {
      const cost = AUTOMATION_COSTS[type];
      if (gameState.money < cost) {
          showToast(t('INSUFFICIENT_FUNDS') || "Insufficient Funds", 'error');
          return;
      }
      setGameState(prev => {
          const config = { ...prev.areaAutomation[areaId] };
          if (type === 'IRRIGATION') config.hasIrrigation = true;
          if (type === 'DRONE') config.hasDrone = true;
          if (type === 'SEEDER') config.hasSeeder = true;

          return {
              ...prev,
              money: prev.money - cost,
              areaAutomation: { ...prev.areaAutomation, [areaId]: config }
          };
      });
      handleQuestProgress('INSTALL_UPGRADE', type);
      showToast(`${t('INSTALLED')} ${type}!`, 'success');
  };

  const handleToggleAreaUpgrade = (areaId: number, type: AreaUpgradeType) => {
      setGameState(prev => {
          const config = { ...prev.areaAutomation[areaId] };
          if (type === 'IRRIGATION') config.irrigationEnabled = !config.irrigationEnabled;
          if (type === 'DRONE') config.droneEnabled = !config.droneEnabled;
          if (type === 'SEEDER') config.seederEnabled = !config.seederEnabled;

          return {
              ...prev,
              areaAutomation: { ...prev.areaAutomation, [areaId]: config }
          };
      });
  };

  const handleSetAreaAutoSell = (areaId: number, enabled: boolean) => {
      setGameState(prev => ({
          ...prev,
          areaAutomation: {
              ...prev.areaAutomation,
              [areaId]: { ...prev.areaAutomation[areaId], autoSell: enabled }
          }
      }));
  };

  const handleSetAreaSeederId = (areaId: number, seedId: number | null) => {
      setGameState(prev => ({
          ...prev,
          areaAutomation: {
              ...prev.areaAutomation,
              [areaId]: { ...prev.areaAutomation[areaId], seederSeedId: seedId }
          }
      }));
  };

  const handleBuyFactoryUpgrade = (type: 'HOPPER' | 'CONVEYOR', slotIndex?: number) => {
      const cost = AUTOMATION_COSTS[type];
      if (gameState.money < cost) {
          showToast("Insufficient funds!", 'error');
          return;
      }

      setGameState(prev => {
          let updates = {};
          if (type === 'CONVEYOR') {
              updates = { hasConveyor: true };
          } else if (type === 'HOPPER' && slotIndex !== undefined) {
              const newHoppers = [...prev.factoryHoppers];
              newHoppers[slotIndex] = true;
              updates = { factoryHoppers: newHoppers };
          }
          return { ...prev, money: prev.money - cost, ...updates };
      });
      showToast(`${t('INSTALLED')} ${type}!`, 'success');
  };


  // --- REAL-TIME FACTORY LOOP & AUTOMATION ---
  const handleStartJob = useCallback((recipeId: number, forcedSlotIndex?: number) => {
      setGameState(prev => {
          const recipe = RECIPES.find(r => r.id === recipeId);
          if (!recipe) return prev;
          
          let slotToUse = forcedSlotIndex;
          if (slotToUse === undefined) {
              for (let i = 0; i < prev.factorySlots; i++) {
                  if (!prev.activeJobs.find(j => j.slotIndex === i)) {
                      slotToUse = i;
                      break;
                  }
              }
          }

          if (slotToUse === undefined || slotToUse >= prev.factorySlots || prev.activeJobs.find(j => j.slotIndex === slotToUse)) {
              if (forcedSlotIndex === undefined) showToast(TRANSLATIONS['LINES_FULL']?.[prev.language] || "Lines Full", 'error'); 
              return prev;
          }

          const owned = prev.inventory[recipe.inputItemId] || 0;
          if (owned < recipe.inputCount) {
              if (forcedSlotIndex === undefined) showToast(TRANSLATIONS['INSUFFICIENT_INPUT']?.[prev.language] || "Not enough materials", 'error');
              return prev;
          }

          const now = Date.now();
          const newJob: ProcessingJob = {
              id: Math.random().toString(36).substr(2, 9),
              recipeId,
              slotIndex: slotToUse,
              startTime: now,
              endTime: now + (recipe.realTimeSeconds * 1000),
              isComplete: false
          };

          if (forcedSlotIndex === undefined) showToast("Production started!", 'success');

          return {
              ...prev,
              inventory: {
                  ...prev.inventory,
                  [recipe.inputItemId]: owned - recipe.inputCount
              },
              activeJobs: [...prev.activeJobs, newJob]
          };
      });
  }, []);

  const handleCollectJob = useCallback((jobId: string) => {
      setGameState(prev => {
          const job = prev.activeJobs.find(j => j.id === jobId);
          if (!job || !job.isComplete) return prev;
          
          const recipe = RECIPES.find(r => r.id === job.recipeId);
          if (!recipe) return prev;

          const newInventory = {
              ...prev.inventory,
              [recipe.outputItemId]: (prev.inventory[recipe.outputItemId] || 0) + recipe.outputCount
          };

          let questState = prev.quests;
          const activeQuest = prev.quests.find(q => q.status === 'ACTIVE');
          if (activeQuest) {
             const updatedTasks = activeQuest.tasks.map(t => {
                 if (t.type === 'FACTORY_PRODUCE' && !t.isComplete) {
                     if (t.targetId == recipe.outputItemId) {
                         const newCurrent = Math.min(t.count, t.current + 1);
                         return { ...t, current: newCurrent, isComplete: newCurrent >= t.count };
                     }
                 }
                 return t;
             });
             const allComplete = updatedTasks.every(t => t.isComplete);
             const newStatus = allComplete ? 'COMPLETED' : 'ACTIVE';
             if (allComplete && activeQuest.status !== 'COMPLETED') {
                const msg = prev.language === 'ZH' ? `任务完成: ${activeQuest.titleZH || activeQuest.title}` : `Mission Complete: ${activeQuest.title}`;
                showToast(msg, 'success');
             }

             questState = prev.quests.map(q => q.id === activeQuest.id ? { ...q, tasks: updatedTasks, status: newStatus as any } : q);
          }

          let nextJobs = prev.activeJobs.filter(j => j.id !== jobId);
          let inventoryForHopper = newInventory;
          
          const hasHopper = prev.factoryHoppers[job.slotIndex];
          if (hasHopper) {
               const inputOwned = newInventory[recipe.inputItemId] || 0;
               if (inputOwned >= recipe.inputCount) {
                   const now = Date.now();
                   const autoJob: ProcessingJob = {
                        id: Math.random().toString(36).substr(2, 9),
                        recipeId: job.recipeId,
                        slotIndex: job.slotIndex,
                        startTime: now,
                        endTime: now + (recipe.realTimeSeconds * 1000),
                        isComplete: false
                   };
                   nextJobs = [...nextJobs, autoJob];
                   inventoryForHopper = {
                       ...newInventory,
                       [recipe.inputItemId]: inputOwned - recipe.inputCount
                   };
               }
          }

          if (!prev.hasConveyor) {
              const cropName = CROPS.find(c => c.id === recipe.outputItemId)?.name;
              showToast(`${t('COLLECT')} ${recipe.outputCount} ${cropName}!`, 'success');
          }

          return {
              ...prev,
              inventory: inventoryForHopper,
              activeJobs: nextJobs,
              quests: questState
          };
      });
  }, [t]);


  useEffect(() => {
      const interval = setInterval(() => {
          setGameState(prev => {
              const now = Date.now();
              let updatesRequired = false;
              const updatedJobs = prev.activeJobs.map(job => {
                  if (job.isComplete) return job;
                  if (now >= job.endTime) {
                      updatesRequired = true;
                      return { ...job, isComplete: true };
                  }
                  return job;
              });

              if (prev.hasConveyor) {
                  const finishedJobs = updatedJobs.filter(j => j.isComplete);
                  if (finishedJobs.length > 0) {
                       
                       let currentJobs = updatedJobs;
                       let currentInventory = { ...prev.inventory };
                       let currentQuests = prev.quests; 

                       const remainingJobs: ProcessingJob[] = [];
                       
                       for (const job of currentJobs) {
                           if (job.isComplete) {
                               const recipe = RECIPES.find(r => r.id === job.recipeId);
                               if (recipe) {
                                   currentInventory[recipe.outputItemId] = (currentInventory[recipe.outputItemId] || 0) + recipe.outputCount;
                                   
                                   const activeQuest = currentQuests.find(q => q.status === 'ACTIVE');
                                   if (activeQuest) {
                                        const updatedTasks = activeQuest.tasks.map(t => {
                                            if (t.type === 'FACTORY_PRODUCE' && !t.isComplete && t.targetId == recipe.outputItemId) {
                                                return { ...t, current: Math.min(t.count, t.current + 1), isComplete: t.current + 1 >= t.count };
                                            }
                                            return t;
                                        });
                                        if (updatedTasks.some(t => t.isComplete !== activeQuest.tasks.find(at => at.description === t.description)?.isComplete)) {
                                             const allComplete = updatedTasks.every(t => t.isComplete);
                                             if (allComplete) {
                                                 const msg = prev.language === 'ZH' ? `任务完成: ${activeQuest.titleZH}` : `Mission Complete: ${activeQuest.title}`;
                                                 showToast(msg, 'success');
                                             }
                                             currentQuests = currentQuests.map(q => q.id === activeQuest.id ? { ...q, tasks: updatedTasks, status: allComplete ? 'COMPLETED' : 'ACTIVE' } : q);
                                        }
                                   }

                                   const hasHopper = prev.factoryHoppers[job.slotIndex];
                                   if (hasHopper && (currentInventory[recipe.inputItemId] || 0) >= recipe.inputCount) {
                                       currentInventory[recipe.inputItemId] -= recipe.inputCount;
                                       remainingJobs.push({
                                            id: Math.random().toString(36).substr(2, 9),
                                            recipeId: job.recipeId,
                                            slotIndex: job.slotIndex,
                                            startTime: now,
                                            endTime: now + (recipe.realTimeSeconds * 1000),
                                            isComplete: false
                                       });
                                       updatesRequired = true;
                                   } else {
                                       updatesRequired = true;
                                   }
                               }
                           } else {
                               remainingJobs.push(job);
                           }
                       }
                       
                       if (updatesRequired) {
                           return { ...prev, inventory: currentInventory, activeJobs: remainingJobs, quests: currentQuests };
                       }
                  }
              }
              
              if (updatesRequired) {
                  return { ...prev, activeJobs: updatedJobs };
              }
              return prev;
          });
      }, 1000);
      return () => clearInterval(interval);
  }, []);


  // --- Logic: Factory Manual ---
  const handleBuyFactorySlot = () => {
      const cost = 5000 * gameState.factorySlots;
      if (gameState.money >= cost) {
          if (gameState.factorySlots >= 4) return;
          setGameState(prev => ({
              ...prev,
              money: prev.money - cost,
              factorySlots: prev.factorySlots + 1
          }));
          showToast("Factory expanded!", 'success');
      } else {
          showToast(`Need $${cost} to expand`, 'error');
      }
  };

  // --- Logic: Stock Options ---
  const handleBuyOption = (type: OptionType) => {
    const fruitCount = gameState.inventory[GOLDEN_APPLE_FRUIT_ID] || 0;
    if (fruitCount < 1) {
        showToast("Need 1 Golden Apple to pay premium!", 'error');
        return;
    }
    
    const newOption: FinancialOption = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        strikePrice: gameState.goldenApplePrice,
        premium: 1, 
        contractSize: 1, 
        expiryTurn: gameState.turn + 1 
    };

    setGameState(prev => ({
        ...prev,
        inventory: {
            ...prev.inventory,
            [GOLDEN_APPLE_FRUIT_ID]: (prev.inventory[GOLDEN_APPLE_FRUIT_ID] || 0) - 1
        },
        options: [...prev.options, newOption]
    }));
    handleQuestProgress('BUY_OPTION', type);
    showToast(`${type} Option Purchased!`, 'success');
  };

  const handleExerciseOption = (optionId: string) => {
      const option = gameState.options.find(o => o.id === optionId);
      if (!option) return;

      const currentPrice = gameState.goldenApplePrice;
      let profitPerUnit = 0;

      if (option.type === 'CALL') {
          profitPerUnit = currentPrice - option.strikePrice;
      } else {
          profitPerUnit = option.strikePrice - currentPrice;
      }

      const totalProfit = profitPerUnit * option.contractSize;

      if (totalProfit <= 0) {
          showToast("Option is worthless (Out of Money).", 'error');
          return; 
      }

      const record: OptionHistoryRecord = {
          id: optionId,
          turn: gameState.turn,
          type: option.type,
          strikePrice: option.strikePrice,
          marketPriceAtExercise: currentPrice,
          profit: totalProfit
      };

      setGameState(prev => ({
          ...prev,
          money: prev.money + totalProfit,
          options: prev.options.filter(o => o.id !== optionId),
          optionHistory: [record, ...prev.optionHistory]
      }));
      showToast(`Exercised! Earned $${totalProfit}`, 'success');
  };


  // --- Logic: Shop / Buy & Sell ---
  const handleBuyItem = (itemId: number, cost: number) => {
      if (gameState.money < cost) {
          showToast("Not enough money!", 'error');
          return;
      }
      
      setGameState(prev => ({
          ...prev,
          money: prev.money - cost,
          inventory: {
              ...prev.inventory,
              [itemId]: (prev.inventory[itemId] || 0) + 1
          }
      }));
      showToast("Purchased!", 'success');
  };

  const handleSellItem = (itemId: number, amount: number) => {
      const owned = gameState.inventory[itemId] || 0;
      if (owned < amount) {
          showToast("Not enough items!", 'error');
          return;
      }

      const item = CROPS.find(c => c.id === itemId);
      if (!item) return;

      const revenue = item.sellPrice * amount;
      
      setGameState(prev => ({
          ...prev,
          money: prev.money + revenue,
          inventory: {
              ...prev.inventory,
              [itemId]: owned - amount
          }
      }));
      showToast(`Sold ${amount} ${item.name} for $${revenue}`, 'success');
  };

  const handleBuyFruit = () => {
      handleBuyItem(GOLDEN_APPLE_FRUIT_ID, gameState.goldenApplePrice);
  };

  const handleSellFruit = () => {
      const fruitCount = gameState.inventory[GOLDEN_APPLE_FRUIT_ID] || 0;
      if (fruitCount <= 0) {
          showToast("No apples to sell!", 'error');
          return;
      }
      const price = gameState.goldenApplePrice;
      setGameState(prev => ({
          ...prev,
          money: prev.money + price,
          inventory: {
              ...prev.inventory,
              [GOLDEN_APPLE_FRUIT_ID]: prev.inventory[GOLDEN_APPLE_FRUIT_ID] - 1
          }
      }));
      showToast(`Sold 1 Apple for $${price}`, 'success');
  };

  // --- Logic: Unlock Area ---
  const handleUnlockArea = (areaId: number) => {
      const area = AREA_CONFIG.find(a => a.id === areaId);
      if (!area) return;

      if (gameState.money >= area.cost) {
          setGameState(prev => ({
              ...prev,
              money: prev.money - area.cost,
              unlockedAreas: [...prev.unlockedAreas, areaId]
          }));
          handleQuestProgress('UNLOCK_AREA', areaId);
          showToast(`Unlocked Area!`, 'success');
      } else {
          showToast(`Need $${area.cost} to unlock`, 'error');
      }
  };

  // --- Logic: Weather Generation ---
  const generateWeather = (season: SeasonType): WeatherType => {
    const chances = WEATHER_CHANCE[season];
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [type, chance] of Object.entries(chances)) {
      cumulative += (chance as number);
      if (rand <= cumulative) return type as WeatherType;
    }
    return 'Sunny'; 
  };

  // --- Logic: Next Month (Turn) ---
  const handleNextMonth = useCallback(() => {
    setGameState(prev => {
      const nextTurn = prev.turn + 1;
      const nextMonth = (nextTurn % 12) + 1;
      
      let nextSeason: SeasonType = 'Spring';
      if (nextMonth >= 4 && nextMonth <= 6) nextSeason = 'Summer';
      if (nextMonth >= 7 && nextMonth <= 9) nextSeason = 'Autumn';
      if (nextMonth >= 10 && nextMonth <= 12) nextSeason = 'Winter';

      let questState = prev.quests;
      const activeQuest = prev.quests.find(q => q.status === 'ACTIVE');
      if (activeQuest) {
         const updatedTasks = activeQuest.tasks.map(t => {
             if (t.type === 'WAIT_SEASON' && !t.isComplete) {
                 if (t.targetId === nextSeason) {
                     return { ...t, current: 1, isComplete: true };
                 }
             }
             return t;
         });
         const allComplete = updatedTasks.every(t => t.isComplete);
         if (allComplete && activeQuest.status !== 'COMPLETED') {
             const msg = prev.language === 'ZH' ? `任务完成: ${activeQuest.titleZH}` : `Mission Complete: ${activeQuest.title}`;
             showToast(msg, 'success');
         }
         questState = prev.quests.map(q => q.id === activeQuest.id ? { ...q, tasks: updatedTasks, status: allComplete ? 'COMPLETED' : 'ACTIVE' as any } : q);
      }

      const nextWeather = generateWeather(nextSeason);
      const newCandle = generateCandle(prev.goldenApplePrice);
      const newMarketHistory = [...prev.marketHistory, newCandle];
      
      if (nextWeather === 'Earthquake') {
         setIsShaking(true);
         setTimeout(() => setIsShaking(false), 1000);
         showToast("Earthquake detected! Check for damage.", "error");
      }

      const survivingOptions = prev.options.filter(opt => opt.expiryTurn >= nextTurn);
      if (prev.options.length > survivingOptions.length) {
          showToast("Some unused options expired.", 'info');
      }

      const validHistory = prev.optionHistory.filter(h => h.turn >= nextTurn - 12);
      
      const profitableCount = survivingOptions.filter(opt => {
         const diff = opt.type === 'CALL' 
            ? newCandle.close - opt.strikePrice 
            : opt.strikePrice - newCandle.close;
         return diff > 0;
      }).length;
      
      if (profitableCount > 0) {
          setTimeout(() => showToast(`You have ${profitableCount} profitable options!`, 'success'), 1000);
      }

      const tilesToDamage: number[] = [];
      if (nextWeather === 'Earthquake') {
         const availableTiles = prev.grid.filter(t => {
            const areaId = Math.floor(t.id / 12);
            return prev.unlockedAreas.includes(areaId) && !t.isLocked && t.state !== 'damaged';
         });
         const damageCount = Math.random() > 0.7 ? 2 : 1;
         for (let i = 0; i < damageCount; i++) {
            if (availableTiles.length === 0) break;
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            tilesToDamage.push(availableTiles[randomIndex].id);
            availableTiles.splice(randomIndex, 1);
         }
      }
      
      let moneyChange = 0;
      const inventoryChanges: Record<number, number> = { ...prev.inventory };
      const updatedGrid = prev.grid.map(tile => {
        if (tile.isLocked) return tile;

        const areaId = Math.floor(tile.id / 12);
        const automation = prev.areaAutomation[areaId];
        const crop = CROPS.find(c => c.id === tile.cropId);

        if (automation && automation.hasDrone && automation.droneEnabled && tile.state === 'mature' && crop) {
             if (automation.autoSell) {
                 const price = crop.id === GOLDEN_APPLE_ID ? newCandle.close : (CROPS.find(c => c.id === (crop.harvestYieldId || crop.id))?.sellPrice || 0);
                 moneyChange += price;
                 return { ...tile, state: 'empty' as const, cropId: null, growthProgress: 0, isWatered: false, note: undefined, shelfLife: 0 };
             } else {
                 const yieldId = crop.harvestYieldId || crop.id;
                 inventoryChanges[yieldId] = (inventoryChanges[yieldId] || 0) + 1;
                 return { ...tile, state: 'empty' as const, cropId: null, growthProgress: 0, isWatered: false, note: undefined, shelfLife: 0 };
             }
        }

        if (automation && automation.hasSeeder && automation.seederEnabled && automation.seederSeedId && tile.state === 'empty' && !tilesToDamage.includes(tile.id)) {
             const seedId = automation.seederSeedId;
             const seedCount = inventoryChanges[seedId] || 0;
             const seedCrop = CROPS.find(c => c.id === seedId);
             
             if (seedCount > 0 && seedCrop) {
                 inventoryChanges[seedId]--;
                 return { 
                     ...tile, 
                     state: 'seeded' as const, 
                     cropId: seedId, 
                     growthProgress: 0, 
                     isWatered: false, 
                     moisture: Math.max(tile.moisture, 40) 
                 };
             }
        }

        if (tile.state === 'damaged') {
            if (tile.recoveryTime && tile.recoveryTime > 1) {
                return { ...tile, recoveryTime: tile.recoveryTime - 1 };
            } else {
                return { ...tile, state: 'empty' as const, recoveryTime: undefined, note: 'Land recovered' };
            }
        }

        if (tilesToDamage.includes(tile.id)) {
            return { 
                ...tile, 
                state: 'damaged' as const, 
                recoveryTime: 12, 
                cropId: null, 
                growthProgress: 0, 
                note: 'Destroyed by Earthquake' 
            };
        }

        if (tile.state === 'dead' || tile.state === 'empty') {
           return { ...tile, isWatered: false, moisture: Math.max(0, tile.moisture - EVAPORATION_RATE) };
        }

        const currentCrop = CROPS.find(c => c.id === tile.cropId);
        if (!currentCrop) return tile;

        if (tile.state === 'mature' && currentCrop.id === GOLDEN_APPLE_ID) {
            const shelfLife = (tile.shelfLife || 0) + 1;
            if (shelfLife > 9) {
                return { ...tile, state: 'dead' as const, note: 'Rotted (Old Age)', moisture: 0 };
            }
            return { ...tile, shelfLife };
        }
        if (tile.state === 'mature' && currentCrop.id !== GOLDEN_APPLE_ID) {
             return { ...tile, state: 'dead' as const, note: 'Crop rotted. Harvest earlier!', moisture: 0 };
        }

        if (nextSeason === 'Winter' && !currentCrop.isColdResistant) {
          return { 
             ...tile, 
             state: 'dead' as const, 
             note: `${currentCrop.name} cannot survive Winter frost. Plant in ${currentCrop.suitableSeasons.join(' or ')}.` 
          };
        }
        if (nextSeason === 'Summer' && currentCrop.isHeatSensitive) {
          return { 
             ...tile, 
             state: 'dead' as const, 
             note: `${currentCrop.name} cannot survive Summer heat. Plant in ${currentCrop.suitableSeasons.join(' or ')}.` 
          };
        }

        let newMoisture = tile.moisture;
        let hasGrown = false;

        if (newMoisture > 0) {
           hasGrown = true;
           newMoisture -= 10; 
        } else {
           if (prev.weather === 'Drought') {
             return { ...tile, state: 'dead' as const, note: 'Withered due to Drought.' };
           }
        }

        if (automation && automation.hasIrrigation && automation.irrigationEnabled && nextWeather !== 'Drought') {
             if (newMoisture < 50) newMoisture = 50;
        }

        if (nextWeather === 'Rainy') newMoisture += 50; 
        if (nextWeather === 'Storm') newMoisture = MAX_MOISTURE;
        if (nextWeather === 'Sunny') newMoisture -= EVAPORATION_RATE; 
        if (nextWeather === 'Drought') newMoisture -= (EVAPORATION_RATE * 2); 
        
        newMoisture = Math.max(0, Math.min(MAX_MOISTURE, newMoisture));

        if (!hasGrown) {
            return { ...tile, moisture: newMoisture, note: 'Needs water (Stunted)' };
        }

        const newProgress = tile.growthProgress + 1;
        let newState: Tile['state'] = tile.state;
        
        if (newProgress >= currentCrop.duration) {
            newState = 'mature';
            if (!toast && !automation?.hasDrone) showToast(`${currentCrop.name} is ready!`, 'success');
        }

        return { 
            ...tile, 
            state: newState, 
            growthProgress: newProgress, 
            isWatered: false,
            moisture: newMoisture
        };
      });

      return {
        ...prev,
        turn: nextTurn,
        currentMonth: nextMonth,
        season: nextSeason,
        weather: nextWeather,
        grid: updatedGrid,
        money: prev.money + moneyChange,
        inventory: inventoryChanges,
        selectedTool: ToolType.NONE,
        goldenApplePrice: newCandle.close,
        marketHistory: newMarketHistory,
        options: survivingOptions,
        optionHistory: validHistory,
        quests: questState
      };
    });
  }, [toast]);

  // --- Logic: Planting ---
  const handlePlant = (tileId: number, seedId: number) => {
    const tile = gameState.grid[tileId];
    if (tile.state !== 'empty') {
      showToast("Clear the land first!", 'error');
      return;
    }
    const crop = CROPS.find(c => c.id === seedId);
    if (!crop) return;
    const areaId = Math.floor(tileId / 12);
    if (seedId === GOLDEN_APPLE_ID && areaId !== 3) {
        showToast("Golden Apples only grow in the Golden Orchard!", 'error');
        return;
    }
    if (areaId === 3 && seedId !== GOLDEN_APPLE_ID) {
        showToast("Only Golden Apples grow in this mystic soil!", 'error');
        return;
    }
    const ownedCount = gameState.inventory[seedId] || 0;
    if (ownedCount <= 0) {
      showToast("Out of seeds! Buy more.", 'error');
      return;
    }
    setGameState(prev => ({
      ...prev,
      inventory: {
          ...prev.inventory,
          [seedId]: prev.inventory[seedId] - 1
      },
      grid: prev.grid.map(t => t.id === tileId ? {
        ...t,
        state: 'seeded' as const, 
        cropId: crop.id,
        growthProgress: 0,
        isWatered: false,
        moisture: Math.max(t.moisture, 40),
        note: undefined, 
        shelfLife: 0
      } : t)
    }));
    handleQuestProgress('PLANT', seedId);
  };

  // --- Logic: Interactions ---
  const handleTileClick = (tileId: number) => {
    const tile = gameState.grid[tileId];
    const { selectedTool, selectedSeedId, money } = gameState;

    const updateTile = (updates: Partial<Tile>) => {
      setGameState(prev => ({
        ...prev,
        grid: prev.grid.map(t => t.id === tileId ? { ...t, ...updates } : t)
      }));
    };

    if (tile.state === 'damaged') {
        showToast(`Land damaged by earthquake. Repairs in ${tile.recoveryTime} months.`, 'error');
        return;
    }

    if (selectedTool === ToolType.SELL && tile.state === 'mature') {
      const seed = CROPS.find(c => c.id === tile.cropId);
      if (seed) {
        const produceId = seed.harvestYieldId || seed.id; 
        const produce = CROPS.find(c => c.id === produceId);
        if (!produce) return;

        if (seed.id === GOLDEN_APPLE_ID) {
            addMoney(gameState.goldenApplePrice);
            showToast(`Sold Golden Apple for $${gameState.goldenApplePrice}`, 'success');
        } else {
            addMoney(produce.sellPrice);
            showToast(`Sold ${produce.name} for $${produce.sellPrice}`, 'success');
        }
        updateTile({ state: 'empty', cropId: null, growthProgress: 0, isWatered: false, note: undefined, shelfLife: 0 });
        handleQuestProgress('SELL', produceId);
      }
      return;
    }

    if ((selectedTool === ToolType.NONE) && tile.state === 'mature') {
        const seed = CROPS.find(c => c.id === tile.cropId);
        if (seed) {
            const produceId = seed.harvestYieldId || seed.id;
            const produce = CROPS.find(c => c.id === produceId);
            if (!produce) return;
            setGameState(prev => ({
                ...prev,
                inventory: {
                    ...prev.inventory,
                    [produceId]: (prev.inventory[produceId] || 0) + 1
                }
            }));
            showToast(`Harvested ${produce.name}!`, 'success');
            updateTile({ state: 'empty', cropId: null, growthProgress: 0, isWatered: false, note: undefined, shelfLife: 0 });
            handleQuestProgress('HARVEST', produceId);
        }
        return;
    }

    if (selectedTool === ToolType.WATER) {
      if (tile.state === 'empty' || tile.state === 'dead') return;
      if (tile.moisture >= MAX_MOISTURE) {
        showToast("Soil is already soaked!", "info");
        return;
      }
      if (money < WATER_COST) {
        showToast("Not enough money to pump water!", "error");
        return;
      }
      setGameState(prev => ({ ...prev, money: prev.money - WATER_COST }));
      updateTile({ 
        moisture: Math.min(MAX_MOISTURE, tile.moisture + WATER_AMOUNT),
        isWatered: true,
        note: undefined 
      });
      handleQuestProgress('WATER', undefined);
      return;
    }

    if (selectedTool === ToolType.SHOVEL) {
      if (tile.state !== 'dead' && !(tile.state === 'empty' && tile.note)) return;
      updateTile({ state: 'empty', cropId: null, growthProgress: 0, isWatered: false, note: undefined });
      return;
    }

    if (selectedTool === ToolType.SEED && selectedSeedId) {
      handlePlant(tileId, selectedSeedId);
    }
  };

  // --- Visuals ---
  const getBackgroundGradient = () => {
      switch(gameState.season) {
          case 'Spring': return 'from-emerald-200 via-emerald-100 to-sky-100';
          case 'Summer': return 'from-sky-300 via-sky-100 to-blue-50';
          case 'Autumn': return 'from-orange-200 via-amber-100 to-stone-100';
          case 'Winter': return 'from-slate-200 via-slate-100 to-white';
      }
  };

  if (gameState.view === 'FACTORY') {
      return (
          <Factory 
            isOpen={true}
            onClose={() => setGameState(p => ({ ...p, view: 'FARM' }))}
            inventory={gameState.inventory}
            money={gameState.money}
            activeJobs={gameState.activeJobs}
            factorySlots={gameState.factorySlots}
            factoryHoppers={gameState.factoryHoppers}
            hasConveyor={gameState.hasConveyor}
            onStartJob={handleStartJob}
            onCollectJob={handleCollectJob}
            onBuySlot={handleBuyFactorySlot}
            t={t}
          />
      );
  }

  const activeQuest = gameState.quests.find(q => q.status === 'ACTIVE');
  const readyToClaimQuest = gameState.quests.find(q => q.status === 'COMPLETED');

  return (
    <div className={`min-h-screen font-sans relative select-none overflow-y-auto bg-gradient-to-br ${getBackgroundGradient()} ${isShaking ? 'shake' : ''}`}>
      
      <div className="fixed top-10 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <WeatherOverlay season={gameState.season} weather={gameState.weather} />

      <Header 
        season={gameState.season} 
        weather={gameState.weather}
        turn={gameState.turn} 
        currentMonth={gameState.currentMonth}
        money={gameState.money}
        unlockedAreas={gameState.unlockedAreas}
        activeQuest={activeQuest}
        readyToClaimQuest={readyToClaimQuest}
        isFactoryUnlocked={gameState.isFactoryUnlocked}
        language={gameState.language}
        onOpenAlmanac={() => setGameState(p => ({ ...p, isAlmanacOpen: true }))}
        onOpenShop={() => setGameState(p => ({ ...p, isShopOpen: true }))}
        onOpenInventory={() => setGameState(p => ({ ...p, isInventoryOpen: true }))}
        onOpenStockMarket={() => setGameState(p => ({ ...p, isStockMarketOpen: true }))}
        onOpenFactory={() => setGameState(p => ({ ...p, view: 'FACTORY' }))}
        onOpenQuestBoard={() => setGameState(p => ({ ...p, isQuestBoardOpen: true }))}
        onAddDebugMoney={() => addMoney(10000)}
        t={t}
      />

      {/* Main View */}
      <main className="flex flex-col items-center justify-center min-h-screen relative z-10 pt-24 pb-32 w-full">
        {toast && (
           <div className={`fixed top-24 px-5 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-6 pointer-events-none w-max max-w-sm border border-white/50 backdrop-blur-md
             ${toast.type === 'error' ? 'bg-red-50 text-red-600' : ''}
             ${toast.type === 'success' ? 'bg-green-50 text-green-600' : ''}
             ${toast.type === 'info' ? 'bg-white text-slate-600' : ''}
           `}>
              {toast.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
              <span className="font-bold text-sm">{toast.msg}</span>
           </div>
        )}

        <div className="transform scale-100 transition-transform duration-500 w-full flex justify-center">
            <Grid 
              grid={gameState.grid}
              unlockedAreas={gameState.unlockedAreas}
              areaNames={gameState.areaNames}
              areaAutomation={gameState.areaAutomation}
              currentSeason={gameState.season}
              selectedTool={gameState.selectedTool}
              selectedSeedId={gameState.selectedSeedId}
              onTileClick={handleTileClick}
              onPlant={handlePlant}
              onUnlockArea={handleUnlockArea}
              onRenameArea={handleRenameArea}
            />
        </div>
      </main>

      <ActionDock 
        selectedTool={gameState.selectedTool}
        onSelectTool={(t) => setGameState(p => ({ ...p, selectedTool: t }))}
        onNextMonth={handleNextMonth}
        onSelectSeed={(id) => setGameState(p => ({ ...p, selectedSeedId: id }))}
        selectedSeedId={gameState.selectedSeedId}
        money={gameState.money}
        season={gameState.season}
        inventory={gameState.inventory}
        currentMonth={gameState.currentMonth}
        isFarmOSUnlocked={gameState.isFarmOSUnlocked}
        onOpenFarmOS={() => setGameState(p => ({ ...p, isFarmOSOpen: true }))}
        t={t}
        toggleLanguage={() => setGameState(p => ({ ...p, language: p.language === 'EN' ? 'ZH' : 'EN' }))}
        language={gameState.language}
      />

      <Almanac 
        isOpen={gameState.isAlmanacOpen} 
        onClose={() => setGameState(p => ({ ...p, isAlmanacOpen: false }))} 
        t={t}
      />
      
      <Shop 
        isOpen={gameState.isShopOpen}
        onClose={() => setGameState(p => ({ ...p, isShopOpen: false }))}
        money={gameState.money}
        onBuy={handleBuyItem}
        currentSeason={gameState.season}
        inventory={gameState.inventory}
        onSell={handleSellItem}
        unlockedAreas={gameState.unlockedAreas}
        t={t}
      />

      <Inventory
        isOpen={gameState.isInventoryOpen}
        onClose={() => setGameState(p => ({ ...p, isInventoryOpen: false }))}
        inventory={gameState.inventory}
        t={t}
      />

      <StockMarket
        isOpen={gameState.isStockMarketOpen}
        onClose={() => setGameState(p => ({ ...p, isStockMarketOpen: false }))}
        currentPrice={gameState.goldenApplePrice}
        marketHistory={gameState.marketHistory}
        money={gameState.money}
        onBuySeed={(cost) => handleBuyItem(GOLDEN_APPLE_ID, cost)}
        onBuyFruit={handleBuyFruit}
        onSellFruit={handleSellFruit}
        fruitInventory={gameState.inventory[GOLDEN_APPLE_FRUIT_ID] || 0}
        options={gameState.options}
        optionHistory={gameState.optionHistory}
        onBuyOption={handleBuyOption}
        onExerciseOption={handleExerciseOption}
        t={t}
      />

      <FarmOS 
         isOpen={gameState.isFarmOSOpen}
         onClose={() => setGameState(p => ({ ...p, isFarmOSOpen: false }))}
         money={gameState.money}
         unlockedAreas={gameState.unlockedAreas}
         areaAutomation={gameState.areaAutomation}
         factoryHoppers={gameState.factoryHoppers}
         factorySlots={gameState.factorySlots}
         hasConveyor={gameState.hasConveyor}
         inventory={gameState.inventory}
         onBuyAreaUpgrade={handleBuyAreaUpgrade}
         onToggleAreaUpgrade={handleToggleAreaUpgrade}
         onSetAreaAutoSell={handleSetAreaAutoSell}
         onSetAreaSeederId={handleSetAreaSeederId}
         onBuyFactoryUpgrade={handleBuyFactoryUpgrade}
         onToggleFactoryUpgrade={() => {}}
         t={t}
      />

      <QuestBoard 
        isOpen={gameState.isQuestBoardOpen}
        onClose={() => setGameState(p => ({ ...p, isQuestBoardOpen: false }))}
        quests={gameState.quests}
        onClaimReward={handleClaimQuestReward}
        t={t}
        language={gameState.language}
      />
    </div>
  );
};

export default App;