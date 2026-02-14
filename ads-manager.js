/* 
=========================================================
Smart-AI-Quiz-Global: Ads Manager
Author: Admin
Purpose: Full-featured ad management system for Admin Panel
Features:
- Upload image/video ads
- Assign ads to country & category
- Show single ad per cycle
- Future-proof: 50+ ad slots, AI-ready, cloud-ready
- User-friendly: Prevent annoying multiple ads
- Admin can hide/show specific ads easily
=========================================================
*/

class AdsManager {
    constructor() {
        this.ads = []; // Stores all ads uploaded
        this.currentAdIndex = 0; // Track which ad is currently showing
        this.adContainer = document.getElementById("adsDisplay"); // Element where ads will render
        this.cycleDelay = 10000; // 10 seconds per ad
        this.isCycleRunning = false; // Control auto-cycle
    }

    // Upload ad from Admin Panel
    uploadAd(file, country = "all", category = "all") {
        if(!file) return console.error("No file provided!");

        const adObj = {
            id: Date.now(), // Unique ID for ad
            file: URL.createObjectURL(file),
            type: file.type.includes("video") ? "video" : "image",
            country,
            category,
            show: true // Can be toggled by Admin to hide/show
        };

        this.ads.push(adObj);
        console.log("Ad uploaded:", adObj);
        return adObj;
    }

    // Toggle ad visibility
    toggleAdVisibility(adId, visible) {
        const ad = this.ads.find(a => a.id === adId);
        if(ad) {
            ad.show = visible;
            console.log(`Ad ${adId} visibility set to:`, visible);
        }
    }

    // Get ads filtered by country & category
    getFilteredAds(userCountry = "all", userCategory = "all") {
        return this.ads.filter(ad => ad.show && 
            (ad.country === "all" || ad.country === userCountry) &&
            (ad.category === "all" || ad.category === userCategory)
        );
    }

    // Render single ad
    renderAd(adObj) {
        if(!this.adContainer) return;

        this.adContainer.innerHTML = ""; // Clear previous ad

        if(adObj.type === "image") {
            const img = document.createElement("img");
            img.src = adObj.file;
            img.style.width = "100%";
            img.style.borderRadius = "8px";
            this.adContainer.appendChild(img);
        } else if(adObj.type === "video") {
            const vid = document.createElement("video");
            vid.src = adObj.file;
            vid.controls = true;
            vid.autoplay = true;
            vid.loop = true;
            vid.style.width = "100%";
            vid.style.borderRadius = "8px";
            this.adContainer.appendChild(vid);
        }
    }

    // Start ad cycle (show 1 ad per 10 sec)
    startCycle(userCountry = "all", userCategory = "all") {
        if(this.isCycleRunning) return; // Prevent multiple intervals
        const filteredAds = this.getFilteredAds(userCountry, userCategory);

        if(filteredAds.length === 0) {
            console.warn("No ads to display for this country/category");
            return;
        }

        this.isCycleRunning = true;
        this.renderAd(filteredAds[this.currentAdIndex]);

        this.interval = setInterval(() => {
            this.currentAdIndex = (this.currentAdIndex + 1) % filteredAds.length;
            this.renderAd(filteredAds[this.currentAdIndex]);
        }, this.cycleDelay);
    }

    // Stop ad cycle
    stopCycle() {
        clearInterval(this.interval);
        this.isCycleRunning = false;
    }

    // Show specific ad immediately
    showAdNow(adId) {
        const ad = this.ads.find(a => a.id === adId && a.show);
        if(ad) {
            this.renderAd(ad);
        } else {
            console.warn("Ad not found or hidden");
        }
    }

    // Future-proof: Placeholder for AI-based ad recommendations
    aiRecommendAds(userProfile) {
        // This function will integrate AI engine in future
        // Example: Recommend ads based on user history, category interest, country
        return this.getFilteredAds(userProfile.country, userProfile.category);
    }

    // Future-proof: Placeholder for cloud-syncing ads
    syncAdsCloud() {
        // Can be connected to backend or Firebase/Cloud in future
        console.log("Syncing ads to cloud (future-ready)");
    }
}

// ===============================
// Usage Example (Admin Panel)
// ===============================
const adsManager = new AdsManager();

// Example: Upload from file input
document.getElementById("uploadAdBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("adFile");
    const country = document.getElementById("adCountry").value;
    const category = document.getElementById("adCategory").value;
    if(fileInput.files.length > 0) {
        const ad = adsManager.uploadAd(fileInput.files[0], country, category);
        fileInput.value = ""; // Reset file input
        console.log("Uploaded ad:", ad);
    }
});

// Example: Start ad cycle for all users
document.addEventListener("DOMContentLoaded", () => {
    adsManager.startCycle("all", "all");
});

// Example: Stop cycle manually (optional for admin)
document.getElementById("stopAdsCycleBtn")?.addEventListener("click", () => {
    adsManager.stopCycle();
});

// Example: Show single ad on-demand
document.getElementById("showSpecificAdBtn")?.addEventListener("click", () => {
    const adId = parseInt(document.getElementById("specificAdId").value);
    adsManager.showAdNow(adId);
});

// ===============================
// Advanced Features Planned:
// - Schedule ads per time/day
// - Analytics: Views & clicks
// - Target ads based on user AI behavior
// - Multi-language support for ads
// - Cloud upload & backup
// - Hide specific ads on-demand (user-friendly)
// ===============================
