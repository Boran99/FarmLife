
import { Crop, SeasonType, WeatherType } from './types';
import { CloudRain, Sun, Snowflake, Flower2, Leaf, CloudLightning, ThermometerSun, Activity } from 'lucide-react';

export const SEASONS: SeasonType[] = ['Spring', 'Summer', 'Autumn', 'Winter'];

export const SEASON_CONFIG = {
  Spring: { color: 'bg-green-100 text-green-800', border: 'border-green-500', icon: Flower2, label: 'Spring' },
  Summer: { color: 'bg-orange-100 text-orange-800', border: 'border-orange-500', icon: Sun, label: 'Summer' },
  Autumn: { color: 'bg-amber-100 text-amber-800', border: 'border-amber-700', icon: Leaf, label: 'Autumn' },
  Winter: { color: 'bg-blue-50 text-blue-800', border: 'border-blue-400', icon: Snowflake, label: 'Winter' },
};

export const WEATHER_CONFIG: Record<WeatherType, { label: string, icon: any, color: string, effect: string }> = {
  Sunny: { label: 'Sunny', icon: Sun, color: 'text-orange-500', effect: 'Moisture -30%' },
  Rainy: { label: 'Rainy', icon: CloudRain, color: 'text-blue-500', effect: 'Auto-Water (+60%)' },
  Storm: { label: 'Storm', icon: CloudLightning, color: 'text-indigo-600', effect: 'Floods Soil (+100%)' },
  Drought: { label: 'Drought', icon: ThermometerSun, color: 'text-red-600', effect: 'Rapid Dry (-60%)' },
  Snowy: { label: 'Snowy', icon: Snowflake, color: 'text-sky-400', effect: 'Soil Frozen' },
  Earthquake: { label: 'Quake', icon: Activity, color: 'text-stone-700', effect: 'Land Damage' },
};

// Probability per month in that season (Earthquake reduced to 2%)
export const WEATHER_CHANCE: Record<SeasonType, Partial<Record<WeatherType, number>>> = {
  Spring: { Sunny: 0.5, Rainy: 0.4, Storm: 0.05, Drought: 0.0, Snowy: 0.0, Earthquake: 0.02 },
  Summer: { Sunny: 0.4, Rainy: 0.1, Storm: 0.2, Drought: 0.25, Snowy: 0.0, Earthquake: 0.02 },
  Autumn: { Sunny: 0.5, Rainy: 0.3, Storm: 0.1, Drought: 0.05, Snowy: 0.0, Earthquake: 0.02 },
  Winter: { Sunny: 0.2, Rainy: 0.0, Storm: 0.0, Drought: 0.0, Snowy: 0.75, Earthquake: 0.02 },
};

export const GOLDEN_APPLE_ID = 999;
export const GOLDEN_APPLE_FRUIT_ID = 1000;

