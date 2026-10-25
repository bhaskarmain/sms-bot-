/*CMD
command: /admin
help: Super Admin Dashboard Shortcut
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ <b>Access Denied:</b> Super Admin privileges required.");
  return;
}

Bot.runCommand("admin_dashboard");
