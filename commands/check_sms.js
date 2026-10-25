/*CMD
command: check_sms
help: Check status of SMS
need_reply: false
auto_retry_tempfail: true
CMD*/

var orderId = (params || "").trim();
if (!orderId) return;

Bot.sendMessage("🔍 <i>Checking SMS code from cellular provider...</i>");

var apiUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
var apiKey = Bot.getProperty("provider_api_key") || "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = apiUrl + "?api_key=" + apiKey + "&action=getStatus&id=" + orderId;

HTTP.get({
  url: url,
  success: "on_sms_api " + orderId
});
