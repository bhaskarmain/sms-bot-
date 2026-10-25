/*CMD
command: adm_ban_toggle
help: Toggle ban status for a user
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var targetId = parseInt((params || "").trim());
if (!targetId) return;

var curBanned = Bot.getProperty("banned_" + targetId) || false;
var nextBanned = !curBanned;
Bot.setProperty("banned_" + targetId, nextBanned, "boolean");

var bannedCount = Bot.getProperty("stat_banned_count") || 0;
Bot.setProperty("stat_banned_count", nextBanned ? (bannedCount + 1) : Math.max(0, bannedCount - 1), "integer");

Bot.sendMessage("✅ User <code>" + targetId + "</code> has been " + (nextBanned ? "<b>BANNED 🚫</b>" : "<b>UNBANNED 🟢</b>") + " successfully!");
Bot.runCommand("admin_dashboard");
