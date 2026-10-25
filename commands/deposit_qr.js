/*CMD
command: deposit_qr
help: Generate UPI payment QR photo & instructions
need_reply: false
auto_retry_tempfail: true
CMDs*/

var amt = parseFloat(params) || 50.0;
User.setProperty("pending_deposit_amount", amt, "float");

var upiId = Bot.getProperty("cfg_upi_id") || "bhaskarswami360@fam";
var payeeName = Bot.getProperty("cfg_payee_name") || "Bhaskar Swami";
var note = "SMSBOT" + user.telegramid + "_" + Math.floor(Math.random() * 9000 + 1000);
User.setProperty("pending_pay_ref", note, "string");

var upiUri = "upi://pay?pa=" + encodeURIComponent(upiId) +
  "&pn=" + encodeURIComponent(payeeName) +
  "&am=" + amt.toFixed(2) +
  "&cu=INR&tn=" + encodeURIComponent(note);

var qrImgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=2&data=" + encodeURIComponent(upiUri);

var text = "💳 <b>Instant UPI Payment (Scan & Pay)</b>\n\n" +
  "💰 <b>Amount to Pay:</b> <b>₹" + amt.toFixed(2) + "</b>\n" +
  "🆔 <b>UPI ID:</b> <code>" + upiId + "</code> (tap to copy)\n" +
  "👤 <b>Payee:</b> " + payeeName + "\n" +
  "📝 <b>Reference:</b> <code>" + note + "</code>\n\n" +
  "<b>Step-by-Step Instructions:</b>\n" +
  "1. Scan the QR code above with any UPI app (GPay, PhonePe, Paytm, CRED).\n" +
  "2. Pay the exact amount of <b>₹" + amt.toFixed(2) + "</b>.\n" +
  "3. Tap <b>✍️ Submit 12-Digit UTR</b> below and send the UPI Reference Number.";

var telegramButtons = [
  [{ text: "✍️ Submit 12-Digit UTR", callback_data: "ask_utr" }],
  [
    { text: "🔄 Check Status", callback_data: "deposit_qr " + amt },
    { text: "❌ Cancel Deposit", callback_data: "menu_wallet" }
  ],
  [{ text: "🔙 Back to Wallet", callback_data: "menu_wallet" }]
];

var bbButtons = [
  [{ title: "✍️ Submit 12-Digit UTR", command: "ask_utr" }],
  [
    { title: "🔄 Check Status", command: "deposit_qr " + amt },
    { title: "❌ Cancel Deposit", command: "menu_wallet" }
  ],
  [{ title: "🔙 Back to Wallet", command: "menu_wallet" }]
];

// Try sending native photo via Telegram Bot API
var photoSent = false;
try {
  Api.sendPhoto({
    photo: qrImgUrl,
    caption: text,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: telegramButtons }
  });
  photoSent = true;
} catch (e) {
  photoSent = false;
}

// Fallback: Send message with embedded image preview link if Api.sendPhoto wasn't delivered
if (!photoSent) {
  var htmlMsg = '<a href="' + qrImgUrl + '">&#8205;</a>' + text;
  Bot.sendInlineKeyboard(bbButtons, htmlMsg);
}
