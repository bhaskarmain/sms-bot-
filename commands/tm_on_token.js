/*CMD
command: tm_on_token
help: Handle Mail.tm JWT token and show inbox
need_reply: false
auto_retry_tempfail: true
CMD*/

try {
  var data = JSON.parse(content);
  var token = data.token;
  if (!token) {
    Bot.sendMessage("⚠️ Could not generate Temp Mail token. Please retry.");
    return;
  }
  User.setProperty("tm_token", token, "string");
  Bot.sendMessage("✅ <b>New Disposable Email Created!</b>");
  Bot.runCommand("menu_tempmail");
} catch (e) {
  Bot.sendMessage("❌ Error obtaining email token: " + e.message);
}
