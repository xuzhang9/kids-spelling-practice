# Phonics & Spelling Practice App

A comprehensive, kid-friendly web app to help children memorize spelling words, practice handwriting, and improve phonics with interactive pronunciation support and handwriting recognition.

## Features

### 🎓 Three Learning Modes

- **Practice Mode**: See the word, hear pronunciation, and practice writing on a canvas - perfect for learning and muscle memory
- **Quiz Mode**: Listen to the word and pick the correct spelling from 4 multiple-choice options - gamified learning!
- **Test Mode**: Listen and write using handwriting recognition or typing - comprehensive assessment

### ✍️ Handwriting Recognition

- **Google Cloud Vision API**: Professional-grade OCR for accurate handwriting recognition
- **Touch-optimized Canvas**: Large, responsive canvas perfect for iPad and tablets
- **Thick, clear strokes**: Black on white for optimal recognition
- **Practice Canvas**: Simple drawing canvas in practice mode (no OCR needed)

### 📚 Word List Management

- Create and manage unlimited spelling word sets
- Easy-to-use interface for adding, editing, and deleting word sets
- Visual preview of words in each set
- Persistent storage using localStorage

### 🎯 Advanced Learning Features

- **Text-to-Speech**: Female voice pronunciation at kid-friendly speed
- **Word Shuffling**: Randomized order in test and quiz modes for better learning
- **Retry System**: Try again on incorrect answers with attempt tracking
- **Progress Tracking**: Real-time score display during tests/quizzes
- **Detailed Results**: See which words were correct/incorrect with attempt counts
- **History Tracking**: Separate history for tests and quizzes with timestamps
- **Colorful Word Cloud**: Beautiful, interactive word cloud summary in practice mode

### 🎨 Kid-Friendly Design

- Vibrant gradient backgrounds
- Large, touch-friendly buttons
- Clear visual feedback (correct/incorrect indicators)
- Progress bars to track completion
- Responsive design for all screen sizes

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Google Cloud Vision API key (for handwriting recognition in test mode)

### Installation

1. Clone or download this repository
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Google Cloud Vision API Setup

For handwriting recognition to work in **Test Mode**, you need to set up Google Cloud Vision API:

1. Follow the detailed instructions in `GOOGLE_CLOUD_SETUP.md`
2. Create a Google Cloud account (new users get $300 free credit)
3. Enable Cloud Vision API
4. Create an API key
5. Add your API key to `.env`:
   ```
   VITE_GOOGLE_CLOUD_API_KEY=your_actual_api_key_here
   ```

**Pricing**: First 1,000 handwriting recognitions per month are FREE. Even with daily use, costs are minimal (~$0.75/month for heavy usage).

**Note**: Practice Mode and Quiz Mode work without the API key. Only Test Mode requires it for handwriting recognition.

### Running the App

**Development mode** (with hot reload):
```bash
npm run dev
```

The app will be available at:
- Local: `http://localhost:3002/` (or next available port)
- Network: `http://[your-ip]:3002/` (for iPad/other devices on same WiFi)

**Build for production**:
```bash
npm run build
```

**Preview production build**:
```bash
npm run preview
```

### Network Access (iPad/Tablet)

To access the app on your iPad or other devices:

1. Start the dev server: `npm run dev`
2. Find your computer's local IP address in the terminal output
3. On your iPad, open Safari and go to `http://[your-ip]:3002/`
4. The app is fully touch-optimized for tablet use

## How to Use

### Getting Started

1. The app loads with a sample word set to get you started
2. Choose from three modes: Practice, Quiz, or Test

### Managing Word Lists

1. Click "Manage Word Lists" from the home screen
2. Click "+ Add New Word Set"
3. Enter a name for your word set (e.g., "Week 1 - Long Vowels")
4. Type your words, one per line
5. Click "Save Word Set"
6. Delete word sets using the "Delete" button

### Practice Mode

- See the word on screen
- Hear the pronunciation (click 🔊 or auto-plays)
- Practice writing on the canvas
- Navigate freely with Previous/Next buttons
- Complete to see a beautiful, colorful word cloud of all practiced words!

### Quiz Mode

- Listen to the word (click 🔊)
- Pick the correct spelling from 4 options
- Get immediate feedback
- Retry on wrong answers
- Words are shuffled for increased difficulty
- See detailed results with score percentage

### Test Mode

- Listen to the word (click 🔊)
- Write it using handwriting OR typing
- Click "✓ Recognize" to convert handwriting to text
- Submit your answer
- Retry on wrong answers
- Words are shuffled for increased difficulty
- Detailed results show all answers and attempt counts

## Project Structure

```
phonics/
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx          # Main menu with mode selection
│   │   ├── WordListManager.jsx     # Create/edit/delete word sets
│   │   ├── SetSelector.jsx         # Choose word set
│   │   ├── ModeSelector.jsx        # Select learning mode
│   │   ├── HandwritingCanvas.jsx   # Canvas with OCR (test mode)
│   │   ├── PracticeCanvas.jsx      # Simple canvas (practice mode)
│   │   └── SpellingPractice.jsx    # Main practice/quiz/test logic
│   ├── styles/
│   │   └── styles.js               # All styling definitions
│   ├── App.jsx                     # Root component, state management
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── .env                            # API key (not committed to git)
├── .gitignore
├── GOOGLE_CLOUD_SETUP.md           # Detailed API setup guide
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technical Details

### Built With

- **React 18.2**: Modern React with hooks
- **Vite 5.0**: Lightning-fast build tool and dev server
- **Google Cloud Vision API**: Professional handwriting recognition
- **Web Speech API**: Built-in browser text-to-speech

### Key Features

- **State Management**: React hooks (useState, useEffect, useRef)
- **Storage**: localStorage for word sets and history (persists in browser)
- **Refs & Imperative Handles**: For canvas control
- **Touch Events**: Full support for touchscreens
- **Responsive Design**: Flexbox layouts that work on all devices

### Browser Requirements

- Modern browser with JavaScript enabled
- Web Speech API support (Safari, Chrome, Edge, Firefox)
- localStorage enabled
- Internet connection (for handwriting recognition in test mode)

## Data & Privacy

- **Local Storage**: All word sets and history are saved in browser's localStorage
- **No Data Collection**: The app doesn't collect or store any user data on external servers
- **API Usage**: Google Cloud Vision API is only called when you click "Recognize" in test mode
- **Secure**: API key stored in `.env` file (excluded from git via `.gitignore`)

## Development Stats

- **Total Lines of Code**: ~1,900 lines
- **Components**: 8 React components
- **Styles**: 577 lines of styling
- **Main Logic**: SpellingPractice.jsx (685 lines)

## Troubleshooting

### Handwriting recognition not working
- Ensure you've set up Google Cloud Vision API (see `GOOGLE_CLOUD_SETUP.md`)
- Check that your API key is correct in `.env`
- Verify Cloud Vision API is enabled in Google Cloud Console
- Restart the dev server after adding the API key

### "No text detected"
- Write larger letters using the full canvas height
- Use clear, print-style letters (not cursive)
- Use black strokes on white background (default)
- Ensure you've drawn something before clicking "Recognize"

### Cannot access on iPad
- Ensure both devices are on the same WiFi network
- Check firewall settings on your computer
- Use the network URL shown in the terminal (not localhost)

## Future Enhancement Ideas

- Export/import word lists
- Difficulty levels
- Sound effects
- Progress badges/achievements
- Parent dashboard
- Multiple user profiles
- Offline mode with service workers

## License

This project is open source and available for educational purposes.

## Credits

Built with ❤️ for kids learning to spell and write!
