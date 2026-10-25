/*CMD
command: adm_provider
help: SMS Provider Configuration & API Management
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied. Admin only.");
  return;
}

var apiUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
var apiKey = Bot.getProperty("provider_api_key") || "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";

var maskedKey = apiKey.length > 8 ? (apiKey.substring(0, 4) + "••••••••" + apiKey.substring(apiKey.length - 4)) : "••••••••";

var text = "🔌 <b>SMS Provider Configuration</b>\n\n" +
  "🏷 <b>Provider:</b> OTPX / SMS-Activate Stub\n" +
  "🌐 <b>API URL:</b> <code>" + apiUrl + "</code>\n" +
  "🔑 <b>API Key:</b> <code>" + maskedKey + "</code>\n\n" +
  "You can change the provider API URL or Key anytime below:";

var buttons = [
  [{ title: "⚡ Test Provider Connection & Balance", command: "adm_prov_test", style: "success" }],
  [
    { title: "🌐 Change API URL", command: "adm_prov_set_url", style: "primary" },
    { title: "🔑 Change API Key", command: "adm_prov_set_key", style: "primary" }
  ],
  [{ title: "🔙 Back to Dashboard", command: "admin_dashboard", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
