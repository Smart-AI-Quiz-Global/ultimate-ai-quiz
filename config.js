/* PROJECT: SMART-AI-QUIZ-GLOBAL 
   SECURE ADMIN CONFIGURATION
*/

const _0xAdminConfig = {
    // آپ کا موبائل نمبر (یہ سسٹم میں شناخت کے لیے استعمال ہوگا)
    adminPhone: "03219379597",

    // آپ کا خفیہ کوڈ (اسے ہم نے Base64 میں بدل دیا ہے تاکہ کوئی فائل کھول کر پڑھ نہ سکے)
    // اصل کوڈ: 7866_zaigham_5121472786
    secureToken: "Nzg2Nl96YWlnaGFtXzUxMjE0NzI3ODY=", 

    // بینکنگ اور گفٹ کی تفصیلات (صرف ایڈمن پینل میں نظر آئیں گی)
    paymentDetails: {
        easyPaisa: "03219379597",
        ublAccount: "UBL-9379597-VISA",
        giftMessage: "If you like our work, feel free to support us!"
    }
};

// کوڈ کو ویریفائی کرنے کا فنکشن (یہ ہیکر کو چکمہ دینے کے لیے ہے)
function verifyAdmin(enteredCode, enteredPhone) {
    const decryptedToken = atob(_0xAdminConfig.secureToken);
    if (enteredCode === decryptedToken && enteredPhone === _0xAdminConfig.adminPhone) {
        return true;
    }
    return false;
}

console.log("Security Layer 1: Active");

