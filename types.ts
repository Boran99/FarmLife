
export type SeasonType = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type WeatherType = 'Sunny' | 'Rainy' | 'Drought' | 'Storm' | 'Snowy' | 'Earthquake';

export enum ToolType {
  NONE = 'NONE',
  SEED = 'SEED',
  WATER = 'WATER',
  SELL = 'SELL', // Renamed from HARVEST
  SHOVEL = 'SHOVEL',
}

export interface Crop {
  id: number;
  name: string;
  emoji: string;
  buyPrice: number;
  sellPrice: number;
  harvestYieldId?: number; // ID of the item obtained when harvesting
  suitableSeasons: SeasonType[];
  duration: number; // months to mature
  isColdResistant: boolean;
  isHeatSensitive?: boolean; // New: Dies in Summer
  description: string;
  color: string;
  emojiClass?: string; // Custom CSS class for filters (e.g. hue-rotate)
  requiredAreaId?: number; // New: Unlocks when this land area is bought
}

export type TileState = 'empty' | 'seeded' | 'growing' | 'mature' | 'dead' | 'damaged';

export interface Tile {
  id: number;
  state: TileState;
  isLocked: boolean;
  cropId: number | null;
  growthProgress: number;
  isWatered: boolean; // Legacy boolean, can be derived from moisture > 0
  moisture: number; // 0 to 100
  recoveryTime?: number; // Months until land is repaired (Earthquake)
  note?: string;
  shelfLife?: number; // Months a mature crop has been sitting (For Golden Apples)
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
  strikePrice: number; // The locked price
  premium: number; // The cost paid (in Apples now, but value tracked here for reference if needed)
  contractSize: number; // How many apples this covers (e.g. 10)
  expiryTurn: number; // The turn index it expires (valid only for this turn)
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

export interface GameState {
  turn: number; // Total months passed
  currentMonth: number; // 1-12
  season: SeasonType;
  weather: WeatherType;
  money: number;
  selectedTool: ToolType;
  selectedSeedId: number | null;
  grid: Tile[];
  inventory: Record<number, number>; // itemId -> quantity
  unlockedAreas: number[]; // Indices of unlocked grid areas
  areaNames: Record<number, string>; // Custom names for areas
  
  // Stock Market
  goldenApplePrice: number;
  marketHistory: MarketCandle[];
  options: FinancialOption[];
  optionHistory: OptionHistoryRecord[];

  // UI States
  isAlmanacOpen: boolean;
  isShopOpen: boolean;
  isInventoryOpen: boolean;
  isStockMarketOpen: boolean;
  
  messages: string[];
}
