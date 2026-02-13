// Smart-AI-Quiz-Global: Advanced Ad Management System
let questionCounter = 0;
const personalAds = []; // ایڈمن پینل سے اپ لوڈ ہونے والے ایڈز یہاں آئیں گے

// 1. اشتہارات کو کنٹرول کرنے کا فنکشن
function trackAdProgress() {
    questionCounter++;
    
    // ہر 10 سوالوں کے بعد ایک بڑا اشتہار دکھائیں
    if (questionCounter % 10 === 0) {
        showInterstitalAd();
    }
}

// 2. 10 سوالوں کے بعد والا ایڈ (Interstitial Ad)
function showInterstitalAd() {
    console.log("Displaying 10th Question Ad...");
    
    // ایڈمن پینل سے سیٹ کیا گیا پرسنل ایڈ چیک کریں
    const currentCountry = "Pakistan"; // یہ ہم یوزر کے IP سے بھی لے سکتے ہیں
    const targetAd = personalAds.find(ad => ad.country === currentCountry);

    if (targetAd) {
        // اگر آپ کا اپنا کوئی ویڈیو یا تصویر ایڈ ہے تو وہ دکھائیں
        displayPersonalAd(targetAd);
    } else {
        // ورنہ Adsterra کا ڈائریکٹ لنک ایڈ دکھائیں (Ad #3)
        window.open("https://breachuptown.com/hzy27ig1?key=6234a8317563d50972f81c9db90823ff", "_blank");
    }
}

// 3. ایڈز کی خودکار تبدیلی (Impression Booster)
function refreshSidebarAds() {
    // ہر 30 سیکنڈ بعد سائیڈ بار کے ایڈز کو ریفریش کریں تاکہ زیادہ کمائی ہو
    setInterval(() => {
        console.log("Refreshing Ads for more impressions...");
        // یہاں ہم ایڈز کے کنٹینر کو ری لوڈ کرنے کا کوڈ ڈال سکتے ہیں
    }, 30000);
}

// 4. پرسنل ایڈ ڈسپلے لاجک
function displayPersonalAd(ad) {
    const adOverlay = document.createElement("div");
    adOverlay.id = "personal-ad-overlay";
    adOverlay.innerHTML = `
        <div class="ad-box">
            <h3>Sponsored Ad</h3>
            <img src="${ad.image}" style="width:100%; max-height:300px;">
            <p>${ad.text}</p>
            <button onclick="this.parentElement.parentElement.remove()">Skip Ad</button>
        </div>
    `;
    document.body.appendChild(adOverlay);
}

// ایڈز انجن شروع کریں
refreshSidebarAds();

