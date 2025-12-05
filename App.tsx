import React, { useState, useEffect, useRef } from 'react';
import { generateCurriculum, generateTopicContent } from './services/geminiService';
import { AppState, Curriculum, Module, SubTopic, TopicGameData, BattleState } from './types';
import { SkullIcon, GhostIcon, SpiderWebIcon, ScrollIcon, BatIcon, PumpkinIcon, SwordIcon, TombstoneIcon, SkeletonIcon, TreeIcon, MoonIcon, FenceIcon } from './components/SpookyIcons';
import ReactMarkdown from 'react-markdown';
import { CurriculumPath } from './CurriculumPath';
import { BattleAnimation } from './BattleAnimation';

// --- Helper Components ---

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean; variant?: 'primary' | 'secondary' | 'danger'; className?: string }> = ({ onClick, children, disabled, variant = 'primary', className = '' }) => {
    const baseClasses = "relative px-6 py-3 font-creep tracking-wider text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group border-2 flex items-center justify-center gap-2";
    
    let colorClasses = "";
    if (variant === 'primary') {
        colorClasses = "bg-orange-700 text-black border-orange-600 hover:bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.5)]";
    } else if (variant === 'secondary') {
        colorClasses = "bg-transparent text-purple-400 border-purple-600 hover:bg-purple-900/30 hover:shadow-[0_0_15px_rgba(147,51,234,0.4)]";
    } else if (variant === 'danger') {
        colorClasses = "bg-red-900/50 text-red-200 border-red-600 hover:bg-red-800 shadow-[0_0_20px_rgba(220,38,38,0.5)]";
    }

    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClasses} ${colorClasses} rounded-lg ${className}`}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {/* Blood drip effect on hover */}
            {variant === 'primary' && <div className="absolute top-0 left-0 w-full h-full bg-red-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />}
        </button>
    );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean; onClick?: () => void }> = ({ children, className = "", noPadding = false, onClick }) => (
    <div 
        className={`bg-gray-950/80 backdrop-blur-md border border-purple-900/50 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden ${className} ${noPadding ? '' : 'p-6'}`}
        onClick={onClick}
    >
        <div className="absolute top-0 right-0 text-gray-800 opacity-30 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <SpiderWebIcon className="w-32 h-32" />
        </div>
        {children}
    </div>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [state, setState] = useState<AppState>(AppState.LANDING);
    const [topicInput, setTopicInput] = useState('');
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<SubTopic | null>(null);
    
    // Battle State
    const [gameData, setGameData] = useState<TopicGameData | null>(null);
    const [battleState, setBattleState] = useState<BattleState>(BattleState.READING);
    const [currentEncounterIndex, setCurrentEncounterIndex] = useState(0);
    const [souls, setSouls] = useState(0);
    const [isWrongAnswer, setIsWrongAnswer] = useState(false);
    const [showJumpScare, setShowJumpScare] = useState(false);
    const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
    const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Random Jump Scare Effect with Real Ghost Scream Sound
    useEffect(() => {
        if (state === AppState.BATTLE_ARENA && battleState === BattleState.READING) {
            const randomDelay = Math.random() * 8000 + 5000; // Random between 5-13 seconds
            const timer = setTimeout(() => {
                // Play real ghost scream sound
                const screamAudio = new Audio('/sounds/ghost-scream.mp3');
                screamAudio.volume = 0.8;
                screamAudio.play().catch(err => console.log('Audio play failed:', err));
                
                setShowJumpScare(true);
                setTimeout(() => setShowJumpScare(false), 2000);
            }, randomDelay);
            return () => clearTimeout(timer);
        }
    }, [state, battleState, currentEncounterIndex]);

    // Ambient scary background music
    useEffect(() => {
        let ambientAudio: HTMLAudioElement | null = null;
        
        if (state === AppState.BATTLE_ARENA || state === AppState.CURRICULUM_VIEW) {
            ambientAudio = new Audio('/sounds/ambient-scary.mp3');
            ambientAudio.loop = true;
            ambientAudio.volume = 0.3;
            ambientAudio.play().catch(err => console.log('Ambient audio play failed:', err));
        }
        
        return () => {
            if (ambientAudio) {
                ambientAudio.pause();
                ambientAudio.currentTime = 0;
            }
        };
    }, [state]);

    const handleGenerateCurriculum = async () => {
        if (!topicInput.trim()) return;
        
        setIsLoading(true);
        setState(AppState.GENERATING_CURRICULUM);
        setError(null);
        
        try {
            const result = await generateCurriculum(topicInput);
            setCurriculum(result);
            setState(AppState.CURRICULUM_VIEW);
        } catch (err) {
            setError("The spirits failed to summon the curriculum. Try again...");
            setState(AppState.LANDING);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTopic = async (module: Module, topic: SubTopic, topicIndex: number) => {
        // Only allow if it's the current unlocked topic
        if (topicIndex !== currentTopicIndex) return;
        
        setSelectedModule(module);
        setSelectedTopic(topic);
        setIsLoading(true);
        setGameData(null);
        setBattleState(BattleState.READING);
        setCurrentEncounterIndex(0);
        setIsWrongAnswer(false);
        setState(AppState.BATTLE_ARENA);

        try {
            const data = await generateTopicContent(curriculum?.subject || "", module.title, topic.title);
            setGameData(data);
        } catch (err) {
            setError("The crypt is sealed... could not load game.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToCurriculum = () => {
        setState(AppState.CURRICULUM_VIEW);
        setGameData(null);
    };

    const handleReset = () => {
        setState(AppState.LANDING);
        setTopicInput('');
        setCurriculum(null);
        setSouls(0);
    };

    // Battle Logic
    const startQuiz = () => {
        setBattleState(BattleState.QUIZ);
    };

    const handleAnswer = (index: number) => {
        if (!gameData) return;
        
        const currentEncounter = gameData.encounters[currentEncounterIndex];
        
        if (index === currentEncounter.correctAnswerIndex) {
            // Show epic 10-second victory animation
            setShowVictoryAnimation(true);
            setTimeout(() => {
                setBattleState(BattleState.VICTORY);
                setSouls(prev => prev + 10);
                setShowVictoryAnimation(false);
            }, 10000); // 10 second battle animation
        } else {
            setIsWrongAnswer(true);
            setTimeout(() => setIsWrongAnswer(false), 500);
            setSouls(prev => Math.max(0, prev - 2));
        }
    };

    const nextEncounter = () => {
        if (!gameData) return;
        
        if (currentEncounterIndex < gameData.encounters.length - 1) {
            setCurrentEncounterIndex(prev => prev + 1);
            setBattleState(BattleState.READING);
        } else {
            // Mark topic as completed
            setCompletedTopics(prev => new Set([...prev, currentTopicIndex]));
            setCurrentTopicIndex(prev => prev + 1);
            setBattleState(BattleState.LEVEL_COMPLETE);
        }
    };

    // --- Views ---

    const renderLanding = () => (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
            {/* Graveyard Landing Scene */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Large Moon */}
                <div className="absolute top-10 right-20 opacity-70">
                    <MoonIcon className="w-40 h-40 text-yellow-100 animate-pulse" />
                </div>
                
                {/* Tombstones */}
                <div className="absolute bottom-20 left-[10%] opacity-40 animate-float" style={{ animationDuration: '4s' }}>
                    <TombstoneIcon className="w-20 h-32 text-gray-600" />
                </div>
                <div className="absolute bottom-16 right-[15%] opacity-40 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                    <TombstoneIcon className="w-24 h-36 text-gray-600" />
                </div>
                <div className="absolute bottom-24 left-[70%] opacity-30 animate-float" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
                    <TombstoneIcon className="w-16 h-24 text-gray-600" />
                </div>
                
                {/* Skeletons */}
                <div className="absolute bottom-12 left-[25%] opacity-50 animate-float" style={{ animationDuration: '6s' }}>
                    <SkeletonIcon className="w-16 h-32 text-gray-500" />
                </div>
                <div className="absolute bottom-16 right-[35%] opacity-50 animate-float" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>
                    <SkeletonIcon className="w-20 h-40 text-gray-500" />
                </div>
                
                {/* Dead Trees */}
                <div className="absolute bottom-0 left-0 opacity-30">
                    <TreeIcon className="w-32 h-64 text-gray-700" />
                </div>
                <div className="absolute bottom-0 right-0 opacity-30">
                    <TreeIcon className="w-40 h-80 text-gray-700" />
                </div>
            </div>
            
            {/* Floating Bats */}
            <div className="absolute top-10 left-10 animate-bounce text-orange-600 opacity-50 z-10" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                <BatIcon className="w-12 h-12" />
            </div>
            <div className="absolute top-20 right-20 animate-bounce text-orange-600 opacity-50 z-10" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                <BatIcon className="w-16 h-16" />
            </div>
            <div className="absolute bottom-32 left-32 animate-bounce text-orange-600 opacity-50 z-10" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
                <BatIcon className="w-10 h-10" />
            </div>
            
            <div className="animate-bounce mb-6 text-orange-600 z-10">
                <BatIcon className="w-24 h-24" />
            </div>
            <h1 className="font-drip text-6xl md:text-8xl text-red-700 mb-4 drop-shadow-[0_0_30px_rgba(255,0,0,1)] tracking-widest animate-pulse z-10">
                GRIMOIRE
            </h1>
            <p className="font-serif text-purple-300 text-xl md:text-2xl mb-12 max-w-2xl italic border-b border-purple-900/50 pb-4 z-10">
                "Enter a subject, and we shall summon the forbidden knowledge from the graveyard..."
            </p>
            
            <div className="w-full max-w-md space-y-6 z-10">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <input
                        type="text"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="e.g., Quantum Physics, Ancient Rome, React JS"
                        className="relative w-full bg-black text-orange-100 border-2 border-purple-900 rounded-lg p-4 text-lg focus:outline-none focus:border-orange-500 placeholder-purple-800/50 font-serif shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateCurriculum()}
                    />
                    <GhostIcon className="absolute right-4 top-4 w-8 h-10 text-purple-700 animate-pulse" />
                </div>
                
                <div className="flex justify-center">
                    <Button onClick={handleGenerateCurriculum} disabled={!topicInput.trim()}>
                        <SkullIcon className="w-6 h-6" />
                        SUMMON KNOWLEDGE
                    </Button>
                </div>
            </div>
            
            {error && <p className="mt-8 text-red-500 font-creep text-xl animate-pulse z-10">{error}</p>}
        </div>
    );

    const renderLoading = (message: string) => (
        <div className="flex flex-col items-center justify-center min-h-screen z-10">
            <div className="relative w-32 h-32 mb-8">
                <SkullIcon className="w-32 h-32 text-gray-700 animate-pulse absolute top-0 left-0" />
                <div className="absolute top-0 left-0 w-full h-full border-t-4 border-orange-600 rounded-full animate-spin"></div>
            </div>
            <h2 className="font-drip text-3xl text-orange-500 text-center animate-pulse">{message}</h2>
            <p className="mt-4 text-purple-400 font-serif italic">The darkness whispers...</p>
        </div>
    );

    const renderCurriculum = () => {
        if (!curriculum) return null;

        // Calculate total topics for path positioning
        const allTopics: Array<{ module: Module; topic: SubTopic; moduleIdx: number; topicIdx: number }> = [];
        curriculum.modules.forEach((module, mIdx) => {
            module.topics.forEach((topic, tIdx) => {
                allTopics.push({ module, topic, moduleIdx: mIdx, topicIdx: tIdx });
            });
        });

        return (
            <CurriculumPath
                allTopics={allTopics}
                currentTopicIndex={currentTopicIndex}
                completedTopics={completedTopics}
                souls={souls}
                onSelectTopic={handleSelectTopic}
                onReset={handleReset}
                subject={curriculum.subject}
            />
        );
    };

    const renderCurriculumOld = () => {
        if (!curriculum) return null;

        const allTopics: Array<{ module: Module; topic: SubTopic; moduleIdx: number; topicIdx: number }> = [];
        curriculum.modules.forEach((module, mIdx) => {
            module.topics.forEach((topic, tIdx) => {
                allTopics.push({ module, topic, moduleIdx: mIdx, topicIdx: tIdx });
            });
        });

        return (
            <div className="min-h-screen p-6 md:p-12 z-10 w-full relative overflow-hidden">
                {/* Graveyard Background Elements */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    {/* Moon */}
                    <div className="absolute top-10 right-20 opacity-80">
                        <MoonIcon className="w-32 h-32 text-yellow-200" />
                    </div>
                    
                    {/* Dead Trees */}
                    <div className="absolute bottom-0 left-10 opacity-40">
                        <TreeIcon className="w-24 h-48 text-gray-700" />
                    </div>
                    <div className="absolute bottom-0 right-32 opacity-40">
                        <TreeIcon className="w-32 h-64 text-gray-700" />
                    </div>
                    <div className="absolute bottom-0 left-1/3 opacity-30">
                        <TreeIcon className="w-20 h-40 text-gray-700" />
                    </div>
                    
                    {/* Fence */}
                    <div className="absolute bottom-0 left-0 w-full opacity-30">
                        <FenceIcon className="w-full h-24 text-gray-600" />
                    </div>
                    
                    {/* Random Tombstones */}
                    <div className="absolute bottom-20 left-[15%] opacity-50 animate-float" style={{ animationDuration: '4s' }}>
                        <TombstoneIcon className="w-16 h-24 text-gray-600" />
                    </div>
                    <div className="absolute bottom-32 right-[20%] opacity-50 animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                        <TombstoneIcon className="w-20 h-28 text-gray-600" />
                    </div>
                    <div className="absolute bottom-24 left-[60%] opacity-50 animate-float" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
                        <TombstoneIcon className="w-14 h-20 text-gray-600" />
                    </div>
                    
                    {/* Skeletons */}
                    <div className="absolute bottom-16 left-[25%] opacity-40 animate-float" style={{ animationDuration: '6s' }}>
                        <SkeletonIcon className="w-12 h-24 text-gray-500" />
                    </div>
                    <div className="absolute bottom-20 right-[35%] opacity-40 animate-float" style={{ animationDuration: '5.5s', animationDelay: '2s' }}>
                        <SkeletonIcon className="w-16 h-32 text-gray-500" />
                    </div>
                </div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-center mb-12 border-b border-purple-900/50 pb-6">
                    <div>
                        <h2 className="font-drip text-4xl md:text-5xl text-orange-600 mb-2 drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]">
                            {curriculum.subject}
                        </h2>
                        <p className="text-gray-400 italic font-serif text-xl">Journey Through the Graveyard of Knowledge</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2 text-orange-400 font-creep text-2xl mr-4 bg-black/60 px-4 py-2 rounded-full border border-orange-800">
                            <PumpkinIcon className="w-8 h-8 animate-pulse" />
                            <span>{souls}</span>
                        </div>
                        <Button onClick={handleReset} variant="secondary">
                            <SkullIcon className="w-5 h-5" />
                            Abandon Quest
                        </Button>
                    </div>
                </div>

                {/* Path-based Layout */}
                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <svg className="w-full h-auto" viewBox="0 0 1200 800" style={{ minHeight: '600px' }}>
                        {/* Draw winding path */}
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        
                        {/* Winding graveyard path */}
                        <path
                            d="M 100 700 Q 200 650 300 600 T 500 500 T 700 400 T 900 300 T 1100 200"
                            stroke="#4a1d7a"
                            strokeWidth="40"
                            fill="none"
                            opacity="0.3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 100 700 Q 200 650 300 600 T 500 500 T 700 400 T 900 300 T 1100 200"
                            stroke="#7c3aed"
                            strokeWidth="20"
                            fill="none"
                            opacity="0.5"
                            strokeLinecap="round"
                            strokeDasharray="10,10"
                            className="animate-pulse"
                        />
                        
                        {/* Place topics along the path */}
                        {allTopics.map((item, idx) => {
                            // Calculate position along the path
                            const t = idx / (allTopics.length - 1);
                            const x = 100 + t * 1000;
                            const y = 700 - Math.sin(t * Math.PI * 2) * 200 - t * 500;
                            
                            return (
                                <g key={idx} transform={`translate(${x}, ${y})`}>
                                    {/* Tombstone marker */}
                                    <rect
                                        x="-40"
                                        y="-60"
                                        width="80"
                                        height="100"
                                        rx="40"
                                        fill="#1a1a2e"
                                        stroke="#7c3aed"
                                        strokeWidth="3"
                                        className="cursor-pointer hover:fill-purple-900 transition-all"
                                        filter="url(#glow)"
                                        onClick={() => handleSelectTopic(item.module, item.topic, idx)}
                                    />
                                    
                                    {/* Ghost icon on tombstone */}
                                    <circle cx="0" cy="-30" r="15" fill="#9333ea" opacity="0.8" className="animate-pulse" />
                                    <text
                                        x="0"
                                        y="-25"
                                        textAnchor="middle"
                                        fontSize="20"
                                        fill="white"
                                        className="font-creep"
                                    >
                                        👻
                                    </text>
                                    
                                    {/* Topic number */}
                                    <text
                                        x="0"
                                        y="0"
                                        textAnchor="middle"
                                        fontSize="24"
                                        fill="#f97316"
                                        className="font-creep"
                                    >
                                        {idx + 1}
                                    </text>
                                    
                                    {/* Module indicator */}
                                    <text
                                        x="0"
                                        y="20"
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill="#a855f7"
                                        className="font-serif"
                                    >
                                        M{item.moduleIdx + 1}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                    
                    {/* Topic Details Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allTopics.map((item, idx) => (
                            <Card 
                                key={idx} 
                                className="group hover:border-orange-700/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                                onClick={() => handleSelectTopic(item.module, item.topic, idx)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="font-creep text-3xl text-orange-500">#{idx + 1}</span>
                                        <TombstoneIcon className="w-8 h-12 text-gray-600 group-hover:text-purple-500 transition-colors" />
                                    </div>
                                    <div className="text-xs text-purple-400 bg-purple-950/50 px-2 py-1 rounded">
                                        Module {item.moduleIdx + 1}
                                    </div>
                                </div>
                                
                                <h3 className="font-serif text-lg text-gray-200 group-hover:text-white transition-colors mb-2">
                                    {item.topic.title}
                                </h3>
                                
                                <p className="text-gray-500 text-sm italic mb-4 line-clamp-2">
                                    {item.topic.description}
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-600 font-creep">{item.module.title}</span>
                                    <div className="flex items-center gap-2 text-orange-600 group-hover:text-orange-400 transition-colors">
                                        <SwordIcon className="w-5 h-5" />
                                        <span className="text-sm font-creep">Hunt</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderBattleArena = () => {
        if (!gameData && !isLoading) return null;

        if (isLoading) {
            return renderLoading("Entering the Crypt...");
        }

        const encounter = gameData!.encounters[currentEncounterIndex];
        const progressPercent = ((currentEncounterIndex + 1) / gameData!.encounters.length) * 100;

        return (
            <div className={`min-h-screen flex flex-col items-center justify-between p-4 z-10 w-full max-w-5xl mx-auto transition-all duration-300 ${isWrongAnswer ? 'bg-red-900/30 animate-shake' : ''}`}>
                
                {/* Header / Stats */}
                <div className="w-full flex justify-between items-center mb-4">
                    <Button onClick={handleBackToCurriculum} variant="secondary">
                         Retreat
                    </Button>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-black/60 rounded-full border border-purple-800 flex items-center gap-2">
                            <span className="text-purple-400 font-creep">Progress</span>
                            <div className="w-32 h-3 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-black/60 rounded-full border border-orange-800 flex items-center gap-2 text-orange-500 font-creep text-xl animate-pulse">
                            <PumpkinIcon className="w-6 h-6" />
                            {souls}
                        </div>
                    </div>
                </div>

                {/* Main Battle Area */}
                <div className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[400px]">
                    {/* Graveyard Battle Scene */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Moonlight */}
                        <div className="absolute top-0 right-20 opacity-60">
                            <MoonIcon className="w-24 h-24 text-yellow-100 animate-pulse" />
                        </div>
                        
                        {/* Tombstones in background */}
                        <div className="absolute bottom-10 left-[10%] opacity-40">
                            <TombstoneIcon className="w-16 h-24 text-gray-700" />
                        </div>
                        <div className="absolute bottom-10 right-[15%] opacity-40">
                            <TombstoneIcon className="w-20 h-28 text-gray-700" />
                        </div>
                        <div className="absolute bottom-10 left-[70%] opacity-30">
                            <TombstoneIcon className="w-12 h-20 text-gray-700" />
                        </div>
                        
                        {/* Dead trees */}
                        <div className="absolute bottom-0 left-0 opacity-30">
                            <TreeIcon className="w-20 h-40 text-gray-800" />
                        </div>
                        <div className="absolute bottom-0 right-0 opacity-30">
                            <TreeIcon className="w-24 h-48 text-gray-800" />
                        </div>
                        
                        {/* Eerie glow */}
                        <div className="w-[600px] h-[600px] bg-gradient-radial from-purple-900/30 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    {battleState === BattleState.LEVEL_COMPLETE ? (
                        <div className="text-center">
                            {/* Celebration Effects */}
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute w-4 h-4 bg-orange-500 rounded-full animate-bounce opacity-70"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                            animationDelay: `${Math.random() * 2}s`,
                                            animationDuration: `${1 + Math.random() * 2}s`
                                        }}
                                    />
                                ))}
                            </div>
                            
                            <div className="animate-bounce">
                                <PumpkinIcon className="w-40 h-40 text-orange-500 mx-auto mb-6 drop-shadow-[0_0_80px_rgba(255,165,0,1)] animate-pulse" />
                            </div>
                            <h2 className="font-drip text-6xl text-orange-500 mb-4 drop-shadow-[0_0_30px_rgba(255,165,0,1)]">CRYPT CLEARED!</h2>
                            <p className="font-serif text-2xl text-gray-300 mb-4">You have banished the ignorance lurking here.</p>
                            <div className="flex items-center justify-center gap-3 text-4xl font-creep text-yellow-400 mb-8 animate-pulse">
                                <span>Total Souls Collected:</span>
                                <PumpkinIcon className="w-10 h-10" />
                                <span>{souls}</span>
                            </div>
                            <Button onClick={handleBackToCurriculum} variant="primary">
                                <SkullIcon className="w-6 h-6" />
                                Return to Map
                            </Button>
                        </div>
                    ) : (
                        <div className="relative z-10">
                            {/* The Monster - More Terrifying */}
                            <div className={`transition-all duration-500 transform relative
                                ${battleState === BattleState.VICTORY ? 'scale-150 opacity-0 filter blur-xl animate-dissolve' : 'scale-100 animate-float'}
                                ${isWrongAnswer ? 'animate-shake' : ''}
                            `}>
                                {/* Main Ghost with enhanced effects */}
                                <div className="relative">
                                    <GhostIcon className={`w-80 h-96 drop-shadow-[0_0_80px_rgba(147,51,234,1)] 
                                        ${battleState === BattleState.VICTORY ? 'text-orange-500' : 'text-gray-300'}
                                        ${isWrongAnswer ? 'text-red-600' : ''}
                                        transition-all duration-300
                                    `} />
                                    
                                    {/* Glowing aura layers */}
                                    {battleState !== BattleState.VICTORY && (
                                        <>
                                            <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '2s' }}></div>
                                            <div className="absolute inset-0 bg-red-600/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                                            
                                            {/* Floating particles around ghost */}
                                            {[...Array(8)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-2 h-2 bg-purple-400 rounded-full animate-float"
                                                    style={{
                                                        left: `${20 + Math.random() * 60}%`,
                                                        top: `${20 + Math.random() * 60}%`,
                                                        animationDuration: `${2 + Math.random() * 2}s`,
                                                        animationDelay: `${Math.random() * 2}s`,
                                                        opacity: 0.6
                                                    }}
                                                />
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            {battleState !== BattleState.VICTORY && (
                                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-full">
                                    <h3 className="font-creep text-4xl text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,1)] whitespace-nowrap animate-pulse mb-2">
                                        {encounter.monsterName}
                                    </h3>
                                    <p className="text-sm text-purple-300 uppercase tracking-widest font-bold mb-3">
                                        💀 Lvl {currentEncounterIndex + 1} Vengeful Spirit 💀
                                    </p>
                                    
                                    {/* Enhanced Health Bar */}
                                    <div className="w-64 mx-auto">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Cursed Energy</span>
                                            <span>100%</span>
                                        </div>
                                        <div className="h-3 bg-gray-900 rounded-full overflow-hidden border-2 border-red-900 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                                            <div className="h-full bg-gradient-to-r from-red-700 via-red-500 to-red-700 animate-pulse relative" style={{ width: '100%' }}>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* The Grimoire (Control Panel) */}
                {battleState !== BattleState.LEVEL_COMPLETE && (
                    <Card className="w-full mt-8 min-h-[300px] max-h-[40vh] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.8)] border-t-4 border-t-purple-900" noPadding>
                        
                        {battleState === BattleState.READING && (
                            <div className="flex flex-col h-full">
                                <div className="bg-purple-950/50 p-4 border-b border-purple-800/50 flex justify-between items-center">
                                    <h3 className="font-creep text-2xl text-purple-300">Grimoire: {encounter.monsterName}</h3>
                                    <span className="text-xs text-purple-500 font-serif italic">Read the spell carefully...</span>
                                </div>
                                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                                    <div className="prose prose-invert prose-lg max-w-none prose-p:font-serif prose-headings:font-creep prose-headings:text-orange-600">
                                        <ReactMarkdown>{encounter.educationalContent}</ReactMarkdown>
                                    </div>
                                </div>
                                <div className="p-4 bg-black/40 border-t border-purple-800/50 flex justify-center">
                                    <Button onClick={startQuiz} className="w-full md:w-auto">
                                        <SwordIcon className="w-6 h-6" />
                                        Cast Banishing Ritual
                                    </Button>
                                </div>
                            </div>
                        )}

                        {battleState === BattleState.QUIZ && (
                            <div className="flex flex-col h-full p-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <SkullIcon className="w-8 h-8 text-red-500 animate-pulse" />
                                    <h3 className="text-2xl font-serif text-white text-center">
                                        {encounter.question}
                                    </h3>
                                    <SkullIcon className="w-8 h-8 text-red-500 animate-pulse" />
                                </div>
                                <p className="text-center text-purple-400 text-sm mb-6 italic">Choose wisely... or face the consequences</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                    {encounter.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="p-4 rounded-lg border-2 border-purple-900/50 bg-black/40 hover:bg-purple-900/30 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] text-left text-lg text-gray-300 transition-all font-serif flex items-center gap-3 group transform hover:scale-105 active:scale-95"
                                        >
                                            <span className="w-8 h-8 rounded-full border-2 border-purple-700 flex items-center justify-center text-purple-500 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all font-creep">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {battleState === BattleState.VICTORY && (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-t from-green-900/20 to-transparent relative overflow-hidden">
                                {/* Victory Particles */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(15)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                                animationDelay: `${Math.random()}s`,
                                                animationDuration: `${0.5 + Math.random()}s`
                                            }}
                                        />
                                    ))}
                                </div>
                                
                                <h3 className="font-drip text-5xl text-orange-500 mb-2 animate-bounce drop-shadow-[0_0_20px_rgba(234,88,12,1)]">BANISHED!</h3>
                                <div className="flex items-center gap-2 text-3xl font-creep text-yellow-500 mb-4 animate-pulse">
                                    <span>+10</span> <PumpkinIcon className="w-8 h-8" />
                                </div>
                                <p className="text-gray-400 italic mb-2 font-serif text-lg">The spirit screams as it fades into the void...</p>
                                <p className="text-purple-400 text-sm mb-8 font-creep">Your knowledge grows stronger!</p>
                                <Button onClick={nextEncounter}>
                                    <SwordIcon className="w-6 h-6" />
                                    Hunt Next Spirit →
                                </Button>
                            </div>
                        )}

                    </Card>
                )}
            </div>
        );
    };

    // --- Background & Layout ---

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-gray-200 selection:bg-orange-900 selection:text-white">
            {/* Foggy Background Effect */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-red-900/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
                
                {/* Floating Background Ghosts */}
                {state === AppState.BATTLE_ARENA && (
                    <>
                        <div className="absolute top-[20%] left-0 opacity-20 animate-float-across" style={{ animationDelay: '0s' }}>
                            <GhostIcon className="w-16 h-16 text-purple-400" />
                        </div>
                        <div className="absolute top-[60%] left-0 opacity-20 animate-float-across" style={{ animationDelay: '7s' }}>
                            <GhostIcon className="w-20 h-20 text-blue-400" />
                        </div>
                        <div className="absolute top-[40%] left-0 opacity-15 animate-float-across" style={{ animationDelay: '14s' }}>
                            <GhostIcon className="w-12 h-12 text-gray-400" />
                        </div>
                    </>
                )}
                
                {/* Graveyard ground fog */}
                {state === AppState.BATTLE_ARENA && (
                    <>
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 w-[200%] h-32 bg-gradient-to-t from-purple-900/30 to-transparent opacity-60 animate-fog"></div>
                    </>
                )}
                
                {/* Blood Drips (random positions) */}
                {state === AppState.BATTLE_ARENA && isWrongAnswer && (
                    <>
                        <div className="absolute top-0 left-[20%] w-2 h-8 bg-red-600 animate-blood-drip" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute top-0 left-[50%] w-2 h-8 bg-red-600 animate-blood-drip" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute top-0 left-[80%] w-2 h-8 bg-red-600 animate-blood-drip" style={{ animationDelay: '0.4s' }}></div>
                    </>
                )}
                
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
            </div>

            {/* REAL Ghost Video Jump Scare */}
            {showJumpScare && (
                <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-black">
                    {/* Real ghost video rushing towards user */}
                    <video
                        autoPlay
                        muted={false}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            animation: 'ghostRush 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                            filter: 'contrast(1.5) brightness(0.9)'
                        }}
                        onEnded={() => setShowJumpScare(false)}
                    >
                        <source src="/videos/ghost-jumpscare.mp4" type="video/mp4" />
                        <source src="/videos/ghost-jumpscare.webm" type="video/webm" />
                    </video>
                    
                    {/* Screen shake */}
                    <div className="absolute inset-0 animate-shake"></div>
                    
                    {/* Dark vignette */}
                    <div className="absolute inset-0 shadow-[inset_0_0_300px_150px_rgba(0,0,0,0.95)]"></div>
                </div>
            )}
            
            <style>{`
                @keyframes ghostRush {
                    0% {
                        transform: scale(0.05) translateZ(-2000px);
                        opacity: 0;
                        filter: blur(20px);
                    }
                    30% {
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(2) translateZ(100px);
                        opacity: 1;
                        filter: blur(0);
                    }
                }
                
                @keyframes hairWave {
                    0%, 100% {
                        transform: translateX(0) rotate(var(--rotation, 0deg));
                    }
                    50% {
                        transform: translateX(10px) rotate(calc(var(--rotation, 0deg) + 5deg));
                    }
                }
            `}</style>

            {/* Epic 10-Second Battle Animation */}
            {showVictoryAnimation && (
                <BattleAnimation onComplete={() => {
                    setBattleState(BattleState.VICTORY);
                    setSouls(prev => prev + 10);
                    setShowVictoryAnimation(false);
                }} />
            )}

            <main className="relative z-10">
                {state === AppState.LANDING && renderLanding()}
                {state === AppState.GENERATING_CURRICULUM && renderLoading("Summoning Curriculum...")}
                {state === AppState.CURRICULUM_VIEW && renderCurriculum()}
                {state === AppState.BATTLE_ARENA && renderBattleArena()}
            </main>
        </div>
    );
};

export default App;