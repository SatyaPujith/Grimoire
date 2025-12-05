import React from 'react';

export const SkullIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C7.58 2 4 5.58 4 10c0 2.62 1.27 4.94 3.25 6.38A3.003 3.003 0 007 19v1h2v-1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1h2v-1a3.003 3.003 0 00-.25-2.62C18.73 14.94 20 12.62 20 10c0-4.42-3.58-8-8-8zm-5 8c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1-.91.63-1.46 1.6-1.74 2.65l-.11.4H8l-.11-.4c-.28-1.05-.83-2.02-1.74-2.65A4.98 4.98 0 017 10zM9 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
);

export const GhostIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250" fill="currentColor" className={className}>
        {/* Main ghost body with tattered edges */}
        <path d="M100 20 C60 20 30 50 30 90 L30 180 C30 190 35 195 40 200 L45 210 L50 200 L55 210 L60 200 L65 210 L70 200 L75 210 L80 200 L85 210 L90 200 L95 210 L100 200 L105 210 L110 200 L115 210 L120 200 L125 210 L130 200 L135 210 L140 200 L145 210 L150 200 L155 210 L160 200 C165 195 170 190 170 180 L170 90 C170 50 140 20 100 20 Z" 
              fill="currentColor" opacity="0.9" />
        
        {/* Darker inner shadow for depth */}
        <ellipse cx="100" cy="120" rx="50" ry="70" fill="black" opacity="0.2" />
        
        {/* Creepy hollow eyes */}
        <ellipse cx="75" cy="90" rx="12" ry="18" fill="black" />
        <ellipse cx="125" cy="90" rx="12" ry="18" fill="black" />
        
        {/* Eye glow effect */}
        <ellipse cx="75" cy="85" rx="6" ry="8" fill="#ff0000" opacity="0.8" />
        <ellipse cx="125" cy="85" rx="6" ry="8" fill="#ff0000" opacity="0.8" />
        
        {/* Screaming mouth */}
        <ellipse cx="100" cy="130" rx="15" ry="25" fill="black" />
        <path d="M90 130 Q100 145 110 130" stroke="black" strokeWidth="3" fill="none" />
        
        {/* Wispy trails */}
        <path d="M40 150 Q30 170 35 190" stroke="currentColor" strokeWidth="8" opacity="0.3" fill="none" />
        <path d="M160 150 Q170 170 165 190" stroke="currentColor" strokeWidth="8" opacity="0.3" fill="none" />
        
        {/* Tattered cloth effect */}
        <path d="M50 100 L45 120 L50 140" stroke="black" strokeWidth="2" opacity="0.4" fill="none" />
        <path d="M150 100 L155 120 L150 140" stroke="black" strokeWidth="2" opacity="0.4" fill="none" />
    </svg>
);

export const SpiderWebIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <path d="M4.93 4.93l14.14 14.14" />
        <path d="M19.07 4.93L4.93 19.07" />
        <path d="M12 7a5 5 0 0 1 0 10 5 5 0 0 1 0-10" />
        <path d="M12 10a2 2 0 0 1 0 4 2 2 0 0 1 0-4" />
    </svg>
);

export const ScrollIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.5 2.5a2.5 2.5 0 00-5 0V4H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2h-1.5V2.5zM11 4V2.5a.5.5 0 011 0V4h-1z" opacity="0.8"/>
        <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" />
    </svg>
);

export const BatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className}>
         <path d="M495.4 163c-14.4-6.6-43.7-18.7-77.9-20.9-10.9-.7-23.7.2-34 3.7-8.2 2.8-15.3 7-22 13-17.7 15.9-32.3 35.8-49.4 53.6-6.1 6.3-12.7 12.3-19.4 18-5.7-4.8-11.3-9.9-16.7-15.3-20.8-21-39.7-43.2-61.6-61.9-8.3-7.1-17.1-11.9-27.1-14.8-12.2-3.6-26.9-3.9-39.3-1.8-35.8 5.7-65.7 21.3-79.6 28.7-15.6 8.3-25.1 26.2-22.1 41.7 2.4 12.6 15 21.8 28.3 20.6 11.2-1 25.8-8.5 37-14.5 9-4.8 17.5-10 26.3-14.1 8-3.7 16.5-7.3 26.6-7.5 12.1-.2 20.4 6 25.8 10.9 9.3 8.3 17.6 18.2 25.6 27.5 14.5 16.9 28.6 33.3 45.4 47.7 4.1 3.5 8.4 6.8 13.1 9.7 10.5 6.6 21.8 10.9 33.1 12.3 11.8 1.5 24.3-.8 34.6-6.7 5.6-3.2 10.7-7 15.6-11 19.3-15.9 35.3-33.8 51.7-52.2 9.2-10.4 18.9-21.4 30.1-30.7 6.4-5.3 16.2-12 28.9-11.8 10.4.2 19.3 4 27.8 8 10.9 5.2 19.8 11.2 29.5 16.9 11.8 7 24.8 15.2 36.3 15.8 13.5.7 25.9-8.8 27.9-21.3 2.2-13.6-5.8-31.5-18.9-40.3z"/>
    </svg>
);

export const PumpkinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2c-.5 0-1 .45-1 1v2c-2.76 0-5 2.24-5 5v1c-1.1 0-2 .9-2 2s.9 2 2 2v2c0 2.76 2.24 5 5 5s5-2.24 5-5v-2c1.1 0 2-.9 2-2s-.9-2-2-2V10c0-2.76-2.24-5-5-5V3c0-.55-.5-1-1-1zm1 14h-2v-2h2v2zm-4 0H7v-2h2v2zm8 0h-2v-2h2v2z" />
    </svg>
);

