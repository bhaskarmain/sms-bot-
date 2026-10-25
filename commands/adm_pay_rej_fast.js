/*CMD
command: adm_pay_rej_fast
help: Execute payment rejection with reason
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var p = (params || "").trim().split(" ");
var payId = p[0];
var reasonType = p[1] || "invalid";

var reasonText = "Transaction could not be verified in bank records";
if (reasonType === "invalid") reasonText = "Invalid or non-existent UTR number";
else if (reasonType === "mismatch") reasonText = "Amount received does not match deposit request";
else if (reasonType === "not_rec") reasonText = "Payment not credited to beneficiary bank account";

var item = Bot.getProperty("pay_item_" + payId);
if (item) {
  Bot.sendMessageToChatWithId(item.user_id, "❌ <b>Payment Rejected</b>\n\n🆔 <b>Ref:</b> <code>" + payId + "</code>\n💰 <b>Amount:</b> ₹" + item.amount.toFixed(2) + "\n⚠️ <b>Reason:</b> " + reasonText + "\n\n<i>If you believe this is an error, please contact Support.</i>");
}

// Remove from pending queue
var queue = Bot.getProperty("pending_payments_queue") || [];
var newQueue = [];
for (var i = 0; i < queue.length; i++) {
  if (queue[i].id !== payId) {
    newQueue.push(queue[i]);
  }
}
Bot.setProperty("pending_payments_queue", newQueue, "json");
Bot.setProperty("pay_item_" + payId, null);

Bot.sendInlineKeyboard([
  [{ title: "💳 Pending Payments", command: "adm_payments", style: "primary" }],
  [{ title: "🔙 Admin Dashboard", command: "admin_dashboard", style: "primary" }]
], "❌ <b>Payment #" + payId + " REJECTED</b>\n\nReason: <i>" + reasonText + "</i>");
