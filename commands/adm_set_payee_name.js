/*CMD
command: adm_set_payee_name
help: Change Admin Payee Name
need_reply: true
auto_retry_tempfail: true
answer: ✏️ Please send your Payee Name (e.g. Bhaskar Swami):
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("adm_upi_settings");
  return;
}

var newName = (message || "").trim();
if (!newName) {
  Bot.sendMessage("⚠️ Please send a valid name or /cancel:");
  return;
}

Bot.setProperty("cfg_payee_name", newName, "string");
Bot.sendMessage("✅ <b>Payee Name Updated!</b>\nNew Name: <b>" + newName + "</b>");
Bot.runCommand("adm_upi_settings");
