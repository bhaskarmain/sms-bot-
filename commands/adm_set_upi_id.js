/*CMD
command: adm_set_upi_id
help: Change Admin UPI ID / VPA
need_reply: true
auto_retry_tempfail: true
answer: ✏️ Please send your new UPI ID (e.g. bhaskarswami360@fam):
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

var newUpi = (message || "").trim();
if (!newUpi || newUpi.indexOf("@") === -1) {
  Bot.sendMessage("⚠️ <b>Invalid UPI ID!</b> Must contain @ (e.g. <code>user@upi</code>).\n\nPlease send again or /cancel:");
  return;
}

Bot.setProperty("cfg_upi_id", newUpi, "string");
Bot.sendMessage("✅ <b>UPI ID Updated!</b>\nNew VPA: <code>" + newUpi + "</code>");
Bot.runCommand("adm_upi_settings");
