/*CMD
command: tm_view_all
help: View all messages in Temp Mail inbox
need_reply: false
auto_retry_tempfail: true
CMD*/

var token = User.getProperty("tm_token");
var address = User.getProperty("tm_email");

if (!token) {
  Bot.runCommand("menu_tempmail");
  return;
}

HTTP.get({
  url: "https://api.mail.tm/messages",
  headers: {
    "Authorization": "Bearer " + token
  },
  success: "tm_on_view_all"
});
