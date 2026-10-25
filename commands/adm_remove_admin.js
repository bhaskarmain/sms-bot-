/*CMD
command: adm_remove_admin
help: Remove an admin from team
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ Only Super Admin can remove admins.");
  return;
}

var remId = parseInt((params || "").trim());
if (!remId || remId == 8789936408) {
  Bot.sendMessage("⚠️ Cannot remove Super Admin.");
  return;
}

var list = Bot.getProperty("admin_team_list") || [8789936408];
var newList = [];
for (var i = 0; i < list.length; i++) {
  if (list[i] != remId) newList.push(list[i]);
}
Bot.setProperty("admin_team_list", newList, "json");
Bot.setProperty("admin_" + remId, false, "boolean");

Bot.sendMessage("✅ Removed <code>" + remId + "</code> from Admin team.");
Bot.runCommand("adm_admins_menu");