export const SwordIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5L21 11l3 3-5 5-1.5-1.5z" />
        <path d="M4 22l4-4" stroke="currentColor" strokeWidth="2" />
    </svg>
);

export const ZombieHandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 2v6H7V2h2zm4 0v6h-2V2h2zm4 0v6h-2V2h2zM5 8h14v2H5V8zm0 4h14v2H5v-2zm2 4h10v6H7v-6z" />
    </svg>
);

export const CoffinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9 2l-2 4v16l5 2 5-2V6l-2-4H9zm1 2h4l1 2v14l-3 1-3-1V6l1-2z" />
    </svg>
);

export const CandleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <ellipse cx="12" cy="4" rx="2" ry="3" opacity="0.6" />
        <path d="M10 6h4v14h-4z" />
        <rect x="8" y="20" width="8" height="2" rx="1" />
    </svg>
);


export const TombstoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" fill="currentColor" className={className}>
        <rect x="20" y="40" width="60" height="100" rx="30" ry="30" fill="currentColor" />
        <rect x="15" y="120" width="70" height="30" fill="currentColor" />
        <path d="M35 60 L65 60 M50 50 L50 80" stroke="black" strokeWidth="4" opacity="0.3" />
        <text x="50" y="105" fontSize="12" textAnchor="middle" fill="black" opacity="0.5">RIP</text>
    </svg>
);

export const SkeletonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" fill="currentColor" className={className}>
        {/* Skull */}
        <ellipse cx="50" cy="30" rx="20" ry="25" fill="currentColor" />
        <ellipse cx="43" cy="28" rx="4" ry="6" fill="black" />
        <ellipse cx="57" cy="28" rx="4" ry="6" fill="black" />
        <path d="M45 38 L55 38 L50 42 Z" fill="black" />
        <rect x="46" y="42" width="8" height="6" fill="black" />
        
        {/* Spine and ribs */}
        <rect x="48" y="55" width="4" height="60" fill="currentColor" />
        <ellipse cx="50" cy="70" rx="15" ry="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="50" cy="80" rx="14" ry="7" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="50" cy="90" rx="13" ry="6" fill="none" stroke="currentColor" strokeWidth="3" />
        
        {/* Arms */}
        <rect x="25" y="65" width="20" height="4" fill="currentColor" transform="rotate(-20 35 67)" />
        <rect x="55" y="65" width="20" height="4" fill="currentColor" transform="rotate(20 65 67)" />
        
        {/* Legs */}
        <rect x="40" y="115" width="5" height="50" fill="currentColor" />
        <rect x="55" y="115" width="5" height="50" fill="currentColor" />
        <rect x="35" y="165" width="15" height="5" fill="currentColor" />
        <rect x="50" y="165" width="15" height="5" fill="currentColor" />
    </svg>
);

export const TreeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 150" fill="currentColor" className={className}>
        {/* Dead tree trunk */}
        <rect x="42" y="60" width="16" height="90" fill="currentColor" />
        
        {/* Twisted branches */}
        <path d="M50 60 Q30 50 20 40 L15 35" stroke="currentColor" strokeWidth="4" fill="none" />
        <path d="M50 60 Q70 50 80 40 L85 35" stroke="currentColor" strokeWidth="4" fill="none" />
        <path d="M50 80 Q25 75 15 70" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M50 80 Q75 75 85 70" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M50 100 Q35 95 25 90" stroke="currentColor" strokeWidth="3" fill="none" />
        
        {/* Cracks in trunk */}
        <path d="M45 70 L48 85" stroke="black" strokeWidth="1" opacity="0.5" />
        <path d="M55 90 L52 105" stroke="black" strokeWidth="1" opacity="0.5" />
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" className={className}>
        <circle cx="50" cy="50" r="40" fill="currentColor" />
        <circle cx="60" cy="45" r="35" fill="black" />
        {/* Craters */}
        <circle cx="35" cy="40" r="5" fill="black" opacity="0.3" />
        <circle cx="45" cy="55" r="3" fill="black" opacity="0.3" />
        <circle cx="38" cy="60" r="4" fill="black" opacity="0.3" />
    </svg>
);

export const FenceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" fill="currentColor" className={className}>
        {/* Broken fence posts */}
        <rect x="10" y="40" width="8" height="50" fill="currentColor" transform="rotate(-5 14 65)" />
        <rect x="50" y="35" width="8" height="55" fill="currentColor" />
        <rect x="90" y="40" width="8" height="50" fill="currentColor" transform="rotate(5 94 65)" />
        <rect x="130" y="38" width="8" height="52" fill="currentColor" transform="rotate(-3 134 64)" />
        <rect x="170" y="40" width="8" height="50" fill="currentColor" />
        
        {/* Horizontal rails */}
        <rect x="0" y="50" width="200" height="5" fill="currentColor" />
        <rect x="0" y="70" width="200" height="5" fill="currentColor" />
        
        {/* Pointed tops */}
        <polygon points="14,40 10,50 18,50" fill="currentColor" />
        <polygon points="54,35 50,45 58,45" fill="currentColor" />
        <polygon points="94,40 90,50 98,50" fill="currentColor" />
        <polygon points="134,38 130,48 138,48" fill="currentColor" />
        <polygon points="174,40 170,50 178,50" fill="currentColor" />
    </svg>
);
