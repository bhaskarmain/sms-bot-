/*CMD
command: adm_list_recent_users
help: List recent users
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var recentUsers = Bot.getProperty("recent_users_list") || [
  { id: 8789936408, name: "Super Admin", is_admin: true }
];

var text = "👥 <b>Recent Registered Users</b>\n\n";
for (var i = 0; i < recentUsers.length; i++) {
  var u = recentUsers[i];
  var banned = Bot.getProperty("banned_" + u.id) ? "🚫 BANNED" : "";
  var adm = (u.id == 8789936408 || Bot.getProperty("admin_" + u.id)) ? "👑 ADMIN" : "";
  text += "• ID: <code>" + u.id + "</code> | " + (u.name || "User") + " " + adm + " " + banned + "\n";
}

var buttons = [
  [{ title: "🔙 Back to Users", command: "adm_users" }]
];

Bot.sendInlineKeyboard(buttons, text);
