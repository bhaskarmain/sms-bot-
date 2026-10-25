/*CMD
command: tm_on_view_all
help: Callback for list of all inbox messages
need_reply: false
auto_retry_tempfail: true
CMDs*/

var address = User.getProperty("tm_email") || "";
var messages = [];

try {
  var data = JSON.parse(content);
  messages = data["hydra:member"] || [];
} catch (e) {
  messages = [];
}

if (messages.length === 0) {
  Bot.sendMessage("📭 <b>Inbox is empty.</b>");
  Bot.runCommand("menu_tempmail");
  return;
}

var text = "📬 <b>Inbox Messages for:</b>\n<code>" + address + "</code>\n\nTap a message below to view full content and OTP:\n";
var buttons = [];

for (var i = 0; i < Math.min(messages.length, 10); i++) {
  var m = messages[i];
  var sender = (m.from && m.from.address ? m.from.address : "Unknown").split("@")[0];
  var subj = (m.subject || "No Subject").substring(0, 22);
  buttons.push([
    { title: "✉️ #" + (i + 1) + " [" + sender + "] " + subj, command: "tm_read " + m.id, style: "success" }
  ]);
}

buttons.push([
  { title: "🔄 Refresh", command: "tm_refresh", style: "primary" },
  { title: "🔙 Back", command: "menu_tempmail", style: "primary" }
]);

Bot.sendInlineKeyboard(buttons, text);
