/*CMD
command: menu_help
help: Help and FAQ
need_reply: false
auto_retry_tempfail: true
CMDs*/

var support = "@Talk_tooo_admin_bot";

var text = "ℹ️ <b>Help & Frequently Asked Questions</b>\n\n" +
  "<b>1. How does it work?</b>\n" +
  "• Select a service (Telegram, WhatsApp, etc.).\n" +
  "• Receive a 20-minute temporary number.\n" +
  "• Tap Refresh SMS to get your OTP code instantly.\n\n" +
  "<b>2. How to deposit?</b>\n" +
  "• Tap Wallet & Deposit.\n" +
  "• Scan the UPI QR code with any app (GPay/PhonePe/Paytm).\n" +
  "• Submit 12-digit UTR to get credited.\n\n" +
  "<b>3. Support:</b>\n" +
  "Contact official support at " + support;

var buttons = [
  [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
