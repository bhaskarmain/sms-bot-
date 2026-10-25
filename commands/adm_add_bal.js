/*CMD
command: adm_add_bal
help: Admin manual balance credit
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
var targetId = parseInt(p[0]);
var amount = parseFloat(p[1]);

if (!targetId || !amount) {
  Bot.sendMessage("⚠️ Invalid parameters.");
  return;
}

Bot.run({
  command: "credit_user " + amount + " ADMIN_ADJUSTMENT",
  for_user: { telegramid: targetId }
});

Bot.sendMessage("✅ Credited <b>₹" + amount.toFixed(2) + "</b> to user <code>" + targetId + "</code> successfully!");
