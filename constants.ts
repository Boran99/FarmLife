
import { Crop, SeasonType, WeatherType, Recipe } from './types';
import { CloudRain, Sun, Snowflake, Flower2, Leaf, CloudLightning, ThermometerSun, Activity } from 'lucide-react';

export const SEASONS: SeasonType[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

export const WEATHER_CHANCE: Record<SeasonType, Partial<Record<WeatherType, number>>> = {
  Spring: { Sunny: 0.5, Rainy: 0.4, Storm: 0.05, Drought: 0.0, Snowy: 0.0, Earthquake: 0.02 },
  Summer: { Sunny: 0.4, Rainy: 0.1, Storm: 0.2, Drought: 0.25, Snowy: 0.0, Earthquake: 0.02 },
  Autumn: { Sunny: 0.5, Rainy: 0.3, Storm: 0.1, Drought: 0.05, Snowy: 0.0, Earthquake: 0.02 },
  Winter: { Sunny: 0.2, Rainy: 0.0, Storm: 0.0, Drought: 0.0, Snowy: 0.75, Earthquake: 0.02 },
};

export const GOLDEN_APPLE_ID = 999;
export const GOLDEN_APPLE_FRUIT_ID = 1000;

export const PRODUCTS: Crop[] = [
    { id: 2001, name: 'Flour', emoji: '🥡', iconKey: 'Flour', category: 'PRODUCT', buyPrice: 0, sellPrice: 250, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Milled wheat flour.', color: 'text-stone-200' },
    { id: 2002, name: 'Sunflower Oil', emoji: '🥃', iconKey: 'Sunflower Oil', category: 'PRODUCT', buyPrice: 0, sellPrice: 1200, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Refined cooking oil.', color: 'text-yellow-500' },
    { id: 2003, name: 'Tofu', emoji: '🧊', iconKey: 'Tofu', category: 'PRODUCT', buyPrice: 0, sellPrice: 1300, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Silky bean curd.', color: 'text-stone-100' },
    { id: 2004, name: 'Aged Rum', emoji: '🍹', iconKey: 'Aged Rum', category: 'PRODUCT', buyPrice: 0, sellPrice: 4000, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Fermented sugar cane spirit.', color: 'text-amber-700' },
    { id: 2005, name: 'Fabric Bolt', emoji: '🧵', iconKey: 'Fabric Bolt', category: 'PRODUCT', buyPrice: 0, sellPrice: 2500, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Woven cotton fabric.', color: 'text-blue-200' },
    { id: 2006, name: 'Roast Coffee', emoji: '☕', iconKey: 'Roast Coffee', category: 'PRODUCT', buyPrice: 0, sellPrice: 6000, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Dark roast bag.', color: 'text-stone-900' },
    { id: 2007, name: 'Fine Wine', emoji: '🍷', iconKey: 'Fine Wine', category: 'PRODUCT', buyPrice: 0, sellPrice: 8000, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Aged vintage.', color: 'text-purple-800' },
];

// Updated Recipes with Real-Time Seconds
export const RECIPES: Recipe[] = [
    { id: 1, name: "Mill Flour", inputItemId: 1102, inputCount: 5, outputItemId: 2001, outputCount: 1, realTimeSeconds: 10, description: "Turn 5 Wheat into 1 Flour." },
    { id: 2, name: "Press Oil", inputItemId: 1110, inputCount: 5, outputItemId: 2002, outputCount: 1, realTimeSeconds: 15, description: "Turn 5 Sunflowers into 1 Oil." },
    { id: 3, name: "Make Tofu", inputItemId: 1109, inputCount: 5, outputItemId: 2003, outputCount: 1, realTimeSeconds: 20, description: "Turn 5 Soybeans into 1 Tofu." },
    { id: 4, name: "Weave Cloth", inputItemId: 1112, inputCount: 5, outputItemId: 2005, outputCount: 1, realTimeSeconds: 45, description: "Turn 5 Cotton into 1 Fabric." },
    { id: 5, name: "Roast Beans", inputItemId: 1113, inputCount: 10, outputItemId: 2006, outputCount: 1, realTimeSeconds: 30, description: "Roast 10 Coffee Beans." },
    { id: 6, name: "Distill Rum", inputItemId: 1111, inputCount: 10, outputItemId: 2004, outputCount: 1, realTimeSeconds: 60, description: "Age 10 Sugar Cane into Rum." },
    { id: 7, name: "Ferment Wine", inputItemId: 1114, inputCount: 10, outputItemId: 2007, outputCount: 1, realTimeSeconds: 90, description: "Age 10 Grapes into Wine." },
];

export const CROPS: Crop[] = [
  // --- SEEDS ---
  {
    id: 104,
    name: 'Spinach Seed',
    emoji: '🥬',
    iconKey: 'Spinach Seed',
    category: 'SEED',
    buyPrice: 20,
    sellPrice: 0,
    harvestYieldId: 1104,
    suitableSeasons: ['Spring', 'Autumn'],
    duration: 1,
    isColdResistant: true,
    isHeatSensitive: true,
    description: 'Fast growth. Harvest in 1 Month.',
    color: 'text-green-600',
    requiredAreaId: 0
  },
  {
    id: 107,
    name: 'Potato Seed',
    emoji: '🥔',
    iconKey: 'Potato Seed',
    category: 'SEED',
    buyPrice: 15,
    sellPrice: 0,
    harvestYieldId: 1107,
    suitableSeasons: ['Spring', 'Autumn'],
    duration: 3,
    isColdResistant: true,
    description: 'Reliable root vegetable. Needs 3 months.',
    color: 'text-amber-700',
    requiredAreaId: 0
  },
  {
    id: 101,
    name: 'Corn Seed',
    emoji: '🌽',
    iconKey: 'Corn Seed',
    category: 'SEED',
    buyPrice: 30,
    sellPrice: 0,
    harvestYieldId: 1101,
    suitableSeasons: ['Spring', 'Summer'],
    duration: 4,
    isColdResistant: false,
    description: 'Tall stalks. Needs 4 months.',
    color: 'text-yellow-500',
    requiredAreaId: 0
  },
  {
    id: 109,
    name: 'Soybean Seed',
    emoji: '🌿',
    iconKey: 'Soybean Seed',
    category: 'SEED',
    buyPrice: 80,
    sellPrice: 0,
    harvestYieldId: 1109,
    suitableSeasons: ['Summer'],
    duration: 3,
    isColdResistant: false,
    description: 'Factory Input. Used for Tofu.',
    color: 'text-green-700',
    requiredAreaId: 1
  },
  {
    id: 110,
    name: 'Sunflower Seed',
    emoji: '🌻',
    iconKey: 'Sunflower Seed',
    category: 'SEED',
    buyPrice: 70,
    sellPrice: 0,
    harvestYieldId: 1110,
    suitableSeasons: ['Summer'],
    duration: 3,
    isColdResistant: false,
    description: 'Tall beauty. Seeds used for Oil.',
    color: 'text-yellow-600',
    requiredAreaId: 1
  },
  {
    id: 111,
    name: 'Sugar Cane Seed',
    emoji: '🎋',
    iconKey: 'Sugar Cane Seed',
    category: 'SEED',
    buyPrice: 90,
    sellPrice: 0,
    harvestYieldId: 1111,
    suitableSeasons: ['Summer', 'Autumn'],
    duration: 4,
    isColdResistant: false,
    description: 'Sweet stalks. Factory input for Rum.',
    color: 'text-emerald-400',
    requiredAreaId: 1
  },
  {
    id: 105,
    name: 'Strawberry Seed',
    emoji: '🍓',
    iconKey: 'Strawberry Seed',
    category: 'SEED',
    buyPrice: 60,
    sellPrice: 0,
    harvestYieldId: 1105,
    suitableSeasons: ['Spring'],
    duration: 3,
    isColdResistant: false,
    isHeatSensitive: true,
    description: 'Sweet berries. Needs 3 months.',
    color: 'text-red-600',
    requiredAreaId: 0
  },
  {
    id: 112,
    name: 'Cotton Seed',
    emoji: '☁️',
    iconKey: 'Cotton Seed',
    category: 'SEED',
    buyPrice: 150,
    sellPrice: 0,
    harvestYieldId: 1112,
    suitableSeasons: ['Summer', 'Autumn'],
    duration: 4,
    isColdResistant: false,
    description: 'Textile Gold. Used for Fabric.',
    color: 'text-slate-200',
    requiredAreaId: 2
  },
  {
    id: 113,
    name: 'Coffee Bean Seed',
    emoji: '☕',
    iconKey: 'Coffee Bean Seed',
    category: 'SEED',
    buyPrice: 200,
    sellPrice: 0,
    harvestYieldId: 1113,
    suitableSeasons: ['Spring', 'Summer'],
    duration: 5,
    isColdResistant: false,
    description: 'High value. Needs warm climate.',
    color: 'text-stone-800',
    requiredAreaId: 2
  },
  {
    id: 114,
    name: 'Grape Vine',
    emoji: '🍇',
    iconKey: 'Grape Vine',
    category: 'SEED',
    buyPrice: 180,
    sellPrice: 0,
    harvestYieldId: 1114,
    suitableSeasons: ['Autumn'],
    duration: 4,
    isColdResistant: false,
    description: 'Luxury fruit. Used for Wine.',
    color: 'text-purple-600',
    requiredAreaId: 2
  },
  {
    id: 106,
    name: 'Tomato Seed',
    emoji: '🍅',
    iconKey: 'Tomato Seed',
    category: 'SEED',
    buyPrice: 35,
    sellPrice: 0,
    harvestYieldId: 1106,
    suitableSeasons: ['Summer'],
    duration: 3,
    isColdResistant: false,
    description: 'Summer lover. Needs 3 months.',
    color: 'text-red-500',
    requiredAreaId: 0
  },
  {
    id: 103,
    name: 'Watermelon Seed',
    emoji: '🍉',
    iconKey: 'Watermelon Seed',
    category: 'SEED',
    buyPrice: 50,
    sellPrice: 0,
    harvestYieldId: 1103,
    suitableSeasons: ['Summer'],
    duration: 4,
    isColdResistant: false,
    description: 'Giant fruit. Needs 4 months.',
    color: 'text-red-500',
    requiredAreaId: 0
  },
  {
    id: 108,
    name: 'Pumpkin Seed',
    emoji: '🎃',
    iconKey: 'Pumpkin Seed',
    category: 'SEED',
    buyPrice: 55,
    sellPrice: 0,
    harvestYieldId: 1108,
    suitableSeasons: ['Autumn'],
    duration: 4,
    isColdResistant: false,
    description: 'Autumn harvest. Needs 4 months.',
    color: 'text-orange-600',
    requiredAreaId: 0
  },
  {
    id: 102,
    name: 'Winter Wheat Seed',
    emoji: '🌾',
    iconKey: 'Winter Wheat Seed',
    category: 'SEED',
    buyPrice: 40,
    sellPrice: 0,
    harvestYieldId: 1102,
    suitableSeasons: ['Autumn'],
    duration: 5,
    isColdResistant: true,
    isHeatSensitive: true,
    description: 'Long growth. Needs 5 months.',
    color: 'text-amber-400',
    requiredAreaId: 0
  },
  {
    id: GOLDEN_APPLE_ID,
    name: 'Golden Apple Seed',
    emoji: '🍎',
    iconKey: 'Golden Apple Seed',
    category: 'SEED',
    buyPrice: 10000,
    sellPrice: 0,
    harvestYieldId: GOLDEN_APPLE_FRUIT_ID,
    suitableSeasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
    duration: 3,
    isColdResistant: true,
    description: 'Plant to grow Golden Apples.',
    color: 'text-yellow-400',
    emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150',
    requiredAreaId: 3
  },

  // --- PRODUCE ---
  { id: 1104, name: 'Spinach', emoji: '🥬', iconKey: 'Spinach', category: 'PRODUCE', buyPrice: 0, sellPrice: 45, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Fresh spinach leaves.', color: 'text-green-600' },
  { id: 1105, name: 'Strawberry', emoji: '🍓', iconKey: 'Strawberry', category: 'PRODUCE', buyPrice: 0, sellPrice: 160, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Sweet, ripe strawberries.', color: 'text-red-600' },
  { id: 1101, name: 'Corn', emoji: '🌽', iconKey: 'Corn', category: 'PRODUCE', buyPrice: 0, sellPrice: 110, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'A fresh cob of corn.', color: 'text-yellow-500' },
  { id: 1106, name: 'Tomato', emoji: '🍅', iconKey: 'Tomato', category: 'PRODUCE', buyPrice: 0, sellPrice: 100, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Juicy red tomato.', color: 'text-red-500' },
  { id: 1103, name: 'Watermelon', emoji: '🍉', iconKey: 'Watermelon', category: 'PRODUCE', buyPrice: 0, sellPrice: 180, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Heavy and sweet watermelon.', color: 'text-red-500' },
  { id: 1107, name: 'Potato', emoji: '🥔', iconKey: 'Potato', category: 'PRODUCE', buyPrice: 0, sellPrice: 60, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Starchy potato.', color: 'text-amber-700' },
  { id: 1108, name: 'Pumpkin', emoji: '🎃', iconKey: 'Pumpkin', category: 'PRODUCE', buyPrice: 0, sellPrice: 160, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Perfect for carving or pie.', color: 'text-orange-600' },
  { id: 1102, name: 'Wheat', emoji: '🌾', iconKey: 'Wheat', category: 'PRODUCE', buyPrice: 0, sellPrice: 150, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Golden grains.', color: 'text-amber-400' },
  
  { id: 1109, name: 'Soybeans', emoji: '🌿', iconKey: 'Soybeans', category: 'PRODUCE', buyPrice: 0, sellPrice: 220, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Raw soybeans.', color: 'text-green-700' },
  { id: 1110, name: 'Sunflowers', emoji: '🌻', iconKey: 'Sunflowers', category: 'PRODUCE', buyPrice: 0, sellPrice: 200, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Full of seeds.', color: 'text-yellow-600' },
  { id: 1111, name: 'Sugar Cane', emoji: '🎋', iconKey: 'Sugar Cane', category: 'PRODUCE', buyPrice: 0, sellPrice: 250, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Sweet raw cane.', color: 'text-emerald-400' },
  { id: 1112, name: 'Raw Cotton', emoji: '☁️', iconKey: 'Raw Cotton', category: 'PRODUCE', buyPrice: 0, sellPrice: 400, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Fluffy cotton balls.', color: 'text-slate-200' },
  { id: 1113, name: 'Coffee Beans', emoji: '☕', iconKey: 'Coffee Beans', category: 'PRODUCE', buyPrice: 0, sellPrice: 550, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Aromatic raw beans.', color: 'text-stone-800' },
  { id: 1114, name: 'Grapes', emoji: '🍇', iconKey: 'Grapes', category: 'PRODUCE', buyPrice: 0, sellPrice: 480, suitableSeasons: [], duration: 0, isColdResistant: false, description: 'Bunches of grapes.', color: 'text-purple-600' },

  {
    id: GOLDEN_APPLE_FRUIT_ID,
    name: 'Golden Apple',
    emoji: '🍎',
    iconKey: 'Golden Apple',
    category: 'SPECIAL',
    buyPrice: 0,
    sellPrice: 0,
    suitableSeasons: [],
    duration: 0,
    isColdResistant: true,
    description: 'Mystical fruit. Currency for options.',
    color: 'text-yellow-400',
    emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150',
    requiredAreaId: 3
  },

  ...PRODUCTS
];

export const INITIAL_MONEY = 200;
export const GRID_SIZE = 48;
export const TILES_PER_AREA = 12;

export const AREA_CONFIG = [
    { id: 0, cost: 0, name: "Main Garden" },
    { id: 1, cost: 600, name: "East Field" },
    { id: 2, cost: 1500, name: "South Valley" },
    { id: 3, cost: 100000, name: "Golden Orchard" },
];

export const LAND_COST = 100;
export const WATER_COST = 5;
export const WATER_AMOUNT = 50;
export const MAX_MOISTURE = 100;
export const EVAPORATION_RATE = 30;

// --- AUTOMATION COSTS ---
export const AUTOMATION_COSTS = {
    IRRIGATION: 5000,
    DRONE: 15000,
    SEEDER: 30000,
    HOPPER: 10000, // Per factory slot
    CONVEYOR: 50000 // Global
};
