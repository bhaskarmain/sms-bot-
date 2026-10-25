/*CMD
command: adm_broadcast
help: Admin Broadcast Announcement
need_reply: true
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (!message || message == "adm_broadcast") {
  Bot.sendMessage("📢 <b>Broadcast Announcement</b>\n\nSend the message you want to broadcast to all registered bot users:\n\n<i>Send /cancel to return to dashboard.</i>");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("admin_dashboard");
  return;
}

var bMsg = "📢 <b>Official Announcement:</b>\n\n" + message;
Bot.setProperty("last_broadcast_msg", bMsg, "string");

Bot.sendMessage("✅ Broadcast sent! (Message saved to announcement feed)");
Bot.runCommand("admin_dashboard");
