
import { Crop, SeasonType, WeatherType, Recipe, Quest, TutorialStep, Language } from './types';
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
  { id: 104, name: 'Spinach Seed', emoji: '🥬', iconKey: 'Spinach Seed', category: 'SEED', buyPrice: 20, sellPrice: 0, harvestYieldId: 1104, suitableSeasons: ['Spring', 'Autumn'], duration: 1, isColdResistant: true, isHeatSensitive: true, description: 'Fast growth. Harvest in 1 Month.', color: 'text-green-600', requiredAreaId: 0 },
  { id: 107, name: 'Potato Seed', emoji: '🥔', iconKey: 'Potato Seed', category: 'SEED', buyPrice: 15, sellPrice: 0, harvestYieldId: 1107, suitableSeasons: ['Spring', 'Autumn'], duration: 3, isColdResistant: true, description: 'Reliable root vegetable. Needs 3 months.', color: 'text-amber-700', requiredAreaId: 0 },
  { id: 101, name: 'Corn Seed', emoji: '🌽', iconKey: 'Corn Seed', category: 'SEED', buyPrice: 30, sellPrice: 0, harvestYieldId: 1101, suitableSeasons: ['Spring', 'Summer'], duration: 4, isColdResistant: false, description: 'Tall stalks. Needs 4 months.', color: 'text-yellow-500', requiredAreaId: 0 },
  { id: 109, name: 'Soybean Seed', emoji: '🌿', iconKey: 'Soybean Seed', category: 'SEED', buyPrice: 80, sellPrice: 0, harvestYieldId: 1109, suitableSeasons: ['Summer'], duration: 3, isColdResistant: false, description: 'Factory Input. Used for Tofu.', color: 'text-green-700', requiredAreaId: 1 },
  { id: 110, name: 'Sunflower Seed', emoji: '🌻', iconKey: 'Sunflower Seed', category: 'SEED', buyPrice: 70, sellPrice: 0, harvestYieldId: 1110, suitableSeasons: ['Summer'], duration: 3, isColdResistant: false, description: 'Tall beauty. Seeds used for Oil.', color: 'text-yellow-600', requiredAreaId: 1 },
  { id: 111, name: 'Sugar Cane Seed', emoji: '🎋', iconKey: 'Sugar Cane Seed', category: 'SEED', buyPrice: 90, sellPrice: 0, harvestYieldId: 1111, suitableSeasons: ['Summer', 'Autumn'], duration: 4, isColdResistant: false, description: 'Sweet stalks. Factory input for Rum.', color: 'text-emerald-400', requiredAreaId: 1 },
  { id: 105, name: 'Strawberry Seed', emoji: '🍓', iconKey: 'Strawberry Seed', category: 'SEED', buyPrice: 60, sellPrice: 0, harvestYieldId: 1105, suitableSeasons: ['Spring'], duration: 3, isColdResistant: false, isHeatSensitive: true, description: 'Sweet berries. Needs 3 months.', color: 'text-red-600', requiredAreaId: 0 },
  { id: 112, name: 'Cotton Seed', emoji: '☁️', iconKey: 'Cotton Seed', category: 'SEED', buyPrice: 150, sellPrice: 0, harvestYieldId: 1112, suitableSeasons: ['Summer', 'Autumn'], duration: 4, isColdResistant: false, description: 'Textile Gold. Used for Fabric.', color: 'text-slate-200', requiredAreaId: 2 },
  { id: 113, name: 'Coffee Bean Seed', emoji: '☕', iconKey: 'Coffee Bean Seed', category: 'SEED', buyPrice: 200, sellPrice: 0, harvestYieldId: 1113, suitableSeasons: ['Spring', 'Summer'], duration: 5, isColdResistant: false, description: 'High value. Needs warm climate.', color: 'text-stone-800', requiredAreaId: 2 },
  { id: 114, name: 'Grape Vine', emoji: '🍇', iconKey: 'Grape Vine', category: 'SEED', buyPrice: 180, sellPrice: 0, harvestYieldId: 1114, suitableSeasons: ['Autumn'], duration: 4, isColdResistant: false, description: 'Luxury fruit. Used for Wine.', color: 'text-purple-600', requiredAreaId: 2 },
  { id: 106, name: 'Tomato Seed', emoji: '🍅', iconKey: 'Tomato Seed', category: 'SEED', buyPrice: 35, sellPrice: 0, harvestYieldId: 1106, suitableSeasons: ['Summer'], duration: 3, isColdResistant: false, description: 'Summer lover. Needs 3 months.', color: 'text-red-500', requiredAreaId: 0 },
  { id: 103, name: 'Watermelon Seed', emoji: '🍉', iconKey: 'Watermelon Seed', category: 'SEED', buyPrice: 50, sellPrice: 0, harvestYieldId: 1103, suitableSeasons: ['Summer'], duration: 4, isColdResistant: false, description: 'Giant fruit. Needs 4 months.', color: 'text-red-500', requiredAreaId: 0 },
  { id: 108, name: 'Pumpkin Seed', emoji: '🎃', iconKey: 'Pumpkin Seed', category: 'SEED', buyPrice: 55, sellPrice: 0, harvestYieldId: 1108, suitableSeasons: ['Autumn'], duration: 4, isColdResistant: false, description: 'Autumn harvest. Needs 4 months.', color: 'text-orange-600', requiredAreaId: 0 },
  { id: 102, name: 'Winter Wheat Seed', emoji: '🌾', iconKey: 'Winter Wheat Seed', category: 'SEED', buyPrice: 40, sellPrice: 0, harvestYieldId: 1102, suitableSeasons: ['Autumn'], duration: 5, isColdResistant: true, isHeatSensitive: true, description: 'Long growth. Needs 5 months.', color: 'text-amber-400', requiredAreaId: 0 },
  { id: GOLDEN_APPLE_ID, name: 'Golden Apple Seed', emoji: '🍎', iconKey: 'Golden Apple Seed', category: 'SEED', buyPrice: 10000, sellPrice: 0, harvestYieldId: GOLDEN_APPLE_FRUIT_ID, suitableSeasons: ['Spring', 'Summer', 'Autumn', 'Winter'], duration: 3, isColdResistant: true, description: 'Plant to grow Golden Apples.', color: 'text-yellow-400', emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150', requiredAreaId: 3 },

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
  { id: GOLDEN_APPLE_FRUIT_ID, name: 'Golden Apple', emoji: '🍎', iconKey: 'Golden Apple', category: 'SPECIAL', buyPrice: 0, sellPrice: 0, suitableSeasons: [], duration: 0, isColdResistant: true, description: 'Mystical fruit. Currency for options.', color: 'text-yellow-400', emojiClass: 'filter hue-rotate-[60deg] brightness-125 saturate-150', requiredAreaId: 3 },
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

export const AUTOMATION_COSTS = {
    IRRIGATION: 5000,
    DRONE: 15000,
    SEEDER: 30000,
    HOPPER: 10000, 
    CONVEYOR: 50000 
};

// --- LOCALIZATION & TUTORIALS ---

export const TRANSLATIONS: Record<string, { EN: string, ZH: string }> = {
    // Generic
    "CLOSE": { EN: "Close", ZH: "关闭" },
    "BUY": { EN: "Buy", ZH: "购买" },
    "SELL": { EN: "Sell", ZH: "出售" },
    "LOCKED": { EN: "Locked", ZH: "未解锁" },
    "UNLOCK": { EN: "Unlock", ZH: "解锁" },
    "FUNDS": { EN: "Funds", ZH: "资金" },
    "PRICE": { EN: "Price", ZH: "价格" },
    "COST": { EN: "Cost", ZH: "成本" },
    "VALUE": { EN: "Value", ZH: "价值" },
    "OWNED": { EN: "Owned", ZH: "持有" },
    "REWARD": { EN: "Reward", ZH: "奖励" },
    "CLAIM": { EN: "Claim", ZH: "领取" },
    "COMPLETED": { EN: "Completed", ZH: "已完成" },
    "ACTIVE": { EN: "Active", ZH: "进行中" },

    // Header
    "MY_FARM": { EN: "My Farm", ZH: "我的农场" },
    "SHOP": { EN: "Shop", ZH: "商店" },
    "FARM_GUIDE": { EN: "Farm Guide", ZH: "农场指南" },
    "BACKPACK": { EN: "Backpack", ZH: "背包" },
    "YEAR": { EN: "Year", ZH: "年" },
    "REWARD_READY": { EN: "Reward Ready!", ZH: "奖励可领！" },
    "MISSION_COMPLETE": { EN: "Mission Complete", ZH: "任务完成" },
    "CLICK_TO_CLAIM": { EN: "Click to Claim", ZH: "点击领取" },
    "CURRENT_GOAL": { EN: "Current Goal", ZH: "当前目标" },

    // Quest Board
    "QUEST_BOARD": { EN: "Quest Board", ZH: "任务板" },
    "QUEST_SUBTITLE": { EN: "Complete missions to earn rewards", ZH: "完成任务以获取奖励" },
    "SHOW_GUIDE": { EN: "Show Guide", ZH: "显示指南" },
    "HIDE_GUIDE": { EN: "Hide Guide", ZH: "隐藏指南" },
    "UPCOMING": { EN: "Upcoming", ZH: "即将到来" },
    "ALL_DONE": { EN: "All Missions Completed!", ZH: "所有任务已完成！" },
    "MASTER_FARMER": { EN: "You are a master farmer now.", ZH: "您已成为农场大师。" },

    // Shop
    "GENERAL_STORE": { EN: "General Store", ZH: "杂货铺" },
    "BUY_SEEDS": { EN: "Buy Seeds", ZH: "购买种子" },
    "SELL_PRODUCE": { EN: "Sell Produce", ZH: "出售农产品" },
    "NO_SELL": { EN: "Nothing to sell right now.", ZH: "暂时没有什么可卖的。" },
    "SELL_1": { EN: "Sell 1", ZH: "卖 1 个" },
    "SELL_ALL": { EN: "Sell All", ZH: "全卖" },
    "IN_SEASON": { EN: "IN SEASON", ZH: "当季" },
    "UNLOCK_VIA": { EN: "Unlock via Quest", ZH: "通过任务解锁" },

    // Stock Market
    "STALK_MARKET": { EN: "Stalk Market", ZH: "黄金交易所" },
    "GOLDEN_EXCHANGE": { EN: "Golden Apple Exchange", ZH: "金苹果交易中心" },
    "MARKET": { EN: "Market", ZH: "市场" },
    "HISTORY": { EN: "History", ZH: "记录" },
    "SPOT_MARKET": { EN: "Gold Apple Market", ZH: "金苹果市场" },
    "GOLD_APPLE_MARKET": { EN: "Gold Apple Market", ZH: "金苹果市场" },
    "SEED_MARKET": { EN: "Seed Market", ZH: "种子市场" },
    "MY_APPLES": { EN: "My Apples", ZH: "我的苹果" },
    "OPTIONS": { EN: "Options", ZH: "期权" },
    "PUT_OPTION": { EN: "Put Option (Insurance)", ZH: "看跌期权 (保险)" },
    "CALL_OPTION": { EN: "Call Option (Order)", ZH: "看涨期权 (预购)" },
    "OPTION_DESC_PUT": { EN: "Protect against price drops. Sell at this high price later.", ZH: "防止跌价。即使市场崩盘，下个月也能按当前高价卖出。" },
    "OPTION_DESC_CALL": { EN: "Bet on price rises. Buy at this low price later.", ZH: "押注涨价。即使市场暴涨，下个月也能按当前低价买入。" },
    "EXERCISE": { EN: "EXERCISE", ZH: "行权" },
    "WAIT": { EN: "WAIT", ZH: "等待" },
    "PROFIT": { EN: "Profit", ZH: "利润" },
    "NO_CONTRACTS": { EN: "No active contracts.", ZH: "无有效合约。" },

    // Factory
    "TECH_BARN": { EN: "TECH BARN", ZH: "科技工坊" },
    "PRODUCTION_BLUEPRINTS": { EN: "Production Blueprints", ZH: "生产蓝图" },
    "START_JOB": { EN: "Start Job", ZH: "开始生产" },
    "LINES_FULL": { EN: "Lines Full", ZH: "流水线已满" },
    "INSUFFICIENT_INPUT": { EN: "Insufficient Input", ZH: "原料不足" },
    "COLLECT": { EN: "Collect", ZH: "收取" },
    "PROCESSING": { EN: "PROCESSING", ZH: "生产中" },
    "COMPLETE": { EN: "COMPLETE", ZH: "完成" },
    "NEW_LINE": { EN: "Initialize New Line", ZH: "开启新流水线" },

    // FarmOS
    "FARM_OS": { EN: "FarmOS", ZH: "智能农场" },
    "AUTOMATION_CONTROL": { EN: "Centralized Automation Control", ZH: "自动化控制中心" },
    "AREA_MONITOR": { EN: "Area Monitor", ZH: "区域监控" },
    "FACTORY_CONFIG": { EN: "Factory Config", ZH: "工厂配置" },
    "SMART_IRRIGATION": { EN: "Smart Irrigation", ZH: "智能灌溉" },
    "HARVEST_DRONE": { EN: "Harvest Drone", ZH: "收割无人机" },
    "AUTO_SEEDER": { EN: "Auto Seeder", ZH: "自动播种机" },
    "AUTO_SELL": { EN: "AUTO-SELL", ZH: "自动出售" },
    "STORE": { EN: "STORE", ZH: "存入背包" },
    "SWITCH": { EN: "SWITCH", ZH: "切换" },
    "SELECT_SEED": { EN: "[ SELECT SEED ]", ZH: "[ 选择种子 ]" },
    "OUTPUT_CONVEYOR": { EN: "Output Conveyor Belt", ZH: "产物传送带" },
    "INPUT_HOPPER": { EN: "Input Hopper", ZH: "进料漏斗" },
    "INSTALLED": { EN: "INSTALLED", ZH: "已安装" },
    "PURCHASE": { EN: "PURCHASE", ZH: "购买" },
    
    // Tools
    "TOOL_BAG": { EN: "Bag", ZH: "背包" },
    "TOOL_WATER": { EN: "Water", ZH: "浇水" },
    "TOOL_SELL": { EN: "Sell", ZH: "出售" },
    "TOOL_CLEAR": { EN: "Clear", ZH: "铲除" },
    "NEXT_MONTH": { EN: "FINISH", ZH: "下个月" },
};

export const TUTORIAL_CONTENT: Record<number, TutorialStep[]> = {
    1: [
        { textEN: "Click the 'Bag' (Sprout Icon) in the bottom toolbar.", textZH: "点击底部工具栏的“背包”（Sprout图标）。", iconKey: 'Spinach Seed' },
        { textEN: "Select 'Spinach Seed'.", textZH: "选择“菠菜种子”。" },
        { textEN: "Click on an empty plot in the garden to plant.", textZH: "点击花园中的空地进行播种。" },
        { textEN: "Select the 'Water' tool (Blue Drop) and click the planted tile.", textZH: "选择“浇水”工具（蓝色水滴），然后点击已播种的地块。" },
        { textEN: "Click 'FINISH' to advance time until it grows.", textZH: "点击“下个月”推进时间，直到作物成熟。" },
        { textEN: "When mature, use NO tool (Hand) to harvest to inventory.", textZH: "成熟后，不使用任何工具（手）点击以收获到背包。" }
    ],
    2: [
        { textEN: "Click 'FINISH' multiple times until the Season Badge says 'SUMMER'.", textZH: "多次点击“下个月”，直到季节徽章显示“SUMMER”（夏天）。" },
        { textEN: "Buy Corn Seeds from the Shop if you need them.", textZH: "如果需要，去商店购买玉米种子。" },
        { textEN: "Plant Corn in Summer. It loves heat!", textZH: "在夏天种植玉米。它喜欢炎热！" }
    ],
    3: [
        { textEN: "Earn money by selling crops (Use the 'Sell' tool).", textZH: "通过出售作物赚钱（使用“出售”工具）。" },
        { textEN: "Click the 'Right Arrow' on the garden box to see Area 2.", textZH: "点击花园框上的“右箭头”查看区域 2。" },
        { textEN: "Click the 'Unlock' button on the locked land.", textZH: "点击锁定土地上的“解锁”按钮。" }
    ],
    4: [
        { textEN: "Save up $2,000. Sell high-value crops like Corn or Potatoes.", textZH: "存够 $2,000。出售玉米或土豆等高价值作物。" },
        { textEN: "Once unlocked, the Factory button (Top Right) will light up.", textZH: "解锁后，右上角的工厂按钮将会亮起。" }
    ],
    5: [
        { textEN: "Open the Factory (Top Right).", textZH: "打开工厂（右上角）。" },
        { textEN: "Select 'Sunflower Oil' from the blueprints.", textZH: "从蓝图中选择“葵花籽油”。" },
        { textEN: "Ensure you have 5 Sunflowers in your backpack.", textZH: "确保背包里有 5 朵向日葵。" },
        { textEN: "Click 'Start Job' and wait for it to finish.", textZH: "点击“开始生产”，然后等待完成。" }
    ],
    8: [
        { textEN: "Open FarmOS (Green Button, bottom left).", textZH: "打开 FarmOS（左下角绿色按钮）。" },
        { textEN: "In 'Area Monitor', find an unlocked area.", textZH: "在“区域监控”中，找到一个已解锁的区域。" },
        { textEN: "Click 'BUY' next to Harvest Drone.", textZH: "点击收割无人机旁边的“购买”。" }
    ],
    10: [
        { textEN: "Open Stock Market (Yellow Button).", textZH: "打开黄金交易所（黄色按钮）。" },
        { textEN: "Look at the Options panel on the right.", textZH: "查看右侧的期权面板。" },
        { textEN: "Buy a CALL if you think price will go UP.", textZH: "如果你认为价格会涨，买入看涨期权（CALL）。" },
        { textEN: "Buy a PUT if you think price will go DOWN.", textZH: "如果你认为价格会跌，买入看跌期权（PUT）。" }
    ]
};

export const TUTORIAL_QUESTS: Quest[] = [
    {
        id: 1,
        title: "The New Farmer",
        titleZH: "新手农夫",
        description: "Welcome to Farm Cycles! Let's learn the basics. Spinach is a fast-growing crop perfect for beginners.",
        descriptionZH: "欢迎来到农场循环！让我们学习基础知识。菠菜是一种适合新手的速生作物。",
        status: 'ACTIVE',
        rewardMoney: 100,
        rewardType: 'MONEY',
        tasks: [
            { type: 'PLANT', description: "Plant 3 Spinach Seeds", targetId: 104, count: 3, current: 0, isComplete: false },
            { type: 'WATER', description: "Water the soil 3 times", count: 3, current: 0, isComplete: false },
            { type: 'HARVEST', description: "Harvest 3 Spinach", targetId: 1104, count: 3, current: 0, isComplete: false }
        ]
    },
    {
        id: 2,
        title: "Seasonal Shifts",
        titleZH: "季节更替",
        description: "Crops die if planted in the wrong season. Spinach hates heat! Wait for Summer, then plant Corn, which loves the sun.",
        descriptionZH: "作物在错误的季节会枯死。菠菜讨厌炎热！等待夏天，然后种植喜欢阳光的玉米。",
        status: 'LOCKED',
        rewardMoney: 200,
        rewardType: 'MONEY',
        tasks: [
            { type: 'WAIT_SEASON', description: "Reach Summer (Month 4)", targetId: 'Summer', count: 1, current: 0, isComplete: false },
            { type: 'PLANT', description: "Plant 3 Corn Seeds", targetId: 101, count: 3, current: 0, isComplete: false }
        ]
    },
    {
        id: 3,
        title: "Land Baron",
        titleZH: "土地大亨",
        description: "You're running out of space. Save up money and unlock the East Field to expand your farming empire.",
        descriptionZH: "空间不足了。攒钱解锁东部农田，扩张你的农业帝国。",
        status: 'LOCKED',
        rewardMoney: 500,
        rewardType: 'MONEY',
        tasks: [
            { type: 'UNLOCK_AREA', description: "Unlock East Field (Area 2)", targetId: 1, count: 1, current: 0, isComplete: false }
        ]
    },
    {
        id: 4,
        title: "The Workshop Project",
        titleZH: "工坊计划",
        description: "Selling raw crops is low profit. We need to build a Workshop to process goods. Accumulate funds to build it!",
        descriptionZH: "出售原材料利润太低。我们需要建立一个工坊来加工商品。筹集资金来建造它！",
        status: 'LOCKED',
        rewardMoney: 500,
        rewardType: 'UNLOCK_FEATURE',
        rewardFeature: 'FACTORY',
        tasks: [
            { type: 'HAVE_MONEY', description: "Accumulate $2,000", count: 2000, current: 0, isComplete: false }
        ]
    },
    {
        id: 5,
        title: "First Production",
        titleZH: "第一桶金",
        description: "The Workshop is open! Sunflowers are beautiful, but Sunflower Oil is liquid gold. Produce your first bottle.",
        descriptionZH: "工坊已开启！向日葵很美，但葵花籽油是液体黄金。生产你的第一瓶油。",
        status: 'LOCKED',
        rewardMoney: 800,
        rewardType: 'MONEY',
        tasks: [
            { type: 'PLANT', description: "Plant 5 Sunflowers", targetId: 110, count: 5, current: 0, isComplete: false },
            { type: 'FACTORY_PRODUCE', description: "Produce 1 Sunflower Oil", targetId: 2002, count: 1, current: 0, isComplete: false }
        ]
    },
    {
        id: 6,
        title: "Textile Tycoon",
        titleZH: "纺织大亨",
        description: "The South Valley is perfect for Cotton. Unlock it and start a textile line to produce Fabric Bolts.",
        descriptionZH: "南部山谷非常适合种植棉花。解锁它并启动纺织生产线，生产布料。",
        status: 'LOCKED',
        rewardMoney: 1500,
        rewardType: 'MONEY',
        tasks: [
            { type: 'UNLOCK_AREA', description: "Unlock South Valley (Area 3)", targetId: 2, count: 1, current: 0, isComplete: false },
            { type: 'FACTORY_PRODUCE', description: "Produce 1 Fabric Bolt", targetId: 2005, count: 1, current: 0, isComplete: false }
        ]
    },
    {
        id: 7,
        title: "Tech Breakthrough",
        titleZH: "科技飞跃",
        description: "Managing 36 plots is exhausting. You need FarmOS! Save up enough capital to install the automation system.",
        descriptionZH: "管理36块地太累了。你需要 FarmOS！存够资金安装自动化系统。",
        status: 'LOCKED',
        rewardMoney: 0,
        rewardType: 'UNLOCK_FEATURE',
        rewardFeature: 'FARM_OS',
        tasks: [
            { type: 'HAVE_MONEY', description: "Accumulate $8,000", count: 8000, current: 0, isComplete: false }
        ]
    },
    {
        id: 8,
        title: "Smart Farming",
        titleZH: "智慧农业",
        description: "Let's automate! Open FarmOS and install a Harvest Drone in any area to collect crops automatically.",
        descriptionZH: "开始自动化！打开 FarmOS，在任意区域安装收割无人机以自动收集作物。",
        status: 'LOCKED',
        rewardMoney: 2000,
        rewardType: 'MONEY',
        tasks: [
            { type: 'INSTALL_UPGRADE', description: "Install 1 Harvest Drone", targetId: 'DRONE', count: 1, current: 0, isComplete: false }
        ]
    },
    {
        id: 9,
        title: "The Golden Orchard",
        titleZH: "黄金果园",
        description: "Legends speak of a Golden Orchard. Unlock it to gain access to the exclusive Golden Apple seed.",
        descriptionZH: "传说中有一片黄金果园。解锁它以获取专属的金苹果种子。",
        status: 'LOCKED',
        rewardMoney: 1000, 
        rewardType: 'MONEY',
        tasks: [
            { type: 'UNLOCK_AREA', description: "Unlock Golden Orchard (Area 4)", targetId: 3, count: 1, current: 0, isComplete: false }
        ]
    },
    {
        id: 10,
        title: "Wolf of Farm Street",
        titleZH: "华尔街农夫",
        description: "The Stalk Market is volatile. Buy a Call or Put option to hedge your bets and multiply your profits.",
        descriptionZH: "黄金交易所波动剧烈。购买看涨或看跌期权来对冲风险并倍增利润。",
        status: 'LOCKED',
        rewardMoney: 10000,
        rewardType: 'MONEY',
        tasks: [
            { type: 'BUY_OPTION', description: "Buy 1 Option Contract", count: 1, current: 0, isComplete: false }
        ]
    }
];