// recorder.js
// Smart-AI-Quiz-Global - Integrated Audio & Screen Recorder
// Author: Smart-AI-Quiz-Global Team
// Description: Handles microphone audio, screen video, playback, download, and future AI features.

class SmartRecorder {
    constructor() {
        // Audio recording
        this.audioRecorder = null;
        this.audioChunks = [];
        this.audioBlob = null;
        this.audioUrl = null;
        this.audioElement = null;
        this.isAudioRecording = false;

        // Screen/Video recording
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.isScreenRecording = false;
    }

    /*** Audio Recorder Methods ***/
    async initAudio() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioRecorder = new MediaRecorder(stream);
            this.audioRecorder.ondataavailable = (e) => this.audioChunks.push(e.data);
            this.audioRecorder.onstop = () => {
                this.audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(this.audioBlob);
                this.audioElement = new Audio(this.audioUrl);
                this.audioChunks = [];
            };
            console.log("Audio Recorder initialized.");
        } catch (err) {
            console.error("Audio initialization failed:", err);
            alert("Microphone access is required for voice recording.");
        }
    }

    startAudio() {
        if (!this.audioRecorder) return console.warn("Audio recorder not initialized. Call initAudio() first.");
        if (this.isAudioRecording) return console.warn("Audio recording already in progress.");
        this.audioChunks = [];
        this.audioRecorder.start();
        this.isAudioRecording = true;
        console.log("Audio recording started...");
    }

    stopAudio() {
        if (!this.audioRecorder || !this.isAudioRecording) return console.warn("No audio recording in progress.");
        this.audioRecorder.stop();
        this.isAudioRecording = false;
        console.log("Audio recording stopped.");
    }

    playAudio() {
        if (!this.audioElement) return console.warn("No audio recorded yet.");
        this.audioElement.play();
        console.log("Playing recorded audio...");
    }

    downloadAudio(filename = `SmartAI_Audio_${Date.now()}.webm`) {
        if (!this.audioBlob) return console.warn("No audio to download.");
        const a = document.createElement("a");
        a.href = this.audioUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        console.log("Audio downloaded:", filename);
    }

    /*** Screen/Video Recorder Methods ***/
    async startScreenRecording() {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always", width: 1280, height: 720 },
                audio: true // system + mic audio
            });

            this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            this.recordedChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) this.recordedChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => this.saveScreenVideo();

            this.mediaRecorder.start();
            this.isScreenRecording = true;
            console.log("Screen recording started...");

        } catch (err) {
            console.error("Screen recording error:", err);
            alert("Please allow screen capture permission to record your video.");
        }
    }

    stopScreenRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
            this.mediaRecorder.stop();
            this.isScreenRecording = false;
            console.log("Screen recording stopped.");
        } else {
            console.warn("No screen recording in progress.");
        }
    }

    saveScreenVideo() {
        if (!this.recordedChunks.length) return console.warn("No video recorded to save.");
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `SmartAI_QuizVideo_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.recordedChunks = [];
        }, 100);

        alert("Screen/Video recording saved! Ready to upload.");
    }

    /*** Future AI Features ***/
    async transcribeAudio() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("AI transcription coming soon...");
    }

    async detectLanguage() {
        if (!this.audioBlob) return console.warn("No audio recorded.");
        console.log("AI language detection coming soon...");
    }

    async noiseReduction() {
        console.log("AI noise reduction feature coming soon...");
    }

    saveToServer(userId = null) {
        if (!this.audioBlob && !this.recordedChunks.length) return console.warn("Nothing to save.");
        console.log("Upload to server/cloud feature coming soon...");
    }
}

// Singleton instance
const recorder = new SmartRecorder();
window.recorder = recorder;

// Example Usage:
// await recorder.initAudio();
// recorder.startAudio();
// recorder.stopAudio();
// recorder.playAudio();
// recorder.downloadAudio();
// recorder.startScreenRecording();
// recorder.stopScreenRecording();
