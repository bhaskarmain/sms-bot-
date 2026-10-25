/*CMD
command: adm_payments
help: Admin Payments Hub Queue
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var queue = Bot.getProperty("pending_payments_queue") || [];

if (queue.length === 0) {
  var emptyText = "💳 <b>Pending Payments Queue</b>\n\n🎉 No pending payments awaiting verification right now!";
  var emptyKb = [
    [{ title: "🔙 Back to Dashboard", command: "admin_dashboard", style: "primary" }]
  ];
  Bot.sendInlineKeyboard(emptyKb, emptyText);
  return;
}

var buttons = [];
for (var i = 0; i < Math.min(queue.length, 10); i++) {
  var p = queue[i];
  buttons.push([
    { title: "⏳ ₹" + p.amount.toFixed(2) + " | " + (p.utr || "No UTR"), command: "adm_pay_view " + p.id, style: "success" }
  ]);
}

buttons.push([
  { title: "🔄 Refresh List", command: "adm_payments", style: "primary" },
  { title: "🔙 Admin Dashboard", command: "admin_dashboard", style: "primary" }
]);

var text = "💳 <b>Pending Payments (" + queue.length + " items)</b>\n\nTap a payment to inspect, approve, or reject:";
Bot.sendInlineKeyboard(buttons, text);
