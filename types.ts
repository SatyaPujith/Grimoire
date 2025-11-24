export interface SubTopic {
    title: string;
    description: string;
    isCompleted?: boolean;
}

export interface Module {
    title: string;
    description: string;
    topics: SubTopic[];
}

export interface Curriculum {
    subject: string;
    modules: Module[];
}

export interface Encounter {
    monsterName: string; // e.g., "The Specter of Syntax"
    educationalContent: string; // The study material
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export interface TopicGameData {
    topic: string;
    encounters: Encounter[];
}

export enum AppState {
    LANDING = 'LANDING',
    GENERATING_CURRICULUM = 'GENERATING_CURRICULUM',
    CURRICULUM_VIEW = 'CURRICULUM_VIEW',
    BATTLE_ARENA = 'BATTLE_ARENA', // Replaces READING_CONTENT
}

export enum BattleState {
    READING = 'READING',
    QUIZ = 'QUIZ',
    VICTORY = 'VICTORY',
    LEVEL_COMPLETE = 'LEVEL_COMPLETE'
}