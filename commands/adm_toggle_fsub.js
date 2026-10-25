/*CMD
command: adm_toggle_fsub
help: Toggle Force Sub
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) return;

var cur = Bot.getProperty("force_channel_enabled") || false;
Bot.setProperty("force_channel_enabled", !cur, "boolean");

Bot.sendMessage("📢 Force Sub set to: <b>" + (!cur ? "ENABLED 🟢" : "DISABLED 🔴") + "</b>");
Bot.runCommand("adm_forcesub_menu");
