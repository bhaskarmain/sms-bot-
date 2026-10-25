/*CMD
command: adm_audit_logs
help: System Audit Logs
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var logs = Bot.getProperty("audit_logs_list") || [];

var text = "📜 <b>System Audit Logs</b>\n\n";

if (logs.length === 0) {
  text += "No recorded audit actions yet.";
} else {
  for (var i = 0; i < Math.min(logs.length, 10); i++) {
    var l = logs[i];
    text += "• [" + l.time + "] <b>" + l.action + "</b>\n  Admin: <code>" + l.admin + "</code> | Details: " + (l.details || "N/A") + "\n\n";
  }
}

var buttons = [
  [{ title: "🔄 Refresh", command: "adm_audit_logs", style: "primary" }],
  [{ title: "🔙 Back to Dashboard", command: "admin_dashboard", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
