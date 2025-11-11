import { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import SetSelector from './components/SetSelector';
import SpellingPractice from './components/SpellingPractice';
import WordListManager from './components/WordListManager';

// Default word sets
const defaultWordSets = [
    {
        id: 1,
        name: 'Week 1 - Long Vowels',
        words: ['cake', 'bike', 'home', 'cute', 'pete']
    },
    {
        id: 2,
        name: 'Week 2 - Short Vowels',
        words: ['cat', 'dog', 'sit', 'hop', 'bug']
    }
];

export default function App() {
    const [screen, setScreen] = useState('home'); // 'home', 'selectSet', 'practice', 'manage'
    const [selectedMode, setSelectedMode] = useState(null); // 'practice', 'quiz', 'test'
    const [selectedSet, setSelectedSet] = useState(null);
    const [wordSets, setWordSets] = useState(() => {
        const saved = localStorage.getItem('wordSets');
        return saved ? JSON.parse(saved) : defaultWordSets;
    });
    const [testHistory, setTestHistory] = useState(() => {
        const saved = localStorage.getItem('testHistory');
        return saved ? JSON.parse(saved) : [];
    });

    // Save word sets to localStorage
    useEffect(() => {
        localStorage.setItem('wordSets', JSON.stringify(wordSets));
    }, [wordSets]);

    // Save test history to localStorage
    useEffect(() => {
        localStorage.setItem('testHistory', JSON.stringify(testHistory));
    }, [testHistory]);

    const handleStartPractice = (mode) => {
        setSelectedMode(mode);
        setScreen('selectSet');
    };

    const handleSelectSet = (set) => {
        setSelectedSet(set);
        setScreen('practice');
    };

    const handleFinish = () => {
        setScreen('home');
        setSelectedMode(null);
        setSelectedSet(null);
    };

    const handleManageWords = () => {
        setScreen('manage');
    };

    const handleAddSet = (name, words) => {
        const newSet = {
            id: Date.now(),
            name,
            words
        };
        setWordSets([...wordSets, newSet]);
    };

    const handleDeleteSet = (id) => {
        setWordSets(wordSets.filter(set => set.id !== id));
    };

    const handleEditSet = (id, name, words) => {
        setWordSets(wordSets.map(set =>
            set.id === id ? { ...set, name, words } : set
        ));
    };

    const handleSaveTestResult = (result) => {
        const newResult = {
            ...result,
            date: new Date().toISOString(),
            mode: selectedMode
        };
        setTestHistory([...testHistory, newResult]);
    };

    const handleBack = () => {
        setScreen('home');
    };

    // Get history for current set and mode
    const currentHistory = testHistory.filter(
        test => selectedSet && test.setId === selectedSet.id && test.mode === selectedMode
    );

    if (screen === 'home') {
        return (
            <HomeScreen
                onStartPractice={handleStartPractice}
                onManageWords={handleManageWords}
            />
        );
    }

    if (screen === 'selectSet') {
        return (
            <SetSelector
                wordSets={wordSets}
                mode={selectedMode}
                onSelectSet={handleSelectSet}
                onBack={handleBack}
            />
        );
    }

    if (screen === 'practice') {
        return (
            <SpellingPractice
                wordSet={selectedSet}
                mode={selectedMode}
                onFinish={handleFinish}
                onSaveTestResult={handleSaveTestResult}
                testHistory={currentHistory}
            />
        );
    }

    if (screen === 'manage') {
        return (
            <WordListManager
                wordSets={wordSets}
                onAddSet={handleAddSet}
                onDeleteSet={handleDeleteSet}
                onEditSet={handleEditSet}
                onBack={handleBack}
            />
        );
    }

    return null;
}
