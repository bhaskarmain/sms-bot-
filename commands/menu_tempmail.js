/*CMD
command: menu_tempmail
help: Disposable Temp Mail Home
need_reply: false
auto_retry_tempfail: true
CMDs*/

var token = User.getProperty("tm_token");
var address = User.getProperty("tm_email");

if (!token || !address) {
  Bot.sendMessage("⏳ <b>Generating your disposable temporary email address...</b>");
  Bot.runCommand("tm_new");
  return;
}

HTTP.get({
  url: "https://api.mail.tm/messages",
  headers: {
    "Authorization": "Bearer " + token
  },
  success: "tm_on_messages"
});
