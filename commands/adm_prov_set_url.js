/*CMD
command: adm_prov_set_url
help: Change SMS Provider API URL
need_reply: true
auto_retry_tempfail: true
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (!message || message == "adm_prov_set_url") {
  var curUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
  Bot.sendMessage("🌐 <b>Change Provider API URL</b>\n\nCurrent URL:\n<code>" + curUrl + "</code>\n\nPlease send the new SMS Provider API Endpoint URL:\n\n<i>Example: <code>https://otpx.org/api/stubs/handler_api.php</code>\nSend /cancel to return.</i>");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("adm_provider");
  return;
}

var newUrl = (message || "").trim();
if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
  Bot.sendMessage("⚠️ <b>Invalid URL format!</b>\nMust begin with http:// or https://. Please enter again:");
  Bot.runCommand("adm_prov_set_url");
  return;
}

Bot.setProperty("provider_api_url", newUrl, "string");
Bot.sendMessage("✅ <b>Provider API URL updated successfully!</b>\n\nNew Endpoint:\n<code>" + newUrl + "</code>");
Bot.runCommand("adm_provider");
