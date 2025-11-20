
export type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type WeatherType = 'Sunny' | 'Rainy' | 'Drought' | 'Storm' | 'Snowy' | 'Earthquake';

export enum ToolType {
  NONE = 'NONE',
  SEED = 'SEED',
  WATER = 'WATER',
  SELL = 'SELL', // Renamed from HARVEST
  SHOVEL = 'SHOVEL',
}

export type ItemCategory = 'SEED' | 'PRODUCE' | 'PRODUCT' | 'SPECIAL';

export interface Crop {
  id: number;
  name: string;
  emoji: string; // Keep for fallback or particle effects
  iconKey: string; // Key for SVG Icon Map
  category: ItemCategory;
  buyPrice: number;
  sellPrice: number;
  harvestYieldId?: number;
  suitableSeasons: SeasonType[];
  duration: number; // months to mature
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
    realTimeSeconds: number; // Seconds to process in real-time
    description: string;
}

export interface ProcessingJob {
    id: string;
    recipeId: number;
    slotIndex: number; // Which machine slot this job occupies
    startTime: number; // Timestamp
    endTime: number; // Timestamp
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
  moisture: number; // 0 to 100
  recoveryTime?: number; // Months until land is repaired
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
    autoSell: boolean; // If true, Drone sells. If false, Drone harvests to inventory.
    hasSeeder: boolean;
    seederEnabled: boolean;
    seederSeedId: number | null; // Which seed to auto-plant
}

export interface GameState {
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
  
  // Automation State
  areaAutomation: Record<number, AreaAutomationConfig>;
  factoryHoppers: boolean[]; // Index corresponds to factory slot
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

  // UI States (Modals)
  isAlmanacOpen: boolean;
  isShopOpen: boolean;
  isInventoryOpen: boolean;
  isStockMarketOpen: boolean;
  isFarmOSOpen: boolean; // New Control Center
  
  messages: string[];
}
