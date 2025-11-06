import { styles } from '../styles/styles';

export default function HomeScreen({ onManageWords, onStartPractice }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>🎓 Phonics & Spelling</h1>

            <h2 style={styles.subtitle}>Choose Your Mode</h2>

            <div style={styles.modeCards}>
                <div
                    style={styles.modeCard}
                    onClick={() => onStartPractice('practice')}
                >
                    <div style={styles.modeIcon}>📖</div>
                    <h3 style={styles.modeTitle}>Practice Mode</h3>
                    <p style={styles.modeText}>
                        See the word and hear how it sounds. Perfect for learning!
                    </p>
                </div>

                <div
                    style={styles.modeCard}
                    onClick={() => onStartPractice('quiz')}
                >
                    <div style={styles.modeIcon}>🎯</div>
                    <h3 style={styles.modeTitle}>Quiz Mode</h3>
                    <p style={styles.modeText}>
                        Listen and pick the right word from 4 choices. Fun and quick!
                    </p>
                </div>

                <div
                    style={styles.modeCard}
                    onClick={() => onStartPractice('test')}
                >
                    <div style={styles.modeIcon}>✍️</div>
                    <h3 style={styles.modeTitle}>Test Mode</h3>
                    <p style={styles.modeText}>
                        Listen and write the word using handwriting. Ready to test yourself?
                    </p>
                </div>
            </div>

            <button style={styles.secondaryButton} onClick={onManageWords}>
                Manage Word Lists
            </button>
        </div>
    );
}
