/*CMD
command: tm_on_read
help: Display detailed message content and extracted OTP
need_reply: false
auto_retry_tempfail: true
CMD*/

try {
  var detail = JSON.parse(content);
  var sender = (detail.from && detail.from.address) ? detail.from.address : "Unknown";
  var subj = detail.subject || "(No Subject)";
  var dateStr = detail.createdAt ? detail.createdAt : "";
  var bodyText = (detail.text || detail.intro || "").substring(0, 1500) || "(Empty email body)";
  
  // Extract verification OTP
  var otpMatch = (bodyText + " " + subj).match(/\b([0-9]{4,8})\b/);
  var otp = otpMatch ? otpMatch[1] : null;

  var text = "📨 <b>Email Message Detail</b>\n\n" +
    "👤 <b>From:</b> <code>" + sender + "</code>\n" +
    "🏷 <b>Subject:</b> <b>" + subj + "</b>\n" +
    "📅 <b>Date:</b> " + dateStr + "\n";

  if (otp) {
    text += "\n🔑 <b>Detected Verification OTP:</b>\n👉 <code>" + otp + "</code> <i>(tap to copy)</i>\n";
  }

  // Clean HTML chars in body
  var cleanBody = bodyText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  text += "\n━━━━━━━━━━━━━━━━━━━━━━\n<b>Message Content:</b>\n<pre>" + cleanBody + "</pre>";

  var buttons = [
    [
      { title: "🔙 Back to Messages", command: "tm_view_all", style: "primary" },
      { title: "📧 Temp Mail Home", command: "menu_tempmail", style: "primary" }
    ]
  ];

  Bot.sendInlineKeyboard(buttons, text);
} catch (e) {
  Bot.sendMessage("❌ Error reading email content: " + e.message);
  Bot.runCommand("menu_tempmail");
}
