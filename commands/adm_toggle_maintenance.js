/*CMD
command: adm_toggle_maintenance
help: Toggle Maintenance Mode
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) return;

var cur = Bot.getProperty("maintenance_mode") || false;
var nextVal = !cur;
Bot.setProperty("maintenance_mode", nextVal, "boolean");

Bot.sendMessage("🛠 <b>Maintenance mode set to:</b> " + (nextVal ? "<b>ACTIVE (Locked) 🔴</b>" : "<b>INACTIVE (Open) 🟢</b>"));
Bot.runCommand("admin_dashboard");
