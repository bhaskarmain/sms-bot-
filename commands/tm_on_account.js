/*CMD
command: tm_on_account
help: Handle account creation & request auth token
need_reply: false
auto_retry_tempfail: true
CMDs*/

var email = User.getProperty("tm_email");
var pass = User.getProperty("tm_pass");

HTTP.post({
  url: "https://api.mail.tm/token",
  body: { address: email, password: pass },
  headers: { "Content-Type": "application/json" },
  success: "tm_on_token"
});
