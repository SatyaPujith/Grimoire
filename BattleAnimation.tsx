import React, { useState, useEffect } from 'react';
import { GhostIcon, SwordIcon } from './components/SpookyIcons';

interface BattleAnimationProps {
    onComplete: () => void;
}

export const BattleAnimation: React.FC<BattleAnimationProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'hero-enter' | 'ghost-appear' | 'clash' | 'hero-attack' | 'ghost-defeat' | 'victory'>('hero-enter');

    useEffect(() => {
        const timeline = [
            { phase: 'hero-enter', duration: 1500 },
            { phase: 'ghost-appear', duration: 1500 },
            { phase: 'clash', duration: 2000 },
            { phase: 'hero-attack', duration: 2000 },
            { phase: 'ghost-defeat', duration: 2000 },
            { phase: 'victory', duration: 1000 }
        ];

        let currentTime = 0;
        timeline.forEach((step) => {
            setTimeout(() => {
                setPhase(step.phase as any);
            }, currentTime);
            currentTime += step.duration;
        });

        setTimeout(() => {
            onComplete();
        }, currentTime);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                {/* Lightning flashes */}
                {(phase === 'clash' || phase === 'hero-attack') && (
                    <>
                        <div className="absolute inset-0 bg-white animate-pulse" style={{ animationDuration: '0.2s' }}></div>
                        <div className="absolute inset-0 bg-purple-500/50 animate-pulse" style={{ animationDuration: '0.3s', animationDelay: '0.1s' }}></div>
                    </>
                )}
                
                {/* Graveyard ground */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
                
                {/* Moon */}
                <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-yellow-100 opacity-60 shadow-[0_0_100px_rgba(255,255,200,0.5)]"></div>
            </div>

            {/* Battle Scene */}
            <div className="relative w-full h-full flex items-center justify-center">
                
                {/* Real Human Hero */}
                <div
                    className={`absolute transition-all duration-1000 ${
                        phase === 'hero-enter' ? '-left-96 opacity-0' :
                        phase === 'ghost-appear' ? 'left-1/4 opacity-100' :
                        phase === 'clash' ? 'left-1/3 opacity-100 scale-110' :
                        phase === 'hero-attack' ? 'left-1/2 opacity-100 scale-125 -translate-x-32' :
                        phase === 'ghost-defeat' ? 'left-1/2 opacity-100 scale-110 -translate-x-32' :
                        'left-1/2 opacity-100 -translate-x-1/2'
                    }`}
                    style={{
                        transform: phase === 'hero-attack' ? 'translateX(-32px) rotate(-15deg)' : undefined
                    }}
                >
                    {/* Human Warrior */}
                    <div className="relative w-32 h-56">
                        {/* Head - realistic skin tone */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full relative">
                            {/* Hair */}
                            <div className="absolute -top-2 left-0 right-0 h-8 bg-gradient-to-b from-orange-900 to-orange-800 rounded-t-full"></div>
                            {/* Face details */}
                            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                            </div>
                            {/* Nose */}
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-orange-400"></div>
                            {/* Mouth */}
                            <div className="absolute top-13 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-red-800 rounded-full"></div>
                            {/* Face shadow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-400/30 rounded-full"></div>
                        </div>
                        
                        {/* Neck */}
                        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-orange-300 to-orange-400"></div>
                        
                        {/* Body - cloth tunic */}
                        <div className="absolute top-26 left-1/2 transform -translate-x-1/2 w-24 h-28 bg-gradient-to-b from-blue-800 to-blue-900 rounded-lg relative">
                            {/* Tunic details */}
                            <div className="absolute inset-2 border-2 border-blue-700/30 rounded"></div>
                            {/* Belt */}
                            <div className="absolute bottom-4 left-0 right-0 h-3 bg-gradient-to-r from-orange-800 to-orange-700"></div>
                        </div>
                        
                        {/* Arms - skin tone */}
                        <div className="absolute top-28 left-1 w-7 h-24 bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg"></div>
                        <div className="absolute top-28 right-1 w-7 h-24 bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg"></div>
                        
                        {/* Hands */}
                        <div className="absolute top-52 left-1 w-7 h-6 bg-orange-300 rounded"></div>
                        <div className="absolute top-52 right-1 w-7 h-6 bg-orange-300 rounded"></div>
                        
                        {/* Legs - pants */}
                        <div className="absolute bottom-0 left-6 w-9 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg"></div>
                        <div className="absolute bottom-0 right-6 w-9 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg"></div>
                        
                        {/* Boots */}
                        <div className="absolute bottom-0 left-6 w-9 h-6 bg-gray-900 rounded"></div>
                        <div className="absolute bottom-0 right-6 w-9 h-6 bg-gray-900 rounded"></div>
                        
                        {/* Sword */}
                        <div className={`absolute top-20 -right-8 transition-all duration-300 ${
                            phase === 'hero-attack' ? 'scale-150 rotate-90' : 'rotate-45'
                        }`}>
                            <SwordIcon className="w-20 h-20 text-gray-300 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                        </div>
                    </div>
                </div>

                {/* Terrifying Black & White Ghost */}
                <div
                    className={`absolute transition-all duration-1000 ${
                        phase === 'hero-enter' ? 'right-1/4 opacity-0 scale-50' :
                        phase === 'ghost-appear' ? 'right-1/4 opacity-100 scale-100' :
                        phase === 'clash' ? 'right-1/3 opacity-100 scale-110' :
                        phase === 'hero-attack' ? 'right-1/3 opacity-80 scale-90' :
                        phase === 'ghost-defeat' ? 'right-1/4 opacity-0 scale-150 rotate-180' :
                        'right-1/4 opacity-0'
                    }`}
                    style={{
                        filter: phase === 'ghost-defeat' ? 'blur(20px) grayscale(1)' : 'grayscale(1) contrast(1.5)'
                    }}
                >
                    <div className="relative">
                        {/* Black and white ghost - more terrifying */}
                        <div style={{ filter: 'drop-shadow(0 0 50px rgba(0,0,0,0.9))' }}>
                            <GhostIcon className={`w-96 h-96 transition-all duration-500 ${
                                phase === 'ghost-defeat' ? 'text-gray-900' : 'text-gray-200'
                            }`} />
                        </div>
                        
                        {/* Hollow black eyes */}
                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-8">
                            <div className="w-12 h-16 bg-black rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,1)]"></div>
                            <div className="w-12 h-16 bg-black rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,1)]"></div>
                        </div>
                        
                        {/* Dark aura */}
                        <div className="absolute inset-0 bg-black/60 rounded-full blur-3xl animate-pulse"></div>
                        
                        {/* Wispy dark trails */}
                        <div className="absolute inset-0">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-16 h-32 bg-gradient-to-b from-gray-800 to-transparent opacity-40 animate-float"
                                    style={{
                                        left: `${20 + i * 15}%`,
                                        bottom: '-20%',
                                        animationDelay: `${i * 0.2}s`,
                                        animationDuration: '3s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Impact Effects */}
                {phase === 'clash' && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping"
                                style={{
                                    left: `${Math.cos(i * 30 * Math.PI / 180) * 100}px`,
                                    top: `${Math.sin(i * 30 * Math.PI / 180) * 100}px`,
                                    animationDelay: `${i * 0.05}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Explosion on hit */}
                {phase === 'hero-attack' && (
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-96 h-96 rounded-full bg-orange-500 animate-ping opacity-75"></div>
                        <div className="absolute inset-0 w-96 h-96 rounded-full bg-red-500 animate-ping opacity-50" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute inset-0 w-96 h-96 rounded-full bg-yellow-500 animate-ping opacity-50" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                )}

                {/* Victory Text */}
                {phase === 'victory' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center animate-bounce">
                            <h1 className="font-drip text-8xl text-orange-500 drop-shadow-[0_0_50px_rgba(255,165,0,1)] mb-4">
                                DEFEATED!
                            </h1>
                            <p className="font-creep text-3xl text-yellow-400">+10 Souls</p>
                        </div>
                    </div>
                )}

                {/* Slash effects */}
                {phase === 'hero-attack' && (
                    <>
                        <div className="absolute left-1/2 top-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse"></div>
                        <div className="absolute left-1/2 top-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    </>
                )}
            </div>

            {/* Screen shake effect */}
            {(phase === 'clash' || phase === 'hero-attack') && (
                <div className="absolute inset-0 animate-shake pointer-events-none"></div>
            )}
        </div>
    );
};
