import { styles } from '../styles/styles';

export default function ModeSelector({ wordSet, onSelectMode, onBack }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.subtitle}>Choose Your Mode</h2>
            <p style={styles.modeDescription}>
                Selected: <strong>{wordSet.name}</strong>
            </p>

            <div style={styles.modeCards}>
                <div
                    style={styles.modeCard}
                    onClick={() => onSelectMode('practice')}
                >
                    <div style={styles.modeIcon}>📖</div>
                    <h3 style={styles.modeTitle}>Practice Mode</h3>
                    <p style={styles.modeText}>
                        See the word and hear how it sounds. Perfect for learning!
                    </p>
                </div>

                <div
                    style={styles.modeCard}
                    onClick={() => onSelectMode('test')}
                >
                    <div style={styles.modeIcon}>✍️</div>
                    <h3 style={styles.modeTitle}>Test Mode</h3>
                    <p style={styles.modeText}>
                        Listen and write the word using handwriting. Ready to test yourself?
                    </p>
                </div>
            </div>

            <button style={styles.backButton} onClick={onBack}>
                ← Back to Word Sets
            </button>
        </div>
    );
}
