/*CMD
command: adm_users
help: Admin Users Manager
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var text = "👥 <b>User Management</b>\n\nSelect an option below:";
var buttons = [
  [
    { title: "🔍 Search User by ID", command: "adm_search_user" },
    { title: "👑 Admin Team", command: "adm_admins_menu" }
  ],
  [
    { title: "📋 List Recent Users", command: "adm_list_recent_users" }
  ],
  [
    { title: "🔙 Back to Dashboard", command: "admin_dashboard" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
