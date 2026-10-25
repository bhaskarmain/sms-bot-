/*CMD
command: adm_set_fsub_url
help: Set Force Channel Invite URL
need_reply: true
auto_retry_tempfail: true
answer: 🔗 Please send your Channel Invite Link (e.g. https://t.me/MyChannel):
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
Bot.setProperty("force_channel_url", val, "string");
Bot.sendMessage("✅ <b>Force Channel Link set to:</b> <code>" + val + "</code>");
Bot.runCommand("adm_forcesub_menu");
