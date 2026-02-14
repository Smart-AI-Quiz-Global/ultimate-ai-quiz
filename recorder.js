// recorder.js
// Smart-AI-Quiz-Global - Professional Audio & Screen Recorder Module
// Author: Smart-AI-Quiz-Global Team
// Description: Handles audio recording, screen recording, playback, download, and future AI-powered features.

class Recorder {
    constructor() {
        // Audio Recording
        this.audioRecorder = null;
        this.audioChunks = [];
        this.audioBlob = null;
        this.audioUrl = null;
        this.audioElement = null;
        this.isAudioRecording = false;

        // Screen Recording
        this.screenRecorder = null;
        this.screenChunks = [];
        this.isScreenRecording = false;

        // User Preferences
        this.isAutoScreenRecordEnabled = false; // Future: auto-record quiz
    }

    /* --------------------------
       Audio Recorder Methods
    -------------------------- */
    async initAudio() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioRecorder = new MediaRecorder(stream);
            
            this.audioRecorder.ondataavailable = e => this.audioChunks.push(e.data);
            this.audioRecorder.onstop = () => {
                this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(this.audioBlob);
                this.audioElement = new Audio(this.audioUrl);
                this.audioChunks = [];
            };
            console.log("Audio Recorder initialized successfully.");
        } catch (err) {
            console.error("Microphone access denied:", err);
            alert("Microphone access is required for voice recording.");
        }
    }

    startAudioRecording() {
        if (!this.audioRecorder) return console.warn("Audio recorder not initialized.");
        if (this.isAudioRecording) return console.warn("Audio recording already in progress.");
        this.audioChunks = [];
        this.audioRecorder.start();
        this.isAudioRecording = true;
        console.log("Audio recording started...");
    }

    stopAudioRecording() {
        if (!this.audioRecorder || !this.isAudioRecording) return console.warn("No audio recording in progress.");
        this.audioRecorder.stop();
        this.isAudioRecording = false;
        console.log("Audio recording stopped.");
    }

    playAudio() {
        if (!this.audioElement) return console.warn("No recorded audio found.");
        this.audioElement.play();
    }

    downloadAudio(filename = `SmartAI_Quiz_Audio_${Date.now()}.webm`) {
        if (!this.audioBlob) return console.warn("No audio recorded to download.");
        const a = document.createElement('a');
        a.href = this.audioUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("Audio downloaded:", filename);
    }

    /* --------------------------
       Screen Recorder Methods
    -------------------------- */
    async startScreenRecording() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always", width: 1280, height: 720 },
                audio: true
            });

            this.screenRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            
            this.screenRecorder.ondataavailable = event => {
                if (event.data.size > 0) this.screenChunks.push(event.data);
            };
            this.screenRecorder.onstop = () => this.saveScreenRecording();

            this.screenRecorder.start();
            this.isScreenRecording = true;
            console.log("Screen recording started...");
        } catch (err) {
            console.error("Screen recording error:", err);
            alert("Screen capture permission required.");
        }
    }

    stopScreenRecording() {
        if (!this.screenRecorder || !this.isScreenRecording) return console.warn("No screen recording in progress.");
        this.screenRecorder.stop();
        this.isScreenRecording = false;
        console.log("Screen recording stopped.");
    }

    saveScreenRecording() {
        const blob = new Blob(this.screenChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `SmartAI_Quiz_Video_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.screenChunks = [];
        }, 100);
        alert("Quiz video ready! You can upload it to YouTube.");
    }

    /* --------------------------
       Future AI-Powered Methods
    -------------------------- */
    async transcribeAudio() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Transcription AI coming soon...");
    }

    async detectLanguage() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("Language detection AI coming soon...");
    }

    async noiseReduction() {
        console.log("Noise reduction AI coming soon...");
    }

    async saveToServer(userId = null) {
        if (!this.audioBlob) return console.warn("No audio to upload.");
        console.log("Uploading audio/video to server (future feature)...");
    }
}

// Singleton Instance
const recorder = new Recorder();
window.recorder = recorder;
