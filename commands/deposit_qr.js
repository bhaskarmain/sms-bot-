/*CMD
command: deposit_qr
help: Generate UPI payment QR & instructions
need_reply: false
auto_retry_tempfail: true
CMDs*/

var amt = parseFloat(params) || 50.0;
User.setProperty("pending_deposit_amount", amt, "float");

var upiId = "bhaskarswami360@fam";
var payeeName = "Bhaskar Swami";
var note = "SMSBOT" + user.telegramid + "_" + Math.floor(Math.random() * 9000 + 1000);
User.setProperty("pending_pay_ref", note, "string");

var upiUri = "upi://pay?pa=" + encodeURIComponent(upiId) +
  "&pn=" + encodeURIComponent(payeeName) +
  "&am=" + amt.toFixed(2) +
  "&cu=INR&tn=" + encodeURIComponent(note);

var qrImgUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(upiUri);

var text = "💳 <b>Instant UPI Payment</b>\n\n" +
  "💰 <b>Amount to Pay:</b> <b>₹" + amt.toFixed(2) + "</b>\n" +
  "🆔 <b>UPI ID:</b> <code>" + upiId + "</code> (tap to copy)\n" +
  "👤 <b>Payee:</b> " + payeeName + "\n" +
  "📝 <b>Reference:</b> <code>" + note + "</code>\n\n" +
  "<b>Instructions:</b>\n" +
  "1. Scan QR code or copy the UPI ID into GPay, PhonePe, Paytm, or CRED.\n" +
  "2. Complete the payment of exact ₹" + amt.toFixed(2) + ".\n" +
  "3. Tap <b>Submit 12-Digit UTR</b> below and send the UPI Reference Number.";

var buttons = [
  [{ title: "✍️ Submit 12-Digit UTR", command: "ask_utr" }],
  [
    { title: "🔄 Check Status", command: "deposit_qr " + amt },
    { title: "❌ Cancel Deposit", command: "menu_wallet" }
  ],
  [{ title: "🔙 Back to Wallet", command: "menu_wallet" }]
];

Bot.sendInlineKeyboard(buttons, text);
