// recorder.js
// Smart-AI-Quiz-Global - Audio & Screen Recorder Module
// Author: Smart-AI-Quiz-Global Team
// Description: Handles microphone recording, screen recording, playback, download, and future AI features.

class Recorder {
    constructor() {
        // Microphone properties
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.audioBlob = null;
        this.audioUrl = null;
        this.audioElement = null;
        this.isRecordingAudio = false;

        // Screen recording properties
        this.screenRecorder = null;
        this.screenChunks = [];
        this.isRecordingScreen = false;
    }

    // -----------------------------
    // Microphone Recording Methods
    // -----------------------------
    async initMic() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);

            this.mediaRecorder.ondataavailable = (e) => this.audioChunks.push(e.data);
            this.mediaRecorder.onstop = () => {
                this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(this.audioBlob);
                this.audioElement = new Audio(this.audioUrl);
                this.audioChunks = [];
            };
            console.log("Microphone initialized successfully.");
        } catch (err) {
            console.error("Microphone access denied or not supported:", err);
            alert("Microphone access is required for recording. Please allow microphone permission.");
        }
    }

    startAudioRecording() {
        if (!this.mediaRecorder) return console.warn("Microphone not initialized. Call initMic() first.");
        if (this.isRecordingAudio) return console.warn("Audio recording already in progress.");

        this.audioChunks = [];
        this.mediaRecorder.start();
        this.isRecordingAudio = true;
        console.log("Audio recording started...");
    }

    stopAudioRecording() {
        if (!this.mediaRecorder || !this.isRecordingAudio) return console.warn("No audio recording in progress.");
        this.mediaRecorder.stop();
        this.isRecordingAudio = false;
        console.log("Audio recording stopped.");
    }

    playAudio() {
        if (!this.audioElement) return console.warn("No audio recorded yet.");
        this.audioElement.play();
        console.log("Playing recorded audio...");
    }

    downloadAudio(filename = `audio_${Date.now()}.webm`) {
        if (!this.audioBlob) return console.warn("No audio to download.");
        const a = document.createElement("a");
        a.href = this.audioUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("Audio downloaded:", filename);
    }

    // -----------------------------
    // Screen + Audio Recording
    // -----------------------------
    async startScreenRecording() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always", width: 1280, height: 720 },
                audio: true // System + microphone audio
            });

            this.screenRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            this.screenChunks = [];

            this.screenRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this.screenChunks.push(e.data);
            };

            this.screenRecorder.onstop = () => this.saveScreenVideo();
            this.screenRecorder.start();
            this.isRecordingScreen = true;
            console.log("Screen recording started...");
        } catch (err) {
            console.error("Screen recording error:", err);
            alert("Please allow screen capture to record your video.");
        }
    }

    stopScreenRecording() {
        if (!this.screenRecorder || !this.isRecordingScreen) return console.warn("No screen recording in progress.");
        this.screenRecorder.stop();
        this.isRecordingScreen = false;
        console.log("Screen recording stopped.");
    }

    saveScreenVideo() {
        const blob = new Blob(this.screenChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `Smart_AI_Quiz_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.screenChunks = [];
        }, 100);

        alert("Your quiz video is ready! You can now upload it to YouTube or share.");
    }

    // -----------------------------
    // AI & Future Features
    // -----------------------------
    async transcribeAudio() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Transcription feature coming soon...");
        // Future: integrate AI transcription API
    }

    async detectLanguage() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Language detection feature coming soon...");
        // Future: integrate language detection AI API
    }

    async noiseReduction() {
        console.log("Noise reduction feature coming soon...");
        // Future: integrate WebAudio noise reduction or AI processing
    }

    saveToServer(userId = null) {
        if (!this.audioBlob) return console.warn("No audio to upload.");
        console.log("Saving to server... (future feature)");
        // Future: Upload audio/video to server/cloud storage
    }

    // -----------------------------
    // Automatic Start if User Prefers
    // -----------------------------
    autoStartRecording(isEnabled = false) {
        if (isEnabled) {
            this.startScreenRecording();
        }
    }
}

// -----------------------------
// Singleton instance for global use
// -----------------------------
const recorder = new Recorder();
window.recorder = recorder;

// -----------------------------
// Usage Example (can trigger from UI buttons)
// -----------------------------
// await recorder.initMic();
// recorder.startAudioRecording();
// recorder.stopAudioRecording();
// recorder.playAudio();
// recorder.downloadAudio();
// recorder.startScreenRecording();
// recorder.stopScreenRecording();
