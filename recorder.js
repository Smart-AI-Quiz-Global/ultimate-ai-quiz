// recorder.js
// Smart-AI-Quiz-Global - Professional Integrated Audio + Screen Recorder
// Author: Smart-AI-Quiz-Global Team
// Description: Handles audio, screen recording, playback, download, and future AI features.

class QuizRecorder {
    constructor() {
        this.audioRecorder = null;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordedChunks = [];
        this.audioBlob = null;
        this.videoBlob = null;
        this.audioUrl = null;
        this.videoUrl = null;
        this.audioElement = null;
        this.isRecording = false;
        this.stream = null;
    }

    // Initialize Audio + Microphone
    async init() {
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioRecorder = new MediaRecorder(audioStream);
            this.audioRecorder.ondataavailable = (e) => this.audioChunks.push(e.data);
            this.audioRecorder.onstop = () => {
                this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(this.audioBlob);
                this.audioElement = new Audio(this.audioUrl);
                this.audioChunks = [];
            };
            console.log("Audio Recorder initialized successfully.");
            alert("Audio Recorder initialized!");
        } catch (err) {
            console.error("Microphone access denied or not supported:", err);
            alert("Microphone access is required for audio recording.");
        }
    }

    // Start Combined Screen + Audio Recording
    async startRecording() {
        if (this.isRecording) {
            console.warn("Recording already in progress.");
            return;
        }

        try {
            // Screen + System Audio + Microphone
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always", width: 1280, height: 720 },
                audio: true
            });

            // Merge screen + microphone
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const combinedStream = new MediaStream([...displayStream.getTracks(), ...audioStream.getTracks()]);

            this.stream = combinedStream;
            this.mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp9' });

            this.mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this.recordedChunks.push(e.data);
            };

            this.mediaRecorder.onstop = () => this.saveVideo();

            this.mediaRecorder.start();
            this.isRecording = true;
            console.log("Screen + Audio recording started.");
        } catch (err) {
            console.error("Error starting recording:", err);
            alert("Please allow screen capture and microphone access.");
        }
    }

    // Stop Recording
    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
            this.mediaRecorder.stop();
            this.isRecording = false;
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
            console.log("Recording stopped.");
        }
    }

    // Playback Recorded Audio
    playAudio() {
        if (!this.audioElement) return alert("No audio recorded yet.");
        this.audioElement.play();
        console.log("Playing recorded audio...");
    }

    // Download Audio
    downloadAudio(filename = `quiz_audio_${Date.now()}.webm`) {
        if (!this.audioBlob) return alert("No audio recorded to download.");
        const a = document.createElement("a");
        a.href = this.audioUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("Audio downloaded:", filename);
    }

    // Save Video File after Recording
    saveVideo() {
        if (this.recordedChunks.length === 0) return console.warn("No video data to save.");
        this.videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.videoUrl = URL.createObjectURL(this.videoBlob);

        const a = document.createElement('a');
        a.href = this.videoUrl;
        a.download = `Smart_AI_Quiz_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log("Screen + Audio video saved successfully.");
        this.recordedChunks = [];
        alert("Your quiz video is ready!");
    }

    // Future AI Feature: Transcription
    async transcribeAudio() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Transcription AI feature coming soon...");
        // Future: Send this.audioBlob to AI transcription API
    }

    // Future AI Feature: Language Detection
    async detectLanguage() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Language detection AI feature coming soon...");
        // Future: Send blob to AI language detection API
    }

    // Future AI Feature: Noise Reduction
    async noiseReduction() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Noise reduction AI feature coming soon...");
        // Future: Apply WebAudio noise reduction or AI model
    }

    // Future AI Feature: Upload to Cloud
    saveToServer(userId = null) {
        if (!this.audioBlob && !this.videoBlob) return console.warn("No data to upload.");
        console.log("Upload to cloud server (future feature)...");
        // Future: send this.audioBlob / this.videoBlob to cloud storage or server
    }
}

// Singleton instance
const recorder = new QuizRecorder();
window.recorder = recorder;

// Example usage via UI buttons in index.html:
// await recorder.init();
// recorder.startRecording();
// recorder.stopRecording();
// recorder.playAudio();
// recorder.downloadAudio();
