/*CMD
command: tm_read
help: Read specific Temp Mail message
need_reply: false
auto_retry_tempfail: true
CMD*/

var msgId = (params || "").trim();
var token = User.getProperty("tm_token");

if (!msgId || !token) {
  Bot.runCommand("menu_tempmail");
  return;
}

HTTP.get({
  url: "https://api.mail.tm/messages/" + msgId,
  headers: {
    "Authorization": "Bearer " + token
  },
  success: "tm_on_read"
});
