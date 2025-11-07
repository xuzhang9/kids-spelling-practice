import { useState } from 'react';
import { styles } from '../styles/styles';

export default function WordListManager({ wordSets, onAddSet, onDeleteSet, onEditSet, onBack }) {
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [setName, setSetName] = useState('');
    const [wordsInput, setWordsInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const words = wordsInput.split('\n').map(w => w.trim()).filter(w => w !== '');
        if (setName && words.length > 0) {
            if (editingId) {
                onEditSet(editingId, setName, words);
            } else {
                onAddSet(setName, words);
            }
            setSetName('');
            setWordsInput('');
            setShowForm(false);
            setEditingId(null);
        }
    };

    const handleEdit = (set) => {
        setEditingId(set.id);
        setSetName(set.name);
        setWordsInput(set.words.join('\n'));
        setShowForm(true);
    };

    const handleCancel = () => {
        setSetName('');
        setWordsInput('');
        setShowForm(false);
        setEditingId(null);
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
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        style={styles.editButton}
                                        onClick={() => handleEdit(set)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => onDeleteSet(set.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h3 style={styles.subtitle}>{editingId ? 'Edit Word Set' : 'Add New Word Set'}</h3>
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
                            {editingId ? 'Update Word Set' : 'Save Word Set'}
                        </button>
                        <button
                            type="button"
                            style={styles.secondaryButton}
                            onClick={handleCancel}
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
