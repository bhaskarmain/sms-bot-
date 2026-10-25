/*CMD
command: adm_prov_set_key
help: Change SMS Provider API Key
need_reply: true
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (!message || message == "adm_prov_set_key") {
  Bot.sendMessage("🔑 <b>Change Provider API Key</b>\n\nPlease send your new SMS Provider API Key:\n\n<i>Example: <code>AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS</code>\nSend /cancel to return.</i>");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("adm_provider");
  return;
}

var newKey = (message || "").trim();
if (newKey.length < 5) {
  Bot.sendMessage("⚠️ <b>Invalid Key!</b> Key is too short. Please send again:");
  Bot.runCommand("adm_prov_set_key");
  return;
}

Bot.setProperty("provider_api_key", newKey, "string");
Bot.sendMessage("✅ <b>Provider API Key updated successfully!</b>\n\nTesting connection with the new key now...");
Bot.runCommand("adm_prov_test");
