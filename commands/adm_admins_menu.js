/*CMD
command: adm_admins_menu
help: Admin Team Management
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var adminList = Bot.getProperty("admin_team_list") || [8789936408];

var text = "👑 <b>Admin Team Management</b>\n\nActive Administrators: <b>" + adminList.length + "</b>\n\n";

var buttons = [];
for (var i = 0; i < adminList.length; i++) {
  var aid = adminList[i];
  var isPrimary = (aid == 8789936408);
  var tag = isPrimary ? " 🌟 (Super Admin)" : "";
  text += "• <b>Admin</b>" + tag + "\n  ID: <code>" + aid + "</code>\n\n";

  if (!isPrimary) {
    buttons.push([
      { title: "❌ Remove Admin (" + aid + ")", command: "adm_remove_admin " + aid, style: "danger" }
    ]);
  }
}

buttons.push([
  { title: "➕ Add New Admin by ID", command: "adm_add_admin_prompt", style: "success" }
]);
buttons.push([
  { title: "🔄 Refresh List", command: "adm_admins_menu", style: "primary" },
  { title: "🔙 Back to Dashboard", command: "admin_dashboard", style: "primary" }
]);

Bot.sendInlineKeyboard(buttons, text);
