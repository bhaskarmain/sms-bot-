/*CMD
command: adm_pay_view
help: View payment details for verification
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var payId = (params || "").trim();
var p = Bot.getProperty("pay_item_" + payId);

if (!p) {
  Bot.sendMessage("⚠️ Payment record not found or expired.");
  Bot.runCommand("adm_payments");
  return;
}

var text = "🔍 <b>Payment Verification Details</b>\n\n" +
  "🆔 <b>Ref ID:</b> <code>" + p.id + "</code>\n" +
  "👤 <b>User:</b> " + p.user_name + " (ID: <code>" + p.user_id + "</code>)\n" +
  "💰 <b>Amount:</b> <b>₹" + p.amount.toFixed(2) + "</b>\n" +
  "🔢 <b>Submitted UTR:</b> <code>" + (p.utr || "NOT_SUBMITTED") + "</code>\n" +
  "📅 <b>Submitted At:</b> " + p.date + "\n\n" +
  "Verify UTR in your bank app. Tap Approve to credit user balance.";

var buttons = [
  [{ title: "✅ Approve & Credit", command: "adm_pay_approve " + p.id }],
  [{ title: "❌ Reject Payment", command: "adm_pay_reject " + p.id }],
  [{ title: "🔙 Back to Payments", command: "adm_payments" }]
];

Bot.sendInlineKeyboard(buttons, text);
