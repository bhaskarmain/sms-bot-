/*CMD
command: check_sms
help: Check for incoming SMS OTP
need_reply: false
auto_retry_tempfail: true
CMDs*/

var orderId = params;
if (!orderId) {
  var ord = User.getProperty("active_order");
  if (ord) orderId = ord.order_id;
}

if (!orderId) {
  Bot.sendMessage("⚠️ No active order found to check SMS.");
  return;
}

Bot.sendMessage("🔍 <i>Checking carrier network for incoming SMS...</i>");

var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=getStatus&id=" + orderId;

HTTP.get({
  url: url,
  success: "on_sms_api " + orderId
});