export const CROPS: Crop[] = [
  // --- SEEDS ---
  {
    id: 104,
    name: 'Spinach Seed',
    emoji: '🥬',
    buyPrice: 20,
    sellPrice: 0,
    harvestYieldId: 1104,
    suitableSeasons: ['Spring', 'Autumn'],
    duration: 1, // Fast crop
    isColdResistant: true,
    isHeatSensitive: true,
    description: 'Fast growth. Harvest in 1 Month.',
    color: 'text-green-600'
  },
  {
    id: 105,
    name: 'Strawberry Seed',
    emoji: '🍓',
    buyPrice: 60,
    sellPrice: 0,
    harvestYieldId: 1105,
    suitableSeasons: ['Spring'],
    duration: 3, // Realism: ~3 months from plant to full harvest
    isColdResistant: false,
    isHeatSensitive: true,
    description: 'Sweet berries. Needs 3 months.',
    color: 'text-red-600'
  },
  {
    id: 101,
    name: 'Corn Seed',
    emoji: '🌽',
    buyPrice: 30,
    sellPrice: 0,
    harvestYieldId: 1101,
    suitableSeasons: ['Spring', 'Summer'],
    duration: 4, // Realism: ~100 days
    isColdResistant: false,
    description: 'Tall stalks. Needs 4 months.',
    color: 'text-yellow-500'
  },
  {
    id: 106,
    name: 'Tomato Seed',
    emoji: '🍅',
    buyPrice: 35,
    sellPrice: 0,
    harvestYieldId: 1106,
    suitableSeasons: ['Summer'],
    duration: 3, // Realism: ~3 months
    isColdResistant: false,
    description: 'Summer lover. Needs 3 months.',
    color: 'text-red-500'
  },
  {
    id: 103,
    name: 'Watermelon Seed',
    emoji: '🍉',
    buyPrice: 50,
    sellPrice: 0,
    harvestYieldId: 1103,
    suitableSeasons: ['Summer'],
    duration: 4, // Realism: ~90-100 days
    isColdResistant: false,
    description: 'Giant fruit. Needs 4 months.',
    color: 'text-red-500'
  },
  {
    id: 107,
    name: 'Potato Seed',
    emoji: '🥔',
    buyPrice: 15,
    sellPrice: 0,
    harvestYieldId: 1107,
    suitableSeasons: ['Spring', 'Autumn'],
    duration: 3, // Realism: ~3-4 months
    isColdResistant: true,
    description: 'Root vegetable. Needs 3 months.',
    color: 'text-amber-700'
  },
  {
    id: 108,
    name: 'Pumpkin Seed',
    emoji: '🎃',
    buyPrice: 55,
    sellPrice: 0,
    harvestYieldId: 1108,
    suitableSeasons: ['Autumn'],
    duration: 4, // Realism: ~100-120 days
    isColdResistant: false,
    description: 'Autumn harvest. Needs 4 months.',
    color: 'text-orange-600'
  },
  {
    id: 102,
    name: 'Winter Wheat Seed',
    emoji: '🌾',
    buyPrice: 40,
    sellPrice: 0,
    harvestYieldId: 1102,
    suitableSeasons: ['Autumn'],
    duration: 5, // Realism: Overwinters (Autumn -> Summer)
    isColdResistant: true,
    isHeatSensitive: true,
    description: 'Long growth. Needs 5 months.',
    color: 'text-amber-400'
  },
  {
    id: GOLDEN_APPLE_ID,
    name: 'Golden Apple Seed',
    emoji: '🍎',
    buyPrice: 10000,
    sellPrice: 0, // Seed has no sell price, Fruit does
    harvestYieldId: GOLDEN_APPLE_FRUIT_ID,
    suitableSeasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    duration: 3, // 1 Quarter
    isColdResistant: true,
    description: 'Plant to grow Golden Apples.',
    color: 'text-yellow-400',
    emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150'
  },

  // --- PRODUCE (Not Buyable) ---
  {
    id: 1104,
    name: 'Spinach',
    emoji: '🥬',
    buyPrice: 0,
    sellPrice: 45,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: true,
    description: 'Fresh spinach leaves.',
    color: 'text-green-600'
  },
  {
    id: 1105,
    name: 'Strawberry',
    emoji: '🍓',
    buyPrice: 0,
    sellPrice: 160,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: false,
    description: 'Sweet, ripe strawberries.',
    color: 'text-red-600'
  },
  {
    id: 1101,
    name: 'Corn',
    emoji: '🌽',
    buyPrice: 0,
    sellPrice: 110,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: false,
    description: 'A fresh cob of corn.',
    color: 'text-yellow-500'
  },
  {
    id: 1106,
    name: 'Tomato',
    emoji: '🍅',
    buyPrice: 0,
    sellPrice: 100,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: false,
    description: 'Juicy red tomato.',
    color: 'text-red-500'
  },
  {
    id: 1103,
    name: 'Watermelon',
    emoji: '🍉',
    buyPrice: 0,
    sellPrice: 180,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: false,
    description: 'Heavy and sweet watermelon.',
    color: 'text-red-500'
  },
  {
    id: 1107,
    name: 'Potato',
    emoji: '🥔',
    buyPrice: 0,
    sellPrice: 60,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: true,
    description: 'Starchy potato.',
    color: 'text-amber-700'
  },
  {
    id: 1108,
    name: 'Pumpkin',
    emoji: '🎃',
    buyPrice: 0,
    sellPrice: 160,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: false,
    description: 'Perfect for carving or pie.',
    color: 'text-orange-600'
  },
  {
    id: 1102,
    name: 'Wheat',
    emoji: '🌾',
    buyPrice: 0,
    sellPrice: 150,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: true,
    description: 'Golden grains.',
    color: 'text-amber-400'
  },
  {
    id: GOLDEN_APPLE_FRUIT_ID,
    name: 'Golden Apple',
    emoji: '🍎',
    buyPrice: 0,
    sellPrice: 0, // Dynamic
    suitableSeasons: [],
    duration: 0,
    isColdResistant: true,
    description: 'Mystical fruit. Currency for options.',
    color: 'text-yellow-400',
    emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150'
  }
];

export const INITIAL_MONEY = 200;
export const GRID_SIZE = 48; // 4 Areas of 12
export const TILES_PER_AREA = 12;

export const AREA_CONFIG = [
    { id: 0, cost: 0, name: "Main Garden" },
    { id: 1, cost: 600, name: "East Field" },
    { id: 2, cost: 1500, name: "South Valley" },
    { id: 3, cost: 100000, name: "Golden Orchard" },
];

export const LAND_COST = 100; // Per individual tile if locked
export const WATER_COST = 5; // Expensive water!
export const WATER_AMOUNT = 50; // Adds 50% moisture
export const MAX_MOISTURE = 100;
export const EVAPORATION_RATE = 30; // Base evaporation
