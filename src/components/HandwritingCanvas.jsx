import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { styles } from '../styles/styles';

// Google Cloud Vision API Key - You'll need to replace this with your own
const GOOGLE_CLOUD_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY || 'YOUR_API_KEY_HERE';

const HandwritingCanvas = forwardRef(function HandwritingCanvas({ onTextChange, onClear }, ref) {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isRecognizing, setIsRecognizing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            // Fill with white background for better OCR
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Thicker, darker strokes for better recognition
            ctx.strokeStyle = '#000000'; // Pure black
            ctx.lineWidth = 6; // Thicker lines
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
    }, []);

    const startDrawing = (e) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');

        // Calculate scale factor between display size and canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext('2d');

        // Calculate scale factor between display size and canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const recognizeText = async () => {
        if (GOOGLE_CLOUD_API_KEY === 'YOUR_API_KEY_HERE') {
            alert('Please set up your Google Cloud Vision API key first! Check the console for instructions.');
            console.error('Google Cloud Vision API key not configured. See README for setup instructions.');
            return;
        }

        setIsRecognizing(true);
        try {
            const canvas = canvasRef.current;
            // Convert canvas to base64 image
            const imageData = canvas.toDataURL('image/png').split(',')[1];

            // Call Google Cloud Vision API
            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requests: [
                            {
                                image: {
                                    content: imageData,
                                },
                                features: [
                                    {
                                        type: 'DOCUMENT_TEXT_DETECTION',
                                        maxResults: 1,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            const result = await response.json();

            // Check for API errors
            if (result.responses && result.responses[0].error) {
                console.error('Google Cloud Vision API Error:', result.responses[0].error);
                alert(`API Error: ${result.responses[0].error.message}`);
                return;
            }

            if (result.responses && result.responses[0].fullTextAnnotation) {
                const recognizedText = result.responses[0].fullTextAnnotation.text;
                const cleanedText = recognizedText.trim().replace(/[^a-zA-Z]/g, '');

                if (onTextChange) {
                    onTextChange(cleanedText);
                }
            } else {
                alert('No text detected. Please write larger and clearer.');
            }
        } catch (error) {
            console.error('Google Cloud Vision API Error:', error);
            alert('Failed to recognize handwriting. Please check your API key and internet connection.');
        } finally {
            setIsRecognizing(false);
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Clear and refill with white background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (onClear) onClear();
    };

    // Expose clear and recognize methods to parent via ref
    useImperativeHandle(ref, () => ({
        clear: clearCanvas,
        recognize: recognizeText
    }));

    return (
        <div style={styles.canvasContainer}>
            <canvas
                ref={canvasRef}
                width={500}
                height={200}
                style={styles.canvas}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                    style={styles.recognizeButton}
                    onClick={recognizeText}
                    type="button"
                    disabled={isRecognizing}
                >
                    {isRecognizing ? '🔄 Recognizing...' : '✓ Recognize'}
                </button>
                <button
                    style={styles.clearButton}
                    onClick={clearCanvas}
                    type="button"
                >
                    Clear
                </button>
            </div>
        </div>
    );
});

export default HandwritingCanvas;
