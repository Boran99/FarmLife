
import React from 'react';

export const ItemIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-full h-full" }) => {
  
  // --- GLOBAL DEFINITIONS (Gradients, Filters) ---
  const Defs = () => (
    <defs>
      {/* Soft Drop Shadow */}
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
        <feOffset in="blur" dx="2" dy="4" result="offsetBlur"/>
        <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* Inner Glow / Rim Light */}
      <filter id="innerHighlight">
        <feGaussianBlur stdDeviation="1.5" result="blurred"/>
        <feComposite operator="out" in="SourceGraphic" in2="blurred" result="inverse"/>
        <feFlood floodColor="white" floodOpacity="0.4" result="color"/>
        <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
        <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
      </filter>

      {/* Foil Packet Gradient */}
      <linearGradient id="foilSilver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f3f4f6" />
        <stop offset="20%" stopColor="#d1d5db" />
        <stop offset="40%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#9ca3af" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </linearGradient>

      {/* Gloss Reflection Gradient */}
      <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.9" />
        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  );

  // --- HELPERS ---
  // A generic spherical highlighting overlay
  const GlossOverlay = () => (
    <>
      {/* Top shine */}
      <ellipse cx="35%" cy="25%" rx="20%" ry="12%" fill="url(#glassShine)" transform="rotate(-25)" opacity="0.8" />
      {/* Bottom rim light */}
      <path d="M 20 80 Q 50 95 80 80" fill="none" stroke="white" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    </>
  );

  // --- SEED PACKET WRAPPER ---
  const SeedPacket = ({ baseColor, accentColor, children }: { baseColor: string, accentColor: string, children: React.ReactNode }) => (
    <svg viewBox="0 0 100 100" className={className} style={{ overflow: 'visible' }}>
      <Defs />
      <g filter="url(#softShadow)">
        {/* Packet Body with Crinkles */}
        <path d="M15 10 L85 10 L90 90 L10 90 Z" fill={baseColor} stroke={accentColor} strokeWidth="1" />
        
        {/* Foil Shine Overlay */}
        <path d="M15 10 L85 10 L90 90 L10 90 Z" fill="url(#foilSilver)" opacity="0.3" style={{ mixBlendMode: 'overlay' }} />
        
        {/* Top Flap (Crimped) */}
        <path d="M10 10 L15 5 L85 5 L90 10 L90 20 L10 20 Z" fill="#e5e7eb" stroke="#9ca3af" />
        <path d="M12 12 L88 12" stroke="#9ca3af" strokeWidth="1" strokeDasharray="2 2" />

        {/* Center Label Circle */}
        <circle cx="50" cy="55" r="28" fill="white" stroke={accentColor} strokeWidth="2" />
        <circle cx="50" cy="55" r="24" fill="#f9fafb" />

        {/* The Icon inside */}
        <g transform="translate(50, 55) scale(0.45) translate(-50, -50)">
           {children}
        </g>

        {/* Bottom Label */}
        <rect x="25" y="82" width="50" height="6" rx="2" fill="white" stroke={accentColor} strokeWidth="1" />
      </g>
    </svg>
  );

  // --- ASSETS ---

  const TomatoArt = (
    <g>
      <defs>
        <radialGradient id="tomatoGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#c0392b" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="55" r="38" fill="url(#tomatoGrad)" filter="url(#softShadow)" />
      <GlossOverlay />
      {/* Leaves */}
      <path d="M50 20 L40 35 L50 40 L60 35 Z" fill="#2ecc71" stroke="#27ae60" strokeLinejoin="round" />
      <path d="M50 20 L30 25 L40 35" fill="#2ecc71" stroke="#27ae60" strokeLinejoin="round" />
      <path d="M50 20 L70 25 L60 35" fill="#2ecc71" stroke="#27ae60" strokeLinejoin="round" />
    </g>
  );

  const CornArt = (
    <g>
       <defs>
         <linearGradient id="cornGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f1c40f" />
            <stop offset="50%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#d4ac0d" />
         </linearGradient>
       </defs>
       <g filter="url(#softShadow)">
         {/* Husk Back */}
         <path d="M25 80 Q10 50 30 20" fill="#2ecc71" stroke="#27ae60" strokeWidth="2" />
         <path d="M75 80 Q90 50 70 20" fill="#2ecc71" stroke="#27ae60" strokeWidth="2" />
         
         {/* Cob */}
         <ellipse cx="50" cy="50" rx="22" ry="35" fill="url(#cornGrad)" />
         
         {/* Kernels Texture */}
         <g fill="#f59e0b" opacity="0.5">
            <circle cx="50" cy="30" r="3" /><circle cx="40" cy="35" r="3" /><circle cx="60" cy="35" r="3" />
            <circle cx="50" cy="45" r="3" /><circle cx="38" cy="50" r="3" /><circle cx="62" cy="50" r="3" />
            <circle cx="50" cy="60" r="3" /><circle cx="40" cy="65" r="3" /><circle cx="60" cy="65" r="3" />
         </g>
         
         <GlossOverlay />

         {/* Husk Front */}
         <path d="M50 90 Q30 80 30 50 L25 80 Z" fill="#27ae60" />
         <path d="M50 90 Q70 80 70 50 L75 80 Z" fill="#27ae60" />
       </g>
    </g>
  );

  const PotatoArt = (
    <g>
       <defs>
         <radialGradient id="potatoGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
         </radialGradient>
       </defs>
       <path d="M20 50 Q20 20 50 25 Q80 20 85 50 Q90 80 50 90 Q10 80 20 50 Z" fill="url(#potatoGrad)" filter="url(#softShadow)" />
       {/* Eyes */}
       <ellipse cx="35" cy="40" rx="2" ry="1" fill="#713f12" opacity="0.5" />
       <ellipse cx="65" cy="60" rx="2" ry="1" fill="#713f12" opacity="0.5" />
       <ellipse cx="55" cy="30" rx="2" ry="1" fill="#713f12" opacity="0.5" />
       <GlossOverlay />
    </g>
  );

  const SpinachArt = (
    <g filter="url(#softShadow)">
       <path d="M50 90 Q20 70 20 40 Q20 10 50 5 Q80 10 80 40 Q80 70 50 90" fill="#22c55e" />
       <path d="M50 90 Q50 50 50 10" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
       <path d="M50 50 Q30 40 30 30" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
       <path d="M50 60 Q70 50 70 40" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
       <path d="M50 5 Q65 10 65 30 Q65 50 50 60" fill="white" opacity="0.1" />
    </g>
  );

  const WatermelonArt = (
    <g filter="url(#softShadow)">
        <circle cx="50" cy="50" r="40" fill="#22c55e" />
        {/* Stripes */}
        <path d="M50 10 Q30 50 50 90" fill="none" stroke="#14532d" strokeWidth="6" />
        <path d="M20 30 Q40 50 20 80" fill="none" stroke="#14532d" strokeWidth="5" />
        <path d="M80 30 Q60 50 80 80" fill="none" stroke="#14532d" strokeWidth="5" />
        <GlossOverlay />
    </g>
  );

  const PumpkinArt = (
    <g filter="url(#softShadow)">
       <defs>
         <radialGradient id="pumpkinBody" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
         </radialGradient>
       </defs>
       {/* Back Lobes */}
       <ellipse cx="30" cy="50" rx="25" ry="35" fill="#ea580c" />
       <ellipse cx="70" cy="50" rx="25" ry="35" fill="#ea580c" />
       {/* Front Lobe */}
       <ellipse cx="50" cy="55" rx="28" ry="38" fill="url(#pumpkinBody)" />
       {/* Stem */}
       <path d="M50 20 L55 5 L65 2" stroke="#65a30d" strokeWidth="4" fill="none" strokeLinecap="round" />
       <GlossOverlay />
    </g>
  );

  const StrawberryArt = (
    <g filter="url(#softShadow)">
       <defs>
         <radialGradient id="berryGrad" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
         </radialGradient>
       </defs>
       <path d="M50 90 Q15 60 20 30 Q50 20 80 30 Q85 60 50 90 Z" fill="url(#berryGrad)" />
       {/* Seeds */}
       <g fill="#fca5a5">
         <circle cx="35" cy="40" r="1.5"/><circle cx="50" cy="40" r="1.5"/><circle cx="65" cy="40" r="1.5"/>
         <circle cx="42" cy="55" r="1.5"/><circle cx="58" cy="55" r="1.5"/>
         <circle cx="50" cy="70" r="1.5"/>
       </g>
       {/* Leaves */}
       <path d="M20 30 L35 25 L50 30 L65 25 L80 30 L50 15 Z" fill="#4ade80" stroke="#166534" strokeWidth="1" />
       <GlossOverlay />
    </g>
  );

  const WheatArt = (
    <g filter="url(#softShadow)">
       <defs>
          <linearGradient id="wheatGrad" x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#facc15" />
             <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
       </defs>
       <path d="M50 90 L50 20" stroke="#eab308" strokeWidth="3" />
       {/* Grain Head */}
       <ellipse cx="50" cy="30" rx="8" ry="18" fill="url(#wheatGrad)" />
       {/* Whiskers */}
       <path d="M50 12 L45 5 M50 12 L50 2 M50 12 L55 5" stroke="#eab308" strokeWidth="1" />
       {/* Leaves */}
       <path d="M50 70 Q30 60 30 40" fill="none" stroke="#eab308" strokeWidth="3" />
       <path d="M50 60 Q70 50 70 30" fill="none" stroke="#eab308" strokeWidth="3" />
    </g>
  );

  const SoybeanArt = (
    <g filter="url(#softShadow)">
       <defs>
         <linearGradient id="podGrad">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#16a34a" />
         </linearGradient>
       </defs>
       <path d="M50 85 Q80 50 70 20 Q50 10 40 30 Q20 60 50 85" fill="url(#podGrad)" stroke="#15803d" strokeWidth="1" />
       <circle cx="50" cy="40" r="8" fill="#dcfce7" opacity="0.4" />
       <circle cx="45" cy="60" r="7" fill="#dcfce7" opacity="0.4" />
       <GlossOverlay />
    </g>
  );

  const SunflowerArt = (
    <g filter="url(#softShadow)">
        {/* Petals */}
        {Array.from({length: 12}).map((_, i) => (
           <path key={i} d="M50 50 L50 10 Q58 5 65 10 L65 50 Z" fill="#facc15" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        {/* Center */}
        <circle cx="50" cy="50" r="20" fill="#374151" stroke="#1f2937" strokeWidth="2" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="#4b5563" strokeWidth="1" strokeDasharray="2 2" />
    </g>
  );

  const SugarCaneArt = (
    <g filter="url(#softShadow)">
        <rect x="40" y="10" width="20" height="80" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
        {/* Segments */}
        <line x1="40" y1="30" x2="60" y2="30" stroke="#16a34a" strokeWidth="2" />
        <line x1="40" y1="55" x2="60" y2="55" stroke="#16a34a" strokeWidth="2" />
        <line x1="40" y1="80" x2="60" y2="80" stroke="#16a34a" strokeWidth="2" />
        {/* Leaves */}
        <path d="M60 10 Q80 0 90 20" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 20 Q20 10 10 30" fill="none" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
    </g>
  );

  const CottonArt = (
    <g filter="url(#softShadow)">
       <path d="M50 90 L50 50" stroke="#78350f" strokeWidth="3" />
       <g transform="translate(50, 40)">
          <circle cx="0" cy="0" r="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M-10 5 Q0 15 10 5" stroke="#cbd5e1" fill="none" />
          <path d="M0 -15 L0 15" stroke="#cbd5e1" fill="none" opacity="0.5" />
       </g>
    </g>
  );

  const CoffeeArt = (
    <g filter="url(#softShadow)">
       <defs>
         <radialGradient id="beanGrad">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
         </radialGradient>
       </defs>
       <ellipse cx="50" cy="50" rx="25" ry="35" fill="url(#beanGrad)" transform="rotate(-20 50 50)" />
       <path d="M50 20 Q65 50 45 80" stroke="#270a02" strokeWidth="4" fill="none" strokeLinecap="round" transform="rotate(-20 50 50)" />
       <GlossOverlay />
    </g>
  );

  const GrapeArt = (
    <g filter="url(#softShadow)">
       <g fill="#9333ea">
         <circle cx="50" cy="80" r="10" />
         <circle cx="40" cy="65" r="10" /><circle cx="60" cy="65" r="10" />
         <circle cx="30" cy="50" r="10" /><circle cx="50" cy="50" r="10" /><circle cx="70" cy="50" r="10" />
         <circle cx="20" cy="35" r="10" /><circle cx="40" cy="35" r="10" /><circle cx="60" cy="35" r="10" /><circle cx="80" cy="35" r="10" />
       </g>
       <path d="M50 25 L50 10" stroke="#4d7c0f" strokeWidth="4" />
       <path d="M50 25 Q20 10 10 30" fill="#86efac" stroke="#16a34a" strokeWidth="1" />
    </g>
  );

  const GoldenAppleArt = (
    <g filter="url(#softShadow)">
       <defs>
         <radialGradient id="goldGrad" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
         </radialGradient>
       </defs>
       <path d="M50 30 L50 15" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
       <path d="M50 30 Q70 15 80 30 Q60 35 50 30" fill="#4ade80" stroke="#16a34a" />
       <path d="M50 90 C10 90 0 40 50 30 C100 40 90 90 50 90 Z" fill="url(#goldGrad)" stroke="#ca8a04" strokeWidth="1" />
       <GlossOverlay />
    </g>
  );

  // --- PRODUCT ASSETS (Bottles, Bags, Blocks) ---

  const FlourArt = (
    <g filter="url(#softShadow)">
       <path d="M20 85 Q20 30 35 25 Q50 20 65 25 Q80 30 80 85 Q50 95 20 85" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="2" />
       <path d="M30 28 H70" stroke="#78716c" strokeWidth="4" strokeLinecap="round" />
       <text x="50" y="65" textAnchor="middle" fontSize="12" fontWeight="900" fill="#d6d3d1">FLOUR</text>
    </g>
  );

  const OilArt = (
    <g filter="url(#softShadow)">
       <defs>
         <linearGradient id="oilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.9" />
         </linearGradient>
       </defs>
       <path d="M35 90 L35 40 L45 25 L45 10 L55 10 L55 25 L65 40 L65 90 Z" fill="url(#oilGrad)" stroke="#ca8a04" strokeWidth="1" />
       <rect x="44" y="8" width="12" height="6" fill="#78350f" rx="1" />
       <path d="M60 45 L60 85" stroke="white" strokeWidth="3" opacity="0.4" strokeLinecap="round" />
       <circle cx="50" cy="65" r="8" fill="#fbbf24" />
    </g>
  );

  const TofuArt = (
    <g filter="url(#softShadow)">
       {/* 3D Cube Isometric */}
       <path d="M50 20 L90 40 L50 60 L10 40 Z" fill="#f5f5f4" stroke="#e7e5e4" strokeWidth="1" />
       <path d="M10 40 L50 60 L50 90 L10 70 Z" fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="1" />
       <path d="M90 40 L90 70 L50 90 L50 60 Z" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1" />
    </g>
  );

  const RumArt = (
    <g filter="url(#softShadow)">
       {/* Barrel */}
       <path d="M20 20 Q10 50 20 80 L80 80 Q90 50 80 20 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
       <path d="M18 35 H82 M18 65 H82" stroke="#94a3b8" strokeWidth="4" />
       <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fbbf24">XXX</text>
    </g>
  );

  const FabricArt = (
    <g filter="url(#softShadow)">
       <defs>
         <linearGradient id="clothGrad">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
         </linearGradient>
       </defs>
       {/* Roll Side */}
       <ellipse cx="30" cy="50" rx="10" ry="20" fill="#1e40af" />
       {/* Roll Body */}
       <path d="M30 30 L80 30 Q90 50 80 70 L30 70" fill="url(#clothGrad)" />
       {/* Drape */}
       <path d="M30 70 Q40 90 70 85" fill="none" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
    </g>
  );

  const CoffeeRoastArt = (
    <g filter="url(#softShadow)">
       <path d="M30 20 L70 20 L80 85 L20 85 Z" fill="#44403c" stroke="#292524" strokeWidth="2" />
       <circle cx="50" cy="55" r="15" fill="#f59e0b" />
       <path d="M50 50 L50 60 M45 55 H55" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    </g>
  );

  const WineArt = (
    <g filter="url(#softShadow)">
       <path d="M40 30 L40 15 L60 15 L60 30 L70 40 L70 90 L30 90 L30 40 Z" fill="#581c87" stroke="#3b0764" strokeWidth="2" />
       <rect x="38" y="55" width="24" height="20" fill="#f3e8ff" />
       <rect x="40" y="13" width="20" height="6" fill="#9f1239" />
       <path d="M65 50 L65 80" stroke="white" strokeWidth="2" opacity="0.2" />
    </g>
  );

  // --- RENDER ---

  const renderContent = () => {
    switch (name) {
        // SEEDS (Wrapped in Foil Packets)
        case 'Spinach Seed': return <SeedPacket baseColor="#f0fdf4" accentColor="#22c55e">{SpinachArt}</SeedPacket>;
        case 'Potato Seed': return <SeedPacket baseColor="#fefce8" accentColor="#ca8a04">{PotatoArt}</SeedPacket>;
        case 'Corn Seed': return <SeedPacket baseColor="#fef9c3" accentColor="#eab308">{CornArt}</SeedPacket>;
        case 'Strawberry Seed': return <SeedPacket baseColor="#fef2f2" accentColor="#ef4444">{StrawberryArt}</SeedPacket>;
        case 'Tomato Seed': return <SeedPacket baseColor="#fef2f2" accentColor="#ef4444">{TomatoArt}</SeedPacket>;
        case 'Watermelon Seed': return <SeedPacket baseColor="#f0fdf4" accentColor="#22c55e">{WatermelonArt}</SeedPacket>;
        case 'Pumpkin Seed': return <SeedPacket baseColor="#fff7ed" accentColor="#f97316">{PumpkinArt}</SeedPacket>;
        case 'Winter Wheat Seed': return <SeedPacket baseColor="#fefce8" accentColor="#ca8a04">{WheatArt}</SeedPacket>;
        case 'Soybean Seed': return <SeedPacket baseColor="#f0fdf4" accentColor="#22c55e">{SoybeanArt}</SeedPacket>;
        case 'Sunflower Seed': return <SeedPacket baseColor="#fefce8" accentColor="#eab308">{SunflowerArt}</SeedPacket>;
        case 'Sugar Cane Seed': return <SeedPacket baseColor="#f0fdf4" accentColor="#22c55e">{SugarCaneArt}</SeedPacket>;
        case 'Cotton Seed': return <SeedPacket baseColor="#f8fafc" accentColor="#64748b">{CottonArt}</SeedPacket>;
        case 'Coffee Bean Seed': return <SeedPacket baseColor="#fafaf9" accentColor="#78350f">{CoffeeArt}</SeedPacket>;
        case 'Grape Vine': return <SeedPacket baseColor="#faf5ff" accentColor="#9333ea">{GrapeArt}</SeedPacket>;
        case 'Golden Apple Seed': return <SeedPacket baseColor="#fefce8" accentColor="#eab308">{GoldenAppleArt}</SeedPacket>;

        // CROPS & PRODUCTS (Direct SVG)
        case 'Spinach': return <svg viewBox="0 0 100 100" className={className}>{SpinachArt}</svg>;
        case 'Potato': return <svg viewBox="0 0 100 100" className={className}>{PotatoArt}</svg>;
        case 'Corn': return <svg viewBox="0 0 100 100" className={className}>{CornArt}</svg>;
        case 'Tomato': return <svg viewBox="0 0 100 100" className={className}>{TomatoArt}</svg>;
        case 'Watermelon': return <svg viewBox="0 0 100 100" className={className}>{WatermelonArt}</svg>;
        case 'Pumpkin': return <svg viewBox="0 0 100 100" className={className}>{PumpkinArt}</svg>;
        case 'Strawberry': return <svg viewBox="0 0 100 100" className={className}>{StrawberryArt}</svg>;
        case 'Wheat': return <svg viewBox="0 0 100 100" className={className}>{WheatArt}</svg>;
        case 'Soybeans': return <svg viewBox="0 0 100 100" className={className}>{SoybeanArt}</svg>;
        case 'Sunflowers': return <svg viewBox="0 0 100 100" className={className}>{SunflowerArt}</svg>;
        case 'Sugar Cane': return <svg viewBox="0 0 100 100" className={className}>{SugarCaneArt}</svg>;
        case 'Raw Cotton': return <svg viewBox="0 0 100 100" className={className}>{CottonArt}</svg>;
        case 'Coffee Beans': return <svg viewBox="0 0 100 100" className={className}>{CoffeeArt}</svg>;
        case 'Grapes': return <svg viewBox="0 0 100 100" className={className}>{GrapeArt}</svg>;
        case 'Golden Apple': return <svg viewBox="0 0 100 100" className={className}>{GoldenAppleArt}</svg>;

        case 'Flour': return <svg viewBox="0 0 100 100" className={className}>{FlourArt}</svg>;
        case 'Sunflower Oil': return <svg viewBox="0 0 100 100" className={className}>{OilArt}</svg>;
        case 'Tofu': return <svg viewBox="0 0 100 100" className={className}>{TofuArt}</svg>;
        case 'Aged Rum': return <svg viewBox="0 0 100 100" className={className}>{RumArt}</svg>;
        case 'Fabric Bolt': return <svg viewBox="0 0 100 100" className={className}>{FabricArt}</svg>;
        case 'Roast Coffee': return <svg viewBox="0 0 100 100" className={className}>{CoffeeRoastArt}</svg>;
        case 'Fine Wine': return <svg viewBox="0 0 100 100" className={className}>{WineArt}</svg>;

        default: return <span className="flex items-center justify-center h-full text-3xl">📦</span>;
    }
  };

  return renderContent();
};
