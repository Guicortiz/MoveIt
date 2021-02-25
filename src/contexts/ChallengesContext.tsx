import challenges from '../../challenges.json'

import { createContext, ReactNode, useEffect, useState } from 'react';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number;
    levelUp: () => void;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children }) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);

    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completedChallenge() {
        setCurrentExperience(currentExperience + activeChallenge.amount)
        setChallengesCompleted(challengesCompleted + 1)
        setActiveChallenge(null);

    }

    function verifyLevelUp() {
        if (experienceToNextLevel < currentExperience) {
            levelUp();
        }
    }

    useEffect(() => { verifyLevelUp() }, [currentExperience])


    return (
        <ChallengesContext.Provider value={{
            level,
            levelUp,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completedChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    )
}