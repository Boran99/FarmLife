
export type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type WeatherType = 'Sunny' | 'Rainy' | 'Drought' | 'Storm' | 'Snowy' | 'Earthquake';

export enum ToolType {
  NONE = 'NONE',
  SEED = 'SEED',
  WATER = 'WATER',
  SELL = 'SELL',
  SHOVEL = 'SHOVEL',
}

export type ItemCategory = 'SEED' | 'PRODUCE' | 'PRODUCT' | 'SPECIAL';

export type Language = 'EN' | 'ZH';

export interface Crop {
  id: number;
  name: string;
  emoji: string; 
  iconKey: string; 
  category: ItemCategory;
  buyPrice: number;
  sellPrice: number;
  harvestYieldId?: number;
  suitableSeasons: SeasonType[];
  duration: number; 
  isColdResistant: boolean;
  isHeatSensitive?: boolean;
  description: string;
  color: string;
  emojiClass?: string;
  requiredAreaId?: number;
}

export interface Recipe {
    id: number;
    name: string;
    inputItemId: number;
    inputCount: number;
    outputItemId: number;
    outputCount: number;
    realTimeSeconds: number; 
    description: string;
}

export interface ProcessingJob {
    id: string;
    recipeId: number;
    slotIndex: number;
    startTime: number; 
    endTime: number; 
    isComplete: boolean;
}

export type TileState = 'empty' | 'seeded' | 'growing' | 'mature' | 'dead' | 'damaged';

export interface Tile {
  id: number;
  state: TileState;
  isLocked: boolean;
  cropId: number | null;
  growthProgress: number;
  isWatered: boolean;
  moisture: number; 
  recoveryTime?: number; 
  note?: string;
  shelfLife?: number;
}

export interface MarketCandle {
  open: number;
  close: number;
  high: number;
  low: number;
}

export type OptionType = 'CALL' | 'PUT';

export interface FinancialOption {
  id: string;
  type: OptionType;
  strikePrice: number;
  premium: number;
  contractSize: number;
  expiryTurn: number;
}

export interface OptionHistoryRecord {
    id: string;
    turn: number;
    type: OptionType;
    strikePrice: number;
    marketPriceAtExercise: number;
    profit: number;
}

export const GOLDEN_APPLE_FRUIT_ID = 1000;

export type ViewState = 'FARM' | 'FACTORY';

// --- AUTOMATION TYPES ---
export type AreaUpgradeType = 'IRRIGATION' | 'DRONE' | 'SEEDER';

export interface AreaAutomationConfig {
    areaId: number;
    hasIrrigation: boolean;
    irrigationEnabled: boolean;
    hasDrone: boolean;
    droneEnabled: boolean;
    autoSell: boolean; 
    hasSeeder: boolean;
    seederEnabled: boolean;
    seederSeedId: number | null; 
}

// --- QUEST SYSTEM TYPES ---
export type QuestTaskType = 'PLANT' | 'WATER' | 'HARVEST' | 'SELL' | 'WAIT_SEASON' | 'UNLOCK_AREA' | 'FACTORY_PRODUCE' | 'BUY_OPTION' | 'HAVE_MONEY' | 'INSTALL_UPGRADE';

export interface QuestTask {
    description: string;
    type: QuestTaskType;
    targetId?: number | string; 
    count: number;
    current: number;
    isComplete: boolean;
}

export type QuestRewardType = 'MONEY' | 'UNLOCK_FEATURE';
export type QuestRewardFeature = 'FACTORY' | 'FARM_OS';

export interface TutorialStep {
    textEN: string;
    textZH: string;
    iconKey?: string; // Optional icon to show
}

export interface Quest {
    id: number;
    title: string;
    titleZH: string;
    description: string;
    descriptionZH: string;
    tasks: QuestTask[];
    rewardMoney: number;
    rewardType: QuestRewardType;
    rewardFeature?: QuestRewardFeature;
    status: 'LOCKED' | 'ACTIVE' | 'COMPLETED' | 'CLAIMED';
}

export interface GameState {
  language: Language;
  turn: number;
  currentMonth: number;
  season: SeasonType;
  weather: WeatherType;
  money: number;
  selectedTool: ToolType;
  selectedSeedId: number | null;
  grid: Tile[];
  inventory: Record<number, number>;
  unlockedAreas: number[];
  areaNames: Record<number, string>;
  
  // Feature Flags
  isFactoryUnlocked: boolean;
  isFarmOSUnlocked: boolean;

  // Automation State
  areaAutomation: Record<number, AreaAutomationConfig>;
  factoryHoppers: boolean[]; 
  hasConveyor: boolean;

  // Factory State
  view: ViewState; 
  factorySlots: number;
  activeJobs: ProcessingJob[];

  // Stock Market
  goldenApplePrice: number;
  marketHistory: MarketCandle[];
  options: FinancialOption[];
  optionHistory: OptionHistoryRecord[];

  // Quest State
  quests: Quest[];

  // UI States (Modals)
  isAlmanacOpen: boolean;
  isShopOpen: boolean;
  isInventoryOpen: boolean;
  isStockMarketOpen: boolean;
  isFarmOSOpen: boolean; 
  isQuestBoardOpen: boolean;
  
  messages: string[];
}
