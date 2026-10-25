/*CMD
command: deposit_qr
help: Generate UPI payment instructions
need_reply: false
auto_retry_tempfail: true
CMDs*/

var amt = parseFloat(params || "50");
User.setProperty("pending_deposit_amount", amt, "float");

var upiId = "bhaskarswami360@fam";
var payee = "Bhaskar Swami";
var refId = "PAY-" + Date.now();
var upiUrl = "upi://pay?pa=" + encodeURIComponent(upiId) + "&pn=" + encodeURIComponent(payee) + "&am=" + amt.toFixed(2) + "&cu=INR&tr=" + refId;

var msg = "💳 <b>UPI Deposit Instructions</b>\n\n" +
  "💰 <b>Amount:</b> <b>₹" + amt.toFixed(2) + "</b>\n" +
  "📍 <b>UPI ID (VPA):</b> <code>" + upiId + "</code> (tap to copy)\n" +
  "👤 <b>Payee Name:</b> " + payee + "\n" +
  "🆔 <b>Ref ID:</b> <code>" + refId + "</code>\n\n" +
  "<b>How to Pay:</b>\n" +
  "1. Pay exact <b>₹" + amt.toFixed(2) + "</b> using GPay, PhonePe, Paytm, Cred, or BHIM.\n" +
  "2. Copy the <b>12-digit UTR / Reference number</b> from your payment receipt.\n" +
  "3. Tap <b>✍️ Submit 12-Digit UTR</b> below and send it.";

var buttons = [
  [{ title: "✍️ Submit 12-Digit UTR", command: "ask_utr" }],
  [{ title: "🔙 Back to Wallet", command: "menu_wallet" }]
];

Bot.sendInlineKeyboard(buttons, msg);
