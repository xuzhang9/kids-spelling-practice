import { useState } from 'react';
import { styles } from '../styles/styles';

export default function WordListManager({ wordSets, onAddSet, onDeleteSet, onBack }) {
    const [showForm, setShowForm] = useState(false);
    const [setName, setSetName] = useState('');
    const [wordsInput, setWordsInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const words = wordsInput.split('\n').map(w => w.trim()).filter(w => w !== '');
        if (setName && words.length > 0) {
            onAddSet(setName, words);
            setSetName('');
            setWordsInput('');
            setShowForm(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.subtitle}>Manage Word Lists</h2>

            {!showForm ? (
                <div>
                    <button
                        style={styles.primaryButton}
                        onClick={() => setShowForm(true)}
                    >
                        + Add New Word Set
                    </button>

                    <div style={styles.wordSetsList}>
                        {wordSets.map(set => (
                            <div key={set.id} style={styles.wordSetCard}>
                                <div>
                                    <h3 style={styles.wordSetName}>{set.name}</h3>
                                    <p style={styles.wordCount}>{set.words.length} words</p>
                                    <p style={styles.wordPreview}>
                                        {set.words.slice(0, 5).join(', ')}
                                        {set.words.length > 5 ? '...' : ''}
                                    </p>
                                </div>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => onDeleteSet(set.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Word Set Name (e.g., Week 1 - Long Vowels)"
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Enter words, one per line:&#10;apple&#10;banana&#10;cherry"
                        value={wordsInput}
                        onChange={(e) => setWordsInput(e.target.value)}
                        style={styles.textarea}
                        rows="10"
                        required
                    />
                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.primaryButton}>
                            Save Word Set
                        </button>
                        <button
                            type="button"
                            style={styles.secondaryButton}
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <button style={styles.backButton} onClick={onBack}>
                ← Back to Home
            </button>
        </div>
    );
}
