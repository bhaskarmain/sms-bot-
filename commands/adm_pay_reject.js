/*CMD
command: adm_pay_reject
help: Reject payment prompt
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
  Bot.sendMessage("⚠️ Payment not found.");
  return;
}

var buttons = [
  [{ title: "❌ Invalid / Fake UTR", command: "adm_pay_rej_fast " + payId + " invalid", style: "danger" }],
  [{ title: "❌ Amount Mismatch", command: "adm_pay_rej_fast " + payId + " mismatch", style: "danger" }],
  [{ title: "❌ Not Received in Bank", command: "adm_pay_rej_fast " + payId + " not_rec", style: "danger" }],
  [{ title: "🔙 Cancel", command: "adm_payments", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, "❌ <b>Reject Payment #" + payId + " (₹" + p.amount.toFixed(2) + ")</b>\n\nSelect a rejection reason below:");
