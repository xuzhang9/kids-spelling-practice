export const styles = {
    container: {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        minHeight: '400px'
    },
    title: {
        fontSize: '36px',
        color: '#667eea',
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: '20px',
        color: '#667eea',
        textAlign: 'center',
        marginBottom: '8px',
        fontWeight: 'bold'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '400px',
        margin: '0 auto'
    },
    primaryButton: {
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '18px 30px',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    secondaryButton: {
        backgroundColor: '#764ba2',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '18px 30px',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 15px rgba(118, 75, 162, 0.4)'
    },
    backButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
    wordSetsList: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    wordSetCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '2px solid #e9ecef'
    },
    selectableCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        border: '2px solid #e9ecef',
        transition: 'all 0.2s'
    },
    wordSetName: {
        fontSize: '20px',
        color: '#2c3e50',
        marginBottom: '5px'
    },
    wordCount: {
        fontSize: '14px',
        color: '#7f8c8d',
        marginBottom: '8px'
    },
    wordPreview: {
        fontSize: '14px',
        color: '#95a5a6',
        fontStyle: 'italic'
    },
    editButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        padding: '15px',
        fontSize: '18px',
        borderRadius: '8px',
        border: '2px solid #e9ecef',
        outline: 'none'
    },
    textarea: {
        padding: '15px',
        fontSize: '18px',
        borderRadius: '8px',
        border: '2px solid #e9ecef',
        outline: 'none',
        fontFamily: 'inherit',
        resize: 'vertical'
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#7f8c8d',
        padding: '40px 20px'
    },
    practiceCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        padding: '15px',
        marginTop: '10px',
        textAlign: 'center'
    },
    speakButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '12px 24px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '12px',
        boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)'
    },
    practiceForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center'
    },
    spellingInput: {
        padding: '20px',
        fontSize: '28px',
        borderRadius: '12px',
        border: '3px solid #667eea',
        outline: 'none',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        fontWeight: 'bold'
    },
    feedbackCorrect: {
        backgroundColor: '#2ecc71',
        color: 'white',
        padding: '15px',
        borderRadius: '12px',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '15px'
    },
    feedbackIncorrect: {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '15px',
        borderRadius: '12px',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '15px'
    },
    progressBar: {
        width: '100%',
        height: '6px',
        backgroundColor: '#e9ecef',
        borderRadius: '10px',
        marginBottom: '10px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#2ecc71',
        transition: 'width 0.3s ease'
    },
    wordCounter: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#7f8c8d',
        marginBottom: '8px'
    },
    currentScore: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#2c3e50',
        marginTop: '20px',
        fontWeight: 'bold'
    },
    resultsCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        marginBottom: '30px'
    },
    scoreDisplay: {
        fontSize: '72px',
        fontWeight: 'bold',
        color: '#667eea',
        marginBottom: '20px'
    },
    scoreText: {
        fontSize: '24px',
        color: '#2c3e50',
        marginBottom: '10px'
    },
    perfectScore: {
        fontSize: '28px',
        color: '#f39c12',
        marginTop: '20px',
        fontWeight: 'bold'
    },
    greatScore: {
        fontSize: '28px',
        color: '#2ecc71',
        marginTop: '20px',
        fontWeight: 'bold'
    },
    modeDescription: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#7f8c8d',
        marginBottom: '30px'
    },
    modeCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '30px'
    },
    modeCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        padding: '30px',
        cursor: 'pointer',
        border: '3px solid #e9ecef',
        transition: 'all 0.3s',
        textAlign: 'center'
    },
    modeIcon: {
        fontSize: '48px',
        marginBottom: '15px'
    },
    modeTitle: {
        fontSize: '24px',
        color: '#2c3e50',
        marginBottom: '10px',
        fontWeight: 'bold'
    },
    modeText: {
        fontSize: '16px',
        color: '#7f8c8d',
        lineHeight: '1.5'
    },
    canvasContainer: {
        position: 'relative',
        margin: '0 auto',
        maxWidth: '100%'
    },
    canvas: {
        border: '2px solid #667eea',
        borderRadius: '8px',
        cursor: 'crosshair',
        backgroundColor: 'white',
        width: '100%',
        height: 'auto',
        touchAction: 'none'
    },
    clearButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        flex: '1'
    },
    recognizeButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        flex: '1'
    },
    wordDisplay: {
        fontSize: '36px',
        fontWeight: 'bold',
        color: '#667eea',
        textAlign: 'center',
        marginBottom: '15px',
        padding: '15px',
        backgroundColor: '#f0f0ff',
        borderRadius: '12px',
        fontFamily: '-apple-system, "Noteworthy", "Bradley Hand", "Comic Sans MS", cursive, sans-serif'
    },
    instructionText: {
        fontSize: '16px',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '10px',
        fontWeight: '500'
    },
    navigationContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        marginTop: '20px',
        marginBottom: '15px'
    },
    navButton: {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
        flex: '1'
    },
    nextButton: {
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(46, 204, 113, 0.4)',
        flex: '2'
    },
    modeHeader: {
        textAlign: 'center',
        marginBottom: '8px'
    },
    modeBadge: {
        display: 'inline-block',
        backgroundColor: '#667eea',
        color: 'white',
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    wordReviewSection: {
        marginTop: '30px',
        marginBottom: '20px'
    },
    reviewTitle: {
        fontSize: '22px',
        color: '#2c3e50',
        marginBottom: '15px',
        fontWeight: 'bold'
    },
    wordReviewList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    wordReviewItem: {
        padding: '15px',
        borderRadius: '8px',
        fontSize: '16px'
    },
    reviewWordCorrect: {
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '5px'
    },
    reviewWordIncorrect: {
        fontSize: '14px',
        color: '#6c757d',
        fontStyle: 'italic'
    },
    historySection: {
        marginTop: '30px',
        marginBottom: '20px'
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    historyItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
    },
    historyDate: {
        fontSize: '14px',
        color: '#6c757d'
    },
    historyScore: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    retryButton: {
        backgroundColor: '#ff9800',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '15px 30px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(255, 152, 0, 0.4)',
        flex: '2'
    },
    attemptCount: {
        fontSize: '14px',
        color: '#6c757d',
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    sideBySideContainer: {
        display: 'flex',
        gap: '15px',
        marginTop: '15px',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    handwritingSection: {
        flex: '2',
        minWidth: '320px'
    },
    typingSection: {
        flex: '1',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    spellingInputCompact: {
        padding: '12px',
        fontSize: '20px',
        borderRadius: '12px',
        border: '3px solid #667eea',
        outline: 'none',
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold'
    },
    primaryButtonCompact: {
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '15px 25px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        width: '100%',
        marginTop: '15px'
    },
    backButtonTop: {
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '6px 14px',
        fontSize: '13px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '10px',
        alignSelf: 'flex-start'
    },
    handwritingLabel: {
        fontSize: '14px',
        color: '#2c3e50',
        fontWeight: '600',
        marginBottom: '8px',
        textAlign: 'center'
    },
    quizOptionsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginTop: '20px',
        maxWidth: '500px',
        margin: '20px auto 0'
    },
    quizOption: {
        backgroundColor: '#f8f9fa',
        color: '#2c3e50',
        border: '3px solid #e9ecef',
        borderRadius: '12px',
        padding: '20px',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, "Noteworthy", "Bradley Hand", "Comic Sans MS", cursive, sans-serif'
    },
    quizOptionSelected: {
        backgroundColor: '#e7f3ff',
        borderColor: '#667eea',
        transform: 'scale(1.05)'
    },
    quizOptionCorrect: {
        backgroundColor: '#d4edda',
        borderColor: '#28a745',
        color: '#155724'
    },
    quizOptionIncorrect: {
        backgroundColor: '#f8d7da',
        borderColor: '#dc3545',
        color: '#721c24'
    },
    wordCloud: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        minHeight: '200px'
    },
    wordCloudItem: {
        color: 'white',
        padding: '12px 24px',
        borderRadius: '25px',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
        cursor: 'default',
        display: 'inline-block',
        textAlign: 'center'
    }
};
