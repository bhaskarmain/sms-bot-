/*CMD
command: adm_add_admin_prompt
help: Prompt to add new admin
need_reply: true
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ Only Super Admin can appoint new admins.");
  return;
}

if (!message || message == "adm_add_admin_prompt") {
  Bot.sendMessage("👑 <b>Add New Admin</b>\n\nPlease send the numeric Telegram User ID of the user you want to appoint as Admin:\n\n<i>Example: <code>123456789</code></i>");
  return;
}

var newAdmId = parseInt((message || "").trim());
if (isNaN(newAdmId)) {
  Bot.sendMessage("⚠️ Invalid ID format. Send numeric ID:");
  Bot.runCommand("adm_add_admin_prompt");
  return;
}

var list = Bot.getProperty("admin_team_list") || [8789936408];
if (list.indexOf(newAdmId) === -1) {
  list.push(newAdmId);
  Bot.setProperty("admin_team_list", list, "json");
  Bot.setProperty("admin_" + newAdmId, true, "boolean");
}

Bot.sendMessage("✅ Appointed <code>" + newAdmId + "</code> as Admin!");
Bot.runCommand("adm_admins_menu");
