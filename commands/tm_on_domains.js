/*CMD
command: tm_on_domains
help: Handle Mail.tm domains response
need_reply: false
auto_retry_tempfail: true
CMD*/

try {
  var data = JSON.parse(content);
  var domains = data["hydra:member"] || [];
  if (!domains.length) {
    Bot.sendMessage("⚠️ <b>No Temp Mail domains available right now. Please try again shortly.</b>");
    return;
  }
  
  var domain = domains[0].domain;
  var rand = Math.random().toString(36).substring(2, 8);
  var email = ("user" + user.telegramid + "_" + rand + "@" + domain).toLowerCase();
  var pass = "TmpPass_" + Math.random().toString(36).substring(2, 10) + "!";
  
  User.setProperty("tm_email", email, "string");
  User.setProperty("tm_pass", pass, "string");

  HTTP.post({
    url: "https://api.mail.tm/accounts",
    body: { address: email, password: pass },
    headers: { "Content-Type": "application/json" },
    success: "tm_on_account"
  });
} catch (e) {
  Bot.sendMessage("❌ Error creating email address: " + e.message);
}
