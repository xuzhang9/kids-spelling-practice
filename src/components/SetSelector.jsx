import { styles } from '../styles/styles';

export default function SetSelector({ wordSets, onSelectSet, onBack, mode }) {
    return (
        <div style={styles.container}>
            <div style={styles.modeHeader}>
                <span style={styles.modeBadge}>
                    {mode === 'test' ? '✍️ Test Mode' : mode === 'quiz' ? '🎯 Quiz Mode' : '📖 Practice Mode'}
                </span>
            </div>

            <h2 style={styles.subtitle}>Choose a Word Set</h2>

            {wordSets.length === 0 ? (
                <p style={styles.emptyMessage}>
                    No word sets yet. Create one in "Manage Word Lists"!
                </p>
            ) : (
                <div style={styles.wordSetsList}>
                    {wordSets.map(set => (
                        <div
                            key={set.id}
                            style={styles.selectableCard}
                            onClick={() => onSelectSet(set)}
                        >
                            <h3 style={styles.wordSetName}>{set.name}</h3>
                            <p style={styles.wordCount}>{set.words.length} words</p>
                        </div>
                    ))}
                </div>
            )}

            <button style={styles.backButton} onClick={onBack}>
                ← Back to Home
            </button>
        </div>
    );
}
