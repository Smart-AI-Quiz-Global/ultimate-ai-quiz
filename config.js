/*
=========================================================
Smart-AI-Quiz-Global: Config
Author: Admin
Purpose: Central configuration file for website & admin panel
Features:
- Bank/payment integration (EasyPaisa, UBL, VISA, etc.)
- Multi-language & multi-country support
- Default settings for quiz engine & ads
- Future-proof placeholders for AI, cloud sync, analytics
- Secure keys & hidden codes for admin panel
=========================================================
*/

const Config = {
    // =========================
    // Website General Settings
    // =========================
    siteName: "Smart-AI-Quiz-Global",
    siteDomain: "https://smartaiquizglobal.com", // Replace with live domain
    defaultLanguage: "en", // English default
    supportedLanguages: ["en", "ur", "hi", "ar", "zh", "es", "fr"], // English, Urdu, Hindi, Arabic, Chinese, Spanish, French
    defaultCountry: "all",
    supportedCountries: ["all", "PK", "US", "UK", "AE", "CN", "IN", "FR", "DE"],

    // =========================
    // Admin Panel Security
    // =========================
    adminSecretCode: "7866_Zaigham_5121472", // Secret code to unlock admin panel
    adminPhone: "03219379597", // Hidden for admin verification
    maxClickForAdminUnlock: 10, // Clicks on hidden eye to unlock

    // =========================
    // Quiz Engine Default Settings
    // =========================
    quiz: {
        defaultTimePerQuestion: 10, // seconds
        countdownSound: "assets/sounds/countdown.mp3",
        correctSound: "assets/sounds/correct.mp3",
        wrongSound: "assets/sounds/wrong.mp3",
        categories: [
            "Technology",
            "Education",
            "Islamic",
            "Entertainment",
            "Science",
            "Sports",
            "History",
            "Geography",
            "Art",
            "Lifestyle",
            "Health",
            "Business",
            "Politics",
            "Culture",
            "Random"
        ],
        maxQuestionsPerSession: 10,
        autoNext: false // User must click "Next" to proceed
    },

    // =========================
    // Ads Default Settings
    // =========================
    ads: {
        maxAdSlots: 50, // Future-proof 50 ad slots
        defaultDisplayTime: 10000, // 10 seconds
        enableAIRecommendations: true,
        showAdsAfterQuestions: 10,
        preventAnnoyingAds: true
    },

    // =========================
    // Bank / Payment Details
    // =========================
    payments: {
        easyPaisa: {
            accountTitle: "SmartAI Quiz",
            accountNumber: "XXXXXXXXXXX", // Replace with actual
            isActive: true
        },
        ubl: {
            accountTitle: "SmartAI Quiz",
            accountNumber: "XXXXXXXXXXX",
            isActive: true
        },
        visaCard: {
            cardHolder: "SmartAI Quiz",
            cardNumber: "XXXX-XXXX-XXXX-XXXX",
            isActive: true
        }
        // Future: Add more gateways like JazzCash, PayPal, Stripe
    },

    // =========================
    // Video Recording & Download
    // =========================
    video: {
        autoRecord: true, // Record quiz session automatically
        allowDownload: true, // User can download session video
        saveFormat: "mp4",
        resolution: "1920x1080", // 16:9 Full HD
        storagePath: "/user_videos/", // Server path for saving videos
        enableAIReview: true // Future: AI will generate captions & highlight answers
    },

    // =========================
    // Social Media Links
    // =========================
    socialLinks: {
        facebook: "https://www.facebook.com/SyedAliHassanShaOfficial",
        tiktok: "https://www.tiktok.com/@zawar_syed_ali_hassan",
        youtube: "https://youtube.com/@mast_tv_official"
    },

    // =========================
    // UI/UX & Future-Proof Settings
    // =========================
    ui: {
        theme: "light", // light or dark mode
        responsiveBreakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1200
        },
        preventScreenRecordingBlocks: false, // Optional: block recording in future
        hiddenAdminEyeSelector: "#hiddenEye", // Secret eye for admin panel unlock
        clickCountForUnlock: 10
    },

    // =========================
    // AI & Cloud Future Features
    // =========================
    aiEngine: {
        enabled: true,
        type: "GPT-4.5", // Placeholder, can be upgraded to GPT-5
        multiLanguageSupport: true,
        continuousQuizGeneration: true, // Auto-generate questions infinitely
        backupFrequency: "daily"
    },

    cloud: {
        enableSync: true,
        backupPath: "/cloud_backups/",
        maxBackupRetention: 30, // days
        syncInterval: 3600 // seconds
    }
};

// =========================
// Export for use in other JS files
// =========================
if(typeof module !== "undefined" && module.exports){
    module.exports = Config;
}

// =========================
// Usage Example:
// import Config from './config.js';
// console.log(Config.siteName);
// =========================
