/*CMD
command: tm_on_messages
help: Render disposable email view with messages
need_reply: false
auto_retry_tempfail: true
CMDs*/

var address = User.getProperty("tm_email") || "disposable@mail.tm";
var messages = [];

try {
  var data = JSON.parse(content);
  messages = data["hydra:member"] || [];
} catch (e) {
  messages = [];
}

var msgPreview = "";
if (messages.length === 0) {
  msgPreview = "<i>No incoming emails yet. Send an email or verification code to this address and tap Refresh Inbox below.</i>";
} else {
  msgPreview = "<b>Recent Messages (" + messages.length + "):</b>\n";
  for (var i = 0; i < Math.min(messages.length, 5); i++) {
    var m = messages[i];
    var sender = (m.from && m.from.address) ? m.from.address : "Unknown";
    var subj = m.subject || "(No Subject)";
    var intro = m.intro || "";
    
    // Extract OTP if present
    var otpMatch = (intro + " " + subj).match(/\b([0-9]{4,8})\b/);
    var otp = otpMatch ? otpMatch[1] : null;

    msgPreview += "\n" + (i + 1) + ". <b>From:</b> " + sender + "\n   <b>Subject:</b> " + subj + "\n";
    if (otp) {
      msgPreview += "   🔑 <b>OTP:</b> <code>" + otp + "</code>\n";
    }
  }
}

var text = "📧 <b>Temporary Disposable Email</b>\n\n" +
  "📬 <b>Your Disposable Address:</b>\n" +
  "<code>" + address + "</code> (tap to copy)\n\n" +
  "📨 <b>Inbox Status:</b> " + messages.length + " message(s) received\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  msgPreview + "\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "💡 <i>Use this address for online registrations, OTPs & privacy protection.</i>";

var buttons = [
  [
    { title: "🔄 Refresh Inbox", command: "tm_refresh" },
    { title: "🎲 New Email", command: "tm_new" }
  ]
];

if (messages.length > 0) {
  buttons.push([
    { title: "📬 Read All Messages (" + messages.length + ")", command: "tm_view_all" }
  ]);
}

buttons.push([
  { title: "🔙 Main Menu", command: "/start" }
]);

Bot.sendInlineKeyboard(buttons, text);
