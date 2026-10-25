/*CMD
command: adm_pay_approve
help: Approve payment and credit user
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var payId = (params || "").trim();
var p = Bot.getProperty("pay_item_" + payId);

if (!p) {
  Bot.sendMessage("⚠️ Payment not found or already processed.");
  return;
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

// Update stats
var totalDeps = Bot.getProperty("stat_total_deposits") || 0.0;
Bot.setProperty("stat_total_deposits", totalDeps + p.amount, "float");

// Run credit command in user context
Bot.run({
  command: "credit_user " + p.amount + " " + p.utr,
  for_user: { telegramid: p.user_id }
});

var text = "✅ <b>Payment #" + p.id + " Approved & Credited!</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "👤 <b>User:</b> " + p.user_name + " (ID: <code>" + p.user_id + "</code>)\n" +
  "💰 <b>Amount:</b> <b>₹" + p.amount.toFixed(2) + "</b>\n" +
  "🔢 <b>UTR:</b> <code>" + (p.utr || "N/A") + "</code>\n" +
  "🆔 <b>Ref:</b> <code>" + p.id + "</code>\n" +
  "⚡ <b>Verified By:</b> Admin (<code>" + user.telegramid + "</code>)\n" +
  "📅 <b>Approved At:</b> " + new Date().toLocaleString();

var buttons = [
  [{ title: "💳 Pending Payments", command: "adm_payments", style: "primary" }],
  [{ title: "🔙 Admin Dashboard", command: "admin_dashboard", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
