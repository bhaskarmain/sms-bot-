/*CMD
command: adm_set_fsub_id
help: Set Force Channel ID or Username
need_reply: true
auto_retry_tempfail: true
answer: 📢 Please send your Channel Username or ID (e.g. @MyChannel or -100123456789):
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("adm_forcesub_menu");
  return;
}

var val = (message || "").trim();
Bot.setProperty("force_channel_id", val, "string");
Bot.sendMessage("✅ <b>Force Channel ID set to:</b> <code>" + val + "</code>");
Bot.runCommand("adm_forcesub_menu");
