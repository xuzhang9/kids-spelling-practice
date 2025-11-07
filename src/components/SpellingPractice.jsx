import { useState, useEffect, useRef } from 'react';
import { styles } from '../styles/styles';
import HandwritingCanvas from './HandwritingCanvas';
import PracticeCanvas from './PracticeCanvas';

export default function SpellingPractice({ wordSet, mode, onFinish, onSaveTestResult, testHistory = [] }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [answers, setAnswers] = useState({}); // Track answers by word index
    const [attemptCounts, setAttemptCounts] = useState({}); // Track number of attempts per word
    const [isFinished, setIsFinished] = useState(false);
    const [sessionStartTime] = useState(Date.now()); // Track when session started
    const [quizOptions, setQuizOptions] = useState([]); // For quiz mode: 4 options
    const [selectedOption, setSelectedOption] = useState(null); // Track selected option in quiz mode
    const [currentWords, setCurrentWords] = useState([]); // Shuffled for test/quiz, original for practice
    const canvasRef = useRef(null);
    const practiceCanvasRef = useRef(null);

    const isTestMode = mode === 'test';
    const isQuizMode = mode === 'quiz';
    const currentWord = currentWords[currentWordIndex];

    // Shuffle array helper function
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Initialize word list: shuffle for all modes
    useEffect(() => {
        if (wordSet && wordSet.words && wordSet.words.length > 0) {
            setCurrentWords(shuffleArray(wordSet.words));
        }
    }, [wordSet]);

    // Load voices when component mounts
    useEffect(() => {
        // Sometimes voices need to be loaded
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', () => {
                window.speechSynthesis.getVoices();
            });
        }
    }, []);

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Slower for kids
        utterance.pitch = 1.1; // Slightly higher pitch

        // Try to select a female voice
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            voice.name.toLowerCase().includes('zira') || // Microsoft Zira (female)
            voice.name.toLowerCase().includes('samantha') || // macOS Samantha
            voice.name.includes('Google US English') && voice.name.includes('Female')
        );

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
    };

    // Generate quiz options: 1 correct + 3 random wrong answers
    const generateQuizOptions = (correctWord, allWords) => {
        // Get other words (excluding the correct one) - use Set to remove duplicates
        const uniqueWords = [...new Set(allWords)];
        const otherWords = uniqueWords.filter(w => w !== correctWord);

        // Pick 3 random wrong answers
        const wrongAnswers = [];
        const shuffled = [...otherWords].sort(() => Math.random() - 0.5);
        for (let i = 0; i < Math.min(3, shuffled.length); i++) {
            wrongAnswers.push(shuffled[i]);
        }

        // If we don't have enough words, fill with placeholder
        while (wrongAnswers.length < 3) {
            wrongAnswers.push('---');
        }

        // Combine and shuffle all 4 options (don't include duplicates)
        const allOptions = [correctWord, ...wrongAnswers];
        return allOptions.sort(() => Math.random() - 0.5);
    };

    // Auto-play word in practice mode
    useEffect(() => {
        if (!isTestMode && !isQuizMode && !feedback) {
            const timer = setTimeout(() => speak(currentWord), 300);
            return () => clearTimeout(timer);
        }
    }, [currentWordIndex, isTestMode, isQuizMode, feedback, currentWord]);

    // Generate quiz options when word changes in quiz mode
    useEffect(() => {
        if (isQuizMode && currentWord && wordSet.words) {
            const options = generateQuizOptions(currentWord, wordSet.words);
            setQuizOptions(options);
        }
    }, [currentWordIndex, isQuizMode, currentWord, wordSet.words]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Allow empty submissions in test mode (handwriting practice)
        // if (!userInput.trim()) return;

        const isCorrect = userInput.toLowerCase().trim() === currentWord.toLowerCase();

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        // Track attempt count
        const currentAttempts = attemptCounts[currentWordIndex] || 0;
        const newAttempts = currentAttempts + 1;
        setAttemptCounts(prev => ({
            ...prev,
            [currentWordIndex]: newAttempts
        }));

        // Record the answer using word index as key (allows overriding when going back)
        // In test mode, only update if correct OR if this is their final answer (when they click Next)
        // In practice mode, always save
        if (!isTestMode || isCorrect) {
            setAnswers(prev => ({
                ...prev,
                [currentWordIndex]: {
                    word: currentWord,
                    userAnswer: userInput || '(no answer)',
                    isCorrect,
                    attempts: newAttempts
                }
            }));
        }

        if (isCorrect) {
            speak('Great job!');
        } else {
            speak(`Not quite. The correct spelling is ${currentWord}`);
        }
    };

    // Handle quiz option selection
    const handleQuizSelect = (option) => {
        if (feedback !== null) return; // Already answered

        setSelectedOption(option);
        const isCorrect = option.toLowerCase() === currentWord.toLowerCase();

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        // Track attempt count
        const currentAttempts = attemptCounts[currentWordIndex] || 0;
        const newAttempts = currentAttempts + 1;
        setAttemptCounts(prev => ({
            ...prev,
            [currentWordIndex]: newAttempts
        }));

        // Save answer immediately in quiz mode
        setAnswers(prev => ({
            ...prev,
            [currentWordIndex]: {
                word: currentWord,
                userAnswer: option,
                isCorrect,
                attempts: newAttempts
            }
        }));

        if (isCorrect) {
            speak('Great job!');
        } else {
            speak(`Not quite. The correct word is ${currentWord}`);
        }
    };

    const handleRetry = () => {
        setUserInput('');
        setSelectedOption(null);
        setFeedback(null);
        // Clear canvas if in test mode
        if (canvasRef.current) {
            canvasRef.current.clear();
        }
        // Don't regenerate quiz options - keep the same options for retry
    };

    const nextWord = () => {
        // If moving to next word with feedback showing and answer hasn't been saved yet (incorrect in test mode)
        if (feedback !== null && isTestMode && !answers[currentWordIndex]) {
            const currentAttempts = attemptCounts[currentWordIndex] || 0;
            setAnswers(prev => ({
                ...prev,
                [currentWordIndex]: {
                    word: currentWord,
                    userAnswer: userInput || '(no answer)',
                    isCorrect: false,
                    attempts: currentAttempts
                }
            }));
        }

        if (currentWordIndex < currentWords.length - 1) {
            const nextIndex = currentWordIndex + 1;

            // Clear states before moving to next word
            setUserInput('');
            setSelectedOption(null);
            setFeedback(null);

            setCurrentWordIndex(nextIndex);

            // Restore next answer if it exists (when going back and forth)
            const nextAnswer = answers[nextIndex];
            if (nextAnswer) {
                if (isQuizMode) {
                    setSelectedOption(nextAnswer.userAnswer);
                } else {
                    setUserInput(nextAnswer.userAnswer === '(no answer)' ? '' : nextAnswer.userAnswer);
                }
                setFeedback(nextAnswer.isCorrect ? 'correct' : 'incorrect');
            }

            // Clear canvas
            if (canvasRef.current) {
                canvasRef.current.clear();
            }
            if (practiceCanvasRef.current) {
                practiceCanvasRef.current.clear();
            }
        } else {
            // Finish the session
            setIsFinished(true);

            // Make sure current word is saved if it hasn't been
            let finalAnswers = {...answers};
            if (feedback !== null && !finalAnswers[currentWordIndex]) {
                const currentAttempts = attemptCounts[currentWordIndex] || 0;
                finalAnswers[currentWordIndex] = {
                    word: currentWord,
                    userAnswer: userInput || '(no answer)',
                    isCorrect: feedback === 'correct',
                    attempts: currentAttempts
                };
            }

            // Convert answers object to array
            const answersArray = Object.values(finalAnswers);
            if ((isTestMode || isQuizMode) && onSaveTestResult) {
                const correctCount = answersArray.filter(a => a.isCorrect).length;
                onSaveTestResult({
                    setId: wordSet.id,
                    setName: wordSet.name,
                    answers: answersArray,
                    score: {
                        correct: correctCount,
                        total: answersArray.length
                    }
                });
            }
        }
    };

    const previousWord = () => {
        if (currentWordIndex > 0) {
            // Save current answer if it hasn't been saved yet (incorrect in test mode, or any quiz mode answer)
            if (feedback !== null && (isTestMode || isQuizMode) && !answers[currentWordIndex]) {
                const currentAttempts = attemptCounts[currentWordIndex] || 0;
                setAnswers(prev => ({
                    ...prev,
                    [currentWordIndex]: {
                        word: currentWord,
                        userAnswer: isQuizMode ? (selectedOption || '(no answer)') : (userInput || '(no answer)'),
                        isCorrect: feedback === 'correct',
                        attempts: currentAttempts
                    }
                }));
            }

            const prevIndex = currentWordIndex - 1;
            setCurrentWordIndex(prevIndex);

            // Restore previous answer if it exists
            const prevAnswer = answers[prevIndex];
            if (prevAnswer) {
                if (isQuizMode) {
                    setSelectedOption(prevAnswer.userAnswer);
                } else {
                    setUserInput(prevAnswer.userAnswer === '(no answer)' ? '' : prevAnswer.userAnswer);
                }
                setFeedback(prevAnswer.isCorrect ? 'correct' : 'incorrect');
            } else {
                setUserInput('');
                setSelectedOption(null);
                setFeedback(null);
            }

            // Clear canvas
            if (canvasRef.current) {
                canvasRef.current.clear();
            }
            if (practiceCanvasRef.current) {
                practiceCanvasRef.current.clear();
            }
        }
    };

    const clearHandwriting = () => {
        setUserInput('');
    };

    const handleHandwritingRecognized = (text) => {
        setUserInput(text);
    };

    // Wait for words to be initialized
    if (!currentWords || currentWords.length === 0) {
        return (
            <div style={styles.container}>
                <p style={styles.emptyMessage}>Loading words...</p>
            </div>
        );
    }

    // Results/Summary screen
    if (isFinished) {
        // Convert answers object to array
        const allAnswers = Object.values(answers);

        const correctCount = allAnswers.filter(a => a.isCorrect).length;
        const percentage = allAnswers.length > 0 ? Math.round((correctCount / allAnswers.length) * 100) : 0;

        // Filter out current session from test history (tests within last 5 seconds)
        const previousTests = testHistory.filter(test => {
            const testTime = new Date(test.date).getTime();
            return (sessionStartTime - testTime) > 5000; // Only show tests older than 5 seconds
        });

        if (isTestMode || isQuizMode) {
            // Detailed test/quiz summary
            return (
                <div style={styles.container}>
                    <h2 style={styles.subtitle}>{isQuizMode ? 'Quiz Complete!' : 'Test Complete!'}</h2>
                    <div style={styles.resultsCard}>
                        <div style={styles.scoreDisplay}>
                            {percentage}%
                        </div>
                        <p style={styles.scoreText}>
                            You got {correctCount} out of {allAnswers.length} correct!
                        </p>
                        {percentage === 100 && (
                            <p style={styles.perfectScore}>🌟 Perfect Score! 🌟</p>
                        )}
                        {percentage >= 80 && percentage < 100 && (
                            <p style={styles.greatScore}>🎉 Great Job! 🎉</p>
                        )}
                    </div>

                    {/* Word Review */}
                    <div style={styles.wordReviewSection}>
                        <h3 style={styles.reviewTitle}>Word Review</h3>
                        <div style={styles.wordReviewList}>
                            {allAnswers.map((answer, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.wordReviewItem,
                                        backgroundColor: answer.isCorrect ? '#d4edda' : '#f8d7da',
                                        borderLeft: `4px solid ${answer.isCorrect ? '#28a745' : '#dc3545'}`
                                    }}
                                >
                                    <div style={styles.reviewWordCorrect}>
                                        {answer.isCorrect ? '✓' : '✗'} {answer.word}
                                        {answer.attempts > 1 && (
                                            <span style={styles.attemptCount}>
                                                {' '}({answer.attempts} tries)
                                            </span>
                                        )}
                                    </div>
                                    {!answer.isCorrect && (
                                        <div style={styles.reviewWordIncorrect}>
                                            Your answer: {answer.userAnswer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* History */}
                    {previousTests && previousTests.length > 0 && (
                        <div style={styles.historySection}>
                            <h3 style={styles.reviewTitle}>{isQuizMode ? 'Previous Quizzes' : 'Previous Tests'}</h3>
                            <div style={styles.historyList}>
                                {previousTests.slice(-5).reverse().map((test, index) => {
                                    const testPercentage = Math.round((test.score.correct / test.score.total) * 100);
                                    const testDate = new Date(test.date);
                                    const dateStr = testDate.toLocaleDateString();
                                    const timeStr = testDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <div key={index} style={styles.historyItem}>
                                            <span style={styles.historyDate}>
                                                {dateStr} at {timeStr}
                                            </span>
                                            <span style={styles.historyScore}>
                                                {test.score.correct}/{test.score.total} ({testPercentage}%)
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <button style={styles.primaryButton} onClick={onFinish}>
                        Back to Home
                    </button>
                </div>
            );
        } else {
            // Practice mode summary with word cloud
            const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#30cfd0'];
            const fontSizes = ['28px', '32px', '36px', '40px', '44px'];

            return (
                <div style={styles.container}>
                    <h2 style={styles.subtitle}>Practice Complete!</h2>
                    <div style={styles.resultsCard}>
                        <p style={styles.scoreText}>
                            You practiced {currentWords.length} word{currentWords.length !== 1 ? 's' : ''}!
                        </p>
                        <p style={styles.perfectScore}>🎉 Great Practice! 🎉</p>
                    </div>

                    {/* Word Cloud */}
                    <div style={styles.wordReviewSection}>
                        <h3 style={styles.reviewTitle}>Words You Practiced</h3>
                        <div style={styles.wordCloud}>
                            {currentWords.map((word, index) => (
                                <span
                                    key={index}
                                    style={{
                                        ...styles.wordCloudItem,
                                        backgroundColor: colors[index % colors.length],
                                        fontSize: fontSizes[index % fontSizes.length]
                                    }}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button style={styles.primaryButton} onClick={onFinish}>
                        Back to Home
                    </button>
                </div>
            );
        }
    }

    return (
        <div style={styles.container}>
            {/* Back button at top */}
            <button style={styles.backButtonTop} onClick={onFinish}>
                ← Back to Home
            </button>

            {/* Header with mode indicator */}
            <div style={styles.modeHeader}>
                <span style={styles.modeBadge}>
                    {isTestMode ? '✍️ Test Mode' : isQuizMode ? '🎯 Quiz Mode' : '📖 Practice Mode'}
                </span>
            </div>

            <div style={styles.progressBar}>
                <div
                    style={{
                        ...styles.progressFill,
                        width: `${((currentWordIndex + 1) / currentWords.length) * 100}%`
                    }}
                />
            </div>

            <h2 style={styles.subtitle}>{wordSet.name}</h2>
            <p style={styles.wordCounter}>
                Word {currentWordIndex + 1} of {currentWords.length}
            </p>

            <div style={styles.practiceCard}>
                {/* Show word in practice mode only, hide in test and quiz modes */}
                {!isTestMode && !isQuizMode && !feedback && (
                    <div style={styles.wordDisplay}>
                        {currentWord}
                    </div>
                )}

                <button
                    style={styles.speakButton}
                    onClick={() => speak(currentWord)}
                    type="button"
                >
                    🔊 Hear the Word
                </button>

                {isQuizMode ? (
                    /* Quiz Mode: Multiple choice buttons */
                    <div>
                        <p style={styles.instructionText}>Pick the correct word:</p>
                        <div style={styles.quizOptionsContainer}>
                            {quizOptions.map((option, index) => {
                                const isSelected = selectedOption === option;
                                const isCorrectOption = option.toLowerCase() === currentWord.toLowerCase();
                                const showResult = feedback !== null;

                                return (
                                    <button
                                        key={`${currentWordIndex}-${option}-${index}`}
                                        onClick={() => handleQuizSelect(option)}
                                        disabled={feedback !== null}
                                        style={{
                                            ...styles.quizOption,
                                            ...(isSelected && showResult && isCorrectOption ? styles.quizOptionCorrect : {}),
                                            ...(isSelected && showResult && !isCorrectOption ? styles.quizOptionIncorrect : {}),
                                            ...(isSelected && !showResult ? styles.quizOptionSelected : {}),
                                        }}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : isTestMode ? (
                    /* Test Mode: Handwriting and Typing Side by Side */
                    <div>
                        <p style={styles.instructionText}>Write or type the word you hear:</p>
                        <div style={styles.sideBySideContainer}>
                            <div style={styles.handwritingSection}>
                                <HandwritingCanvas
                                    ref={canvasRef}
                                    onClear={clearHandwriting}
                                    onTextChange={handleHandwritingRecognized}
                                />
                            </div>
                            <div style={styles.typingSection}>
                                <form onSubmit={handleSubmit} style={styles.practiceForm}>
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        style={styles.spellingInputCompact}
                                        placeholder="Type here..."
                                        disabled={feedback !== null}
                                        autoFocus
                                    />

                                    {feedback === null && (
                                        <button
                                            type="submit"
                                            style={{
                                                ...styles.primaryButtonCompact,
                                                opacity: userInput.trim() ? 1 : 0.5,
                                                cursor: userInput.trim() ? 'pointer' : 'not-allowed'
                                            }}
                                            disabled={!userInput.trim()}
                                        >
                                            Check Answer
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Practice Mode: Canvas for handwriting practice */
                    <div>
                        <p style={styles.instructionText}>Practice writing the word:</p>
                        <PracticeCanvas ref={practiceCanvasRef} />
                    </div>
                )}

                {/* Show feedback only in test/quiz mode */}
                {(isTestMode || isQuizMode) && feedback === 'correct' && (
                    <div style={styles.feedbackCorrect}>
                        ✓ Correct! Well done!
                    </div>
                )}

                {(isTestMode || isQuizMode) && feedback === 'incorrect' && (
                    <div style={styles.feedbackIncorrect}>
                        The correct spelling is: <strong>{currentWord}</strong>
                    </div>
                )}
            </div>

            {/* Navigation buttons */}
            <div style={styles.navigationContainer}>
                {feedback !== null ? (
                    <>
                        <button
                            style={{...styles.navButton, opacity: currentWordIndex === 0 ? 0.5 : 1}}
                            onClick={previousWord}
                            disabled={currentWordIndex === 0}
                        >
                            ← Previous
                        </button>

                        {/* Show Retry button in test/quiz mode when answer is incorrect */}
                        {(isTestMode || isQuizMode) && feedback === 'incorrect' && (
                            <button
                                style={styles.retryButton}
                                onClick={handleRetry}
                            >
                                🔄 Retry
                            </button>
                        )}

                        <button
                            style={styles.nextButton}
                            onClick={nextWord}
                        >
                            {currentWordIndex < currentWords.length - 1 ? 'Next →' : 'Done'}
                        </button>
                    </>
                ) : !isTestMode && !isQuizMode ? (
                    /* Practice mode: Show Previous and Next buttons even without checking */
                    <>
                        <button
                            style={{...styles.navButton, opacity: currentWordIndex === 0 ? 0.5 : 1}}
                            onClick={previousWord}
                            disabled={currentWordIndex === 0}
                        >
                            ← Previous
                        </button>
                        <button
                            style={styles.nextButton}
                            onClick={nextWord}
                        >
                            {currentWordIndex < currentWords.length - 1 ? 'Next →' : 'Done'}
                        </button>
                    </>
                ) : (
                    /* Test/Quiz mode: Only show Previous when no feedback */
                    <button
                        style={{...styles.navButton, opacity: currentWordIndex === 0 ? 0.5 : 1, margin: '0 auto'}}
                        onClick={previousWord}
                        disabled={currentWordIndex === 0}
                    >
                        ← Previous
                    </button>
                )}
            </div>

            {(isTestMode || isQuizMode) && (
                <div style={styles.currentScore}>
                    Score: {Object.values(answers).filter(a => a.isCorrect).length} / {currentWords.length}
                </div>
            )}
        </div>
    );
}
