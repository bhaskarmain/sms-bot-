/*CMD
command: adm_on_prov_test
help: Callback for provider connection test
need_reply: false
auto_retry_tempfail: true
CMDs*/

var res = (content || "").trim();

if (res.indexOf("ACCESS_BALANCE:") !== -1) {
  var b = res.split("ACCESS_BALANCE:")[1].trim();
  Bot.sendMessage("✅ <b>Provider Test Result:</b>\n\nConnected successfully! Live Balance: <b>₹" + b + "</b>");
} else {
  Bot.sendMessage("❌ <b>Provider Test Result:</b>\n\nResponse: <code>" + res + "</code>");
}

Bot.runCommand("adm_provider");
