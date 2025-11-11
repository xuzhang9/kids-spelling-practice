/**
 * Celebration sound utilities using Web Audio API
 * Generates cheerful sounds for perfect scores
 */

/**
 * Play a cheerful celebration melody using Web Audio API
 */
export function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Define a cheerful melody (frequencies in Hz)
        const melody = [
            { freq: 523.25, duration: 0.15 }, // C5
            { freq: 659.25, duration: 0.15 }, // E5
            { freq: 783.99, duration: 0.15 }, // G5
            { freq: 1046.50, duration: 0.3 }, // C6
            { freq: 783.99, duration: 0.15 }, // G5
            { freq: 1046.50, duration: 0.4 }  // C6
        ];

        let startTime = audioContext.currentTime;

        melody.forEach((note, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Use sine wave for a pleasant tone
            oscillator.type = 'sine';
            oscillator.frequency.value = note.freq;

            // Envelope: fade in and out
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + note.duration);

            startTime += note.duration;
        });

        // Close the audio context after the melody finishes
        setTimeout(() => {
            audioContext.close();
        }, startTime * 1000 + 100);

    } catch (error) {
        console.warn('Could not play celebration sound:', error);
    }
}

/**
 * Play clapping sounds using filtered noise
 */
export function playClappingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create 6 claps with varying intervals
        const clapTimes = [0, 0.15, 0.3, 0.5, 0.65, 0.8];

        clapTimes.forEach((time) => {
            // Create noise buffer for clap sound
            const bufferSize = audioContext.sampleRate * 0.05; // 50ms of noise
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            // Fill with noise
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = audioContext.createBufferSource();
            noise.buffer = buffer;

            // Filter the noise to sound more like a clap
            const filter = audioContext.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1000;
            filter.Q.value = 1;

            const gainNode = audioContext.createGain();

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Quick fade in and out
            const startTime = audioContext.currentTime + time;
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);

            noise.start(startTime);
            noise.stop(startTime + 0.05);
        });

        // Close the audio context after sounds finish
        setTimeout(() => {
            audioContext.close();
        }, 1200);

    } catch (error) {
        console.warn('Could not play clapping sound:', error);
    }
}

/**
 * Play both celebration sounds together
 */
export function playFullCelebration() {
    playCelebrationSound();

    // Start clapping slightly after the melody begins
    setTimeout(() => {
        playClappingSound();
    }, 300);
}
