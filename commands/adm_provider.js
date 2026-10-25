/*CMD
command: adm_provider
help: SMS Provider Configuration
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var apiUrl = "https://otpx.org/api/stubs/handler_api.php";
var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";

var text = "🔌 <b>SMS Provider Configuration</b>\n\n" +
  "🏷 <b>Provider:</b> OTPX\n" +
  "🌐 <b>API URL:</b> <code>" + apiUrl + "</code>\n" +
  "🔑 <b>API Key:</b> <code>" + apiKey.slice(0, 4) + "••••••••</code>";

var buttons = [
  [{ title: "⚡ Test Provider Connection & Balance", command: "adm_prov_test" }],
  [{ title: "🔙 Back to Dashboard", command: "admin_dashboard" }]
];

Bot.sendInlineKeyboard(buttons, text);
