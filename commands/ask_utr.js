/*CMD
command: ask_utr
help: Prompt for 12-digit UTR
need_reply: true
auto_retry_tempfail: true
CMDs*/

var amt = User.getProperty("pending_deposit_amount") || 50.0;

// If user hasn't sent message yet, show prompt
if (!message || message == "ask_utr") {
  Bot.sendMessage("✍️ <b>Submit 12-Digit UTR Number</b>\n\nAmount: <b>₹" + amt.toFixed(2) + "</b>\n\nPlease send your 12-digit UPI reference number from your payment receipt (e.g. <code>429182374650</code>):");
  return;
}

var rawUtr = (message || "").trim().replace(/[\s\-]/g, "");

if (!/^[0-9a-zA-Z]{12}$/.test(rawUtr)) {
  Bot.sendMessage("⚠️ <b>Invalid UTR Format!</b>\n\nA valid UPI reference number consists of exactly 12 alphanumeric characters (e.g. <code>429182374650</code>).\n\nPlease send the 12-digit UTR now:");
  Bot.runCommand("ask_utr");
  return;
}

// Generate payment ID
var payId = "PAY" + Date.now();
var queue = Bot.getProperty("pending_payments_queue") || [];
queue.unshift({
  id: payId,
  user_id: user.telegramid,
  user_name: user.first_name || "User",
  amount: amt,
  utr: rawUtr,
  date: new Date().toLocaleString()
});
Bot.setProperty("pending_payments_queue", queue, "json");
Bot.setProperty("pay_item_" + payId, {
  id: payId,
  user_id: user.telegramid,
  user_name: user.first_name || "User",
  amount: amt,
  utr: rawUtr,
  date: new Date().toLocaleString()
}, "json");

// Send alert to admin
var adminId = 8789936408;
var adminAlert = "🔔 <b>New UPI Deposit Request!</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "👤 User: " + (user.first_name || "User") + " (ID: <code>" + user.telegramid + "</code>)\n" +
  "💰 Amount: <b>₹" + amt.toFixed(2) + "</b>\n" +
  "🔢 Submitted UTR: <code>" + rawUtr + "</code>\n" +
  "🆔 Payment ID: <code>" + payId + "</code>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Verify in your bank app and tap Approve below:";

var adminButtons = [
  [{ title: "✅ Approve & Credit ₹" + amt.toFixed(2), command: "adm_pay_approve " + payId }]
];

Bot.sendInlineKeyboardToChatWithId(adminId, adminButtons, adminAlert);

var userMsg = "⏳ <b>Payment Request Submitted to Admin!</b>\n\n" +
  "• Submitted UTR: <code>" + rawUtr + "</code>\n" +
  "• Amount: <b>₹" + amt.toFixed(2) + "</b>\n" +
  "• Status: <b>Pending Admin Approval</b>\n\n" +
  "Your balance will be credited as soon as the admin verifies your receipt.";

Bot.sendInlineKeyboard([
  [{ title: "💳 Back to Wallet", command: "menu_wallet" }],
  [{ title: "🏠 Main Menu", command: "/start" }]
], userMsg);
