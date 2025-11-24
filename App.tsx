import React, { useState, useEffect, useRef } from 'react';
import { generateCurriculum, generateTopicContent } from './services/geminiService';
import { AppState, Curriculum, Module, SubTopic, TopicGameData, BattleState } from './types';
import { SkullIcon, GhostIcon, SpiderWebIcon, ScrollIcon, BatIcon, PumpkinIcon, SwordIcon } from './components/SpookyIcons';
import ReactMarkdown from 'react-markdown';

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

const Card: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = "", noPadding = false }) => (
    <div className={`bg-gray-950/80 backdrop-blur-md border border-purple-900/50 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden ${className} ${noPadding ? '' : 'p-6'}`}>
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
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleSelectTopic = async (module: Module, topic: SubTopic) => {
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
            setBattleState(BattleState.VICTORY);
            setSouls(prev => prev + 10);
        } else {
            setIsWrongAnswer(true);
            setTimeout(() => setIsWrongAnswer(false), 500); // Shake animation duration
            setSouls(prev => Math.max(0, prev - 2)); // Penalty
        }
    };

    const nextEncounter = () => {
        if (!gameData) return;
        
        if (currentEncounterIndex < gameData.encounters.length - 1) {
            setCurrentEncounterIndex(prev => prev + 1);
            setBattleState(BattleState.READING);
        } else {
            setBattleState(BattleState.LEVEL_COMPLETE);
        }
    };

    // --- Views ---

    const renderLanding = () => (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
            <div className="animate-bounce mb-6 text-orange-600">
                <BatIcon className="w-24 h-24" />
            </div>
            <h1 className="font-drip text-6xl md:text-8xl text-red-700 mb-4 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] tracking-widest">
                GRIMOIRE
            </h1>
            <p className="font-serif text-purple-300 text-xl md:text-2xl mb-12 max-w-2xl italic border-b border-purple-900/50 pb-4">
                "Enter a subject, and we shall summon the forbidden knowledge..."
            </p>
            
            <div className="w-full max-w-md space-y-6">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <input
                        type="text"
                        value={topicInput}
                        onChange={(e) => setTopicInput(e.target.value)}
                        placeholder="e.g., Quantum Physics, Ancient Rome, React JS"
                        className="relative w-full bg-black text-orange-100 border-2 border-purple-900 rounded-lg p-4 text-lg focus:outline-none focus:border-orange-500 placeholder-purple-800/50 font-serif"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateCurriculum()}
                    />
                    <GhostIcon className="absolute right-4 top-4 w-6 h-6 text-purple-700 animate-pulse" />
                </div>
                
                <div className="flex justify-center">
                    <Button onClick={handleGenerateCurriculum} disabled={!topicInput.trim()}>
                        SUMMON KNOWLEDGE
                    </Button>
                </div>
            </div>
            
            {error && <p className="mt-8 text-red-500 font-creep text-xl">{error}</p>}
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

        return (
            <div className="min-h-screen p-6 md:p-12 z-10 w-full max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12 border-b border-purple-900/50 pb-6">
                    <div>
                        <h2 className="font-drip text-4xl md:text-5xl text-orange-600 mb-2">{curriculum.subject}</h2>
                        <p className="text-gray-400 italic">The Path of Shadows</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2 text-orange-400 font-creep text-2xl mr-4">
                            <PumpkinIcon className="w-8 h-8" />
                            <span>{souls}</span>
                        </div>
                        <Button onClick={handleReset} variant="secondary">Abandon Quest</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curriculum.modules.map((module, mIdx) => (
                        <Card key={mIdx} className="group hover:border-orange-700/50 transition-colors duration-500">
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="font-creep text-2xl text-purple-300 group-hover:text-purple-100 transition-colors">
                                    Module {mIdx + 1}: {module.title}
                                </h3>
                                <SkullIcon className="w-6 h-6 text-gray-700 group-hover:text-orange-600 transition-colors" />
                            </div>
                            <p className="text-gray-400 text-sm mb-6 border-l-2 border-purple-900 pl-3 italic">
                                {module.description}
                            </p>
                            
                            <ul className="space-y-3">
                                {module.topics.map((topic, tIdx) => (
                                    <li key={tIdx}>
                                        <button 
                                            onClick={() => handleSelectTopic(module, topic)}
                                            className="w-full text-left p-3 rounded bg-black/40 hover:bg-orange-900/20 border border-transparent hover:border-orange-800/50 transition-all flex items-center gap-3 group/item"
                                        >
                                            <span className="text-orange-800 group-hover/item:text-orange-500 font-creep text-xl">
                                                {tIdx + 1}.
                                            </span>
                                            <div className="flex-1">
                                                <span className="text-gray-300 font-serif block group-hover/item:text-white">
                                                    {topic.title}
                                                </span>
                                            </div>
                                            <SwordIcon className="w-4 h-4 text-gray-600 group-hover/item:text-orange-400" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
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
            <div className={`min-h-screen flex flex-col items-center justify-between p-4 z-10 w-full max-w-5xl mx-auto transition-colors duration-300 ${isWrongAnswer ? 'bg-red-900/20' : ''}`}>
                
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
                    {/* Scene Background Elements */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                        <div className="w-[600px] h-[600px] bg-gradient-radial from-purple-900/30 to-transparent rounded-full blur-3xl"></div>
                    </div>

                    {battleState === BattleState.LEVEL_COMPLETE ? (
                        <div className="text-center animate-bounce">
                             <PumpkinIcon className="w-40 h-40 text-orange-500 mx-auto mb-6 drop-shadow-[0_0_50px_rgba(255,165,0,0.5)]" />
                             <h2 className="font-drip text-6xl text-orange-500 mb-4">CRYPT CLEARED!</h2>
                             <p className="font-serif text-2xl text-gray-300 mb-8">You have banished the ignorance lurking here.</p>
                             <Button onClick={handleBackToCurriculum} variant="primary">Return to Map</Button>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* The Monster */}
                            <div className={`transition-all duration-500 transform 
                                ${battleState === BattleState.VICTORY ? 'scale-150 opacity-0 filter blur-xl animate-dissolve' : 'scale-100 animate-float'}
                                ${isWrongAnswer ? 'animate-shake' : ''}
                            `}>
                                <GhostIcon className={`w-64 h-64 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] 
                                    ${battleState === BattleState.VICTORY ? 'text-orange-500' : 'text-purple-200'}
                                `} />
                            </div>
                            
                            {battleState !== BattleState.VICTORY && (
                                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center w-full">
                                    <h3 className="font-creep text-3xl text-red-500 drop-shadow-md whitespace-nowrap">{encounter.monsterName}</h3>
                                    <p className="text-xs text-purple-400 uppercase tracking-widest font-bold">Lvl {currentEncounterIndex + 1} Spirit</p>
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
                                <h3 className="text-2xl font-serif text-white mb-6 text-center border-b border-purple-800/30 pb-4">
                                    {encounter.question}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                    {encounter.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(idx)}
                                            className="p-4 rounded-lg border-2 border-purple-900/50 bg-black/40 hover:bg-purple-900/20 hover:border-purple-500 text-left text-lg text-gray-300 transition-all font-serif flex items-center gap-3 group"
                                        >
                                            <span className="w-8 h-8 rounded-full border border-purple-700 flex items-center justify-center text-purple-500 group-hover:bg-purple-700 group-hover:text-white transition-colors">
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {battleState === BattleState.VICTORY && (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-green-900/10">
                                <h3 className="font-drip text-5xl text-orange-500 mb-2 animate-bounce">BANISHED!</h3>
                                <div className="flex items-center gap-2 text-3xl font-creep text-yellow-500 mb-8 animate-pulse">
                                    <span>+10</span> <PumpkinIcon className="w-8 h-8" />
                                </div>
                                <p className="text-gray-400 italic mb-8 font-serif">The spirit screams as it fades into the void...</p>
                                <Button onClick={nextEncounter}>
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
                {/* Graveyard ground fog */}
                {state === AppState.BATTLE_ARENA && (
                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                )}
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none opacity-20"></div>
            </div>

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