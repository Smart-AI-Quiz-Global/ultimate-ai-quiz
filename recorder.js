// Smart-AI-Quiz-Global: Professional Screen Recorder
let mediaRecorder;
let recordedChunks = [];

async function startRecording() {
    try {
        // صرف 16:9 والے فریم (Canvas/Screen) کو کیپچر کرنا
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: { 
                cursor: "always",
                displaySurface: "browser",
                width: 1280,
                height: 720
            },
            audio: true // سسٹم کی آواز (AI کی آواز اور میوزک) ریکارڈ کرنے کے لیے
        });

        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            saveVideo();
        };

        mediaRecorder.start();
        console.log("Recording started...");

    } catch (err) {
        console.error("Error starting recording: ", err);
        alert("Please allow screen capture to record your video.");
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("Recording stopped.");
    }
}

// 10 سوالات کے بعد ویڈیو محفوظ کرنے کا فنکشن
function saveVideo() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    
    // ڈاؤن لوڈ لنک بنانا
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `Smart_AI_Quiz_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    
    // صفائی (Cleanup)
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        recordedChunks = [];
    }, 100);

    alert("Your quiz video is ready! You can now upload it to YouTube.");
}

// اگر یوزر نے سیٹ اپ اسکرین پر 'Yes' کیا ہو تو خودکار ریکارڈنگ شروع کریں
function checkRecordingPreference() {
    if (isRecordingEnabled) {
        startRecording();
    }
}

