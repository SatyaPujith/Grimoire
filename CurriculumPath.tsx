import React, { useRef, useEffect } from 'react';
import { Module, SubTopic } from './types';
import { TombstoneIcon, SkeletonIcon, TreeIcon, GhostIcon, PumpkinIcon, SkullIcon, MoonIcon } from './components/SpookyIcons';

interface CurriculumPathProps {
    allTopics: Array<{ module: Module; topic: SubTopic; moduleIdx: number; topicIdx: number }>;
    currentTopicIndex: number;
    completedTopics: Set<number>;
    souls: number;
    onSelectTopic: (module: Module, topic: SubTopic, index: number) => void;
    onReset: () => void;
    subject: string;
}

export const CurriculumPath: React.FC<CurriculumPathProps> = ({
    allTopics,
    currentTopicIndex,
    completedTopics,
    souls,
    onSelectTopic,
    onReset,
    subject
}) => {
    const pathRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to current topic (horizontal)
    useEffect(() => {
        if (pathRef.current) {
            const scrollPosition = currentTopicIndex * 500;
            pathRef.current.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentTopicIndex]);



    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-black via-purple-950/20 to-black">
            {/* Fixed Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-900/50 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h2 className="font-drip text-3xl md:text-4xl text-orange-600 drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]">
                            {subject}
                        </h2>
                        <p className="text-gray-400 italic font-serif text-sm">Graveyard Journey</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2 text-orange-400 font-creep text-xl bg-black/60 px-4 py-2 rounded-full border border-orange-800">
                            <PumpkinIcon className="w-6 h-6 animate-pulse" />
                            <span>{souls}</span>
                        </div>
                        <button
                            onClick={onReset}
                            className="px-4 py-2 bg-transparent text-purple-400 border border-purple-600 rounded-lg hover:bg-purple-900/30 transition-all flex items-center gap-2"
                        >
                            <SkullIcon className="w-5 h-5" />
                            <span className="hidden md:inline">Exit</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scrollable Path Container with Parallax */}
            <div ref={pathRef} className="pt-24 pb-12 overflow-x-auto overflow-y-hidden h-screen parallax-container" style={{ scrollBehavior: 'smooth' }}>
                <div className="relative h-full px-8" style={{ width: `${allTopics.length * 400}px`, minWidth: '100vw' }}>
                    {/* Simple winding path */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#6b21a8" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.3" />
                            </linearGradient>
                        </defs>
                        
                        {/* Simple curved path */}
                        <path
                            d={`M 100 ${window.innerHeight / 2} ${allTopics.map((_, idx) => {
                                const x = idx * 400 + 200;
                                const y = window.innerHeight / 2 + Math.sin(idx * 0.8) * 150;
                                return `L ${x} ${y}`;
                            }).join(' ')}`}
                            stroke="url(#pathGradient)"
                            strokeWidth="40"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.6"
                        />
                        
                        {/* Glowing center line */}
                        <path
                            d={`M 100 ${window.innerHeight / 2} ${allTopics.map((_, idx) => {
                                const x = idx * 400 + 200;
                                const y = window.innerHeight / 2 + Math.sin(idx * 0.8) * 150;
                                return `L ${x} ${y}`;
                            }).join(' ')}`}
                            stroke="#a855f7"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="15,10"
                            strokeLinecap="round"
                            opacity="0.8"
                            className="animate-pulse"
                        />
                    </svg>
                    
                    {/* Haunted Towns along the path */}
                    {allTopics.map((item, idx) => {
                        const isCompleted = completedTopics.has(idx);
                        const isCurrent = idx === currentTopicIndex;
                        const isLocked = idx > currentTopicIndex;
                        const xPosition = idx * 400 + 200;
                        const yPosition = window.innerHeight / 2 + Math.sin(idx * 0.8) * 150;

                        return (
                            <div
                                key={idx}
                                data-topic-index={idx}
                                className="absolute"
                                style={{
                                    left: `${xPosition}px`,
                                    top: `${yPosition}px`,
                                    transform: 'translate(-50%, -50%)',
                                    transition: 'all 0.5s ease',
                                    zIndex: 10
                                }}
                            >
                                {/* Haunted Town Scene */}
                                <div className="relative">
                                    {/* Background decorations - lighter */}
                                    {idx % 3 === 0 && (
                                        <div className="absolute -left-12 -top-8 opacity-20">
                                            <TreeIcon className="w-12 h-24 text-gray-700" />
                                        </div>
                                    )}
                                    {idx % 4 === 0 && (
                                        <div className="absolute -right-12 -top-8 opacity-20">
                                            <SkeletonIcon className="w-8 h-16 text-gray-600" />
                                        </div>
                                    )}

                                    {/* Haunted Town Card - Simplified */}
                                    <div
                                        onClick={() => !isLocked && onSelectTopic(item.module, item.topic, idx)}
                                        className={`relative bg-gray-950/95 backdrop-blur-sm border-2 rounded-xl p-4 transition-all duration-300 w-64
                                            ${isLocked ? 'opacity-40 cursor-not-allowed border-gray-800' : 'cursor-pointer hover:scale-105'}
                                            ${isCurrent ? 'border-orange-500 shadow-[0_0_40px_rgba(234,88,12,0.6)] scale-105' : ''}
                                            ${isCompleted ? 'border-green-600 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'border-purple-800/50'}
                                        `}
                                    >
                                        {/* Status Badge */}
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            {isCompleted && (
                                                <div className="bg-green-700 text-white px-4 py-1 rounded-full text-xs font-creep flex items-center gap-1">
                                                    ✓ Cleared
                                                </div>
                                            )}
                                            {isCurrent && !isCompleted && (
                                                <div className="bg-orange-600 text-black px-4 py-1 rounded-full text-xs font-creep flex items-center gap-1 animate-bounce">
                                                    ⚔️ Current
                                                </div>
                                            )}
                                            {isLocked && (
                                                <div className="bg-gray-800 text-gray-400 px-4 py-1 rounded-full text-xs font-creep flex items-center gap-1">
                                                    🔒 Locked
                                                </div>
                                            )}
                                        </div>

                                        {/* Tombstone Icon */}
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="relative">
                                                <TombstoneIcon className={`w-20 h-32 transition-colors
                                                    ${isCompleted ? 'text-green-600' : ''}
                                                    ${isCurrent ? 'text-orange-500 animate-pulse' : ''}
                                                    ${isLocked ? 'text-gray-700' : 'text-purple-600'}
                                                `} />
                                                
                                                {/* Ghost on tombstone */}
                                                {!isLocked && (
                                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <GhostIcon className={`w-12 h-14 ${isCurrent ? 'text-red-500 animate-float' : 'text-purple-400'}`} />
                                                    </div>
                                                )}
                                                
                                                {/* Lock icon */}
                                                {isLocked && (
                                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                                                        🔒
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Topic Info */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-creep text-2xl text-orange-500">#{idx + 1}</span>
                                                <span className="text-xs text-purple-400 bg-purple-950/50 px-2 py-1 rounded">
                                                    Module {item.moduleIdx + 1}
                                                </span>
                                            </div>
                                            
                                            <h3 className={`font-serif text-xl font-bold transition-colors
                                                ${isLocked ? 'text-gray-600' : 'text-gray-200'}
                                            `}>
                                                {item.topic.title}
                                            </h3>
                                            
                                            <p className={`text-sm italic line-clamp-2
                                                ${isLocked ? 'text-gray-700' : 'text-gray-400'}
                                            `}>
                                                {item.topic.description}
                                            </p>
                                            
                                            <div className="pt-2 border-t border-purple-900/30">
                                                <p className="text-xs text-gray-600 font-creep">{item.module.title}</p>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        {!isLocked && (
                                            <div className="mt-4">
                                                <button className={`w-full py-2 rounded-lg font-creep text-sm transition-all
                                                    ${isCurrent ? 'bg-orange-600 text-black hover:bg-orange-500' : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'}
                                                `}>
                                                    {isCompleted ? '🔄 Replay' : '⚔️ Enter Crypt'}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Moon decoration for current topic */}
                                    {isCurrent && (
                                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 opacity-60">
                                            <MoonIcon className="w-12 h-12 text-yellow-100 animate-pulse" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* End of Path */}
                    {currentTopicIndex >= allTopics.length && (
                        <div className="text-center py-20">
                            <div className="animate-bounce mb-6">
                                <PumpkinIcon className="w-32 h-32 text-orange-500 mx-auto drop-shadow-[0_0_50px_rgba(255,165,0,1)]" />
                            </div>
                            <h2 className="font-drip text-5xl text-orange-500 mb-4">Journey Complete!</h2>
                            <p className="text-gray-300 font-serif text-xl mb-8">You've conquered all the crypts!</p>
                            <div className="flex items-center justify-center gap-3 text-3xl font-creep text-yellow-400">
                                <span>Total Souls:</span>
                                <PumpkinIcon className="w-10 h-10" />
                                <span>{souls}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
