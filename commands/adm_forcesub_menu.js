/*CMD
command: adm_forcesub_menu
help: Force Channel Join Settings
need_reply: false
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var isEnabled = Bot.getProperty("force_channel_enabled") || false;
var channelId = Bot.getProperty("force_channel_id") || "Not Set";
var channelUrl = Bot.getProperty("force_channel_url") || "Not Set";

var text = "📢 <b>Force Channel Join Settings</b>\n\n" +
  "📌 <b>Status:</b> " + (isEnabled ? "🟢 ENABLED" : "🔴 DISABLED") + "\n" +
  "🆔 <b>Channel ID:</b> <code>" + channelId + "</code>\n" +
  "🔗 <b>Channel URL:</b> <code>" + channelUrl + "</code>";

var buttons = [
  [{ title: (isEnabled ? "🔴 Turn OFF Force Sub" : "🟢 Turn ON Force Sub"), command: "adm_toggle_fsub", style: isEnabled ? "danger" : "success" }],
  [{ title: "✏️ Set Channel ID / @Username", command: "adm_set_fsub_id", style: "primary" }],
  [{ title: "🔗 Set Channel Invite Link", command: "adm_set_fsub_url", style: "primary" }],
  [{ title: "🔙 Back to Admin Dashboard", command: "admin_dashboard", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
