/*CMD
command: tm_refresh
help: Refresh disposable email inbox
need_reply: false
auto_retry_tempfail: true
CMDs*/

var token = User.getProperty("tm_token");
if (!token) {
  Bot.runCommand("menu_tempmail");
  return;
}

HTTP.get({
  url: "https://api.mail.tm/messages",
  headers: {
    "Authorization": "Bearer " + token
  },
  success: "tm_on_messages"
});
