/*CMD
command: adm_search_user
help: Search user by Telegram ID
need_reply: true
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (!message || message == "adm_search_user") {
  Bot.sendMessage("🔍 <b>Search User</b>\n\nSend numeric Telegram User ID to inspect (e.g. <code>123456789</code>):");
  return;
}

var targetId = parseInt((message || "").trim());
if (isNaN(targetId)) {
  Bot.sendMessage("⚠️ Invalid ID. Please enter a valid numeric ID:");
  Bot.runCommand("adm_search_user");
  return;
}

var isBanned = Bot.getProperty("banned_" + targetId) || false;
var text = "👤 <b>User Inspection:</b> <code>" + targetId + "</code>\n\n" +
  "• Status: " + (isBanned ? "🚫 <b>BANNED</b>" : "🟢 <b>ACTIVE</b>") + "\n" +
  "• Role: " + (Bot.getProperty("admin_" + targetId) ? "👑 Admin" : "Regular User") + "\n\n" +
  "Select an administrative action:";

var buttons = [
  [{ title: (isBanned ? "✅ Unban User" : "🚫 Ban User"), command: "adm_ban_toggle " + targetId, style: isBanned ? "success" : "danger" }],
  [{ title: "➕ Add ₹50 Balance", command: "adm_add_bal " + targetId + " 50", style: "success" }],
  [{ title: "➕ Add ₹100 Balance", command: "adm_add_bal " + targetId + " 100", style: "success" }],
  [{ title: "🔙 Back to Users", command: "adm_users", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
