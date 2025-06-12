import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Curriculum, TopicGameData } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Schema for structure generation
const curriculumSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        subject: { type: Type.STRING, description: "The main topic requested by the user" },
        modules: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "Name of the module" },
                    description: { type: Type.STRING, description: "Short spooky description of what this module covers" },
                    topics: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "Specific topic title" },
                                description: { type: Type.STRING, description: "Brief overview" }
                            },
                            required: ["title", "description"]
                        }
                    }
                },
                required: ["title", "description", "topics"]
            }
        }
    },
    required: ["subject", "modules"]
};

const topicGameSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING },
        encounters: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    monsterName: { type: Type.STRING, description: "A spooky name for this concept, e.g. 'The Variable Vampire'" },
                    educationalContent: { type: Type.STRING, description: "2-3 paragraphs of study material explaining the concept. Use markdown." },
                    question: { type: Type.STRING, description: "A multiple choice question to test the user on the content." },
                    options: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "4 possible answers"
                    },
                    correctAnswerIndex: { type: Type.NUMBER, description: "The index (0-3) of the correct answer" }
                },
                required: ["monsterName", "educationalContent", "question", "options", "correctAnswerIndex"]
            }
        }
    },
    required: ["topic", "encounters"]
};

export const generateCurriculum = async (topic: string): Promise<Curriculum> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a comprehensive study curriculum for the topic: "${topic}". 
            Break it down into logical modules, and then into specific sub-topics. 
            The tone of the titles and descriptions should be slightly mysterious and halloween-themed (e.g., using words like 'unveiling', 'secrets', 'anatomy of', 'beware').`,
            config: {
                responseMimeType: "application/json",
                responseSchema: curriculumSchema,
                systemInstruction: "You are an ancient skeletal scholar who organizes knowledge into dark, forbidden tomes. You are helpful but use a spooky vocabulary."
            }
        });

        const text = response.text;
        if (!text) throw new Error("No text returned from Gemini");
        
        return JSON.parse(text) as Curriculum;
    } catch (error) {
        console.error("Failed to generate curriculum:", error);
        throw error;
    }
};

export const generateTopicContent = async (subject: string, moduleName: string, topicName: string): Promise<TopicGameData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a "Ghost Hunt" study level for the topic "${topicName}" (Subject: ${subject}, Module: ${moduleName}).
            
            Break the topic into 3-5 distinct "Encounters" (Key Concepts).
            For each encounter:
            1. Explain the concept clearly but maintain a spooky/mysterious tone (The "Educational Content").
            2. Provide a multiple-choice question to defeat the "Monster" representing this concept.
            
            The output must be valid JSON matching the schema.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: topicGameSchema,
                systemInstruction: "You are the Game Master of a haunted crypt. You turn educational concepts into monsters that must be defeated with knowledge."
            }
        });

        const text = response.text;
        if (!text) throw new Error("No text returned");
        return JSON.parse(text) as TopicGameData;
    } catch (error) {
        console.error("Failed to generate content:", error);
        // Fallback for demo purposes if API fails, though in prod we'd handle error UI
        throw error;
    }
};