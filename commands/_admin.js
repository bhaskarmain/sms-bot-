/*CMD
command: /admin
help: Super Admin Dashboard
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;

if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ Access Denied. Admin only.");
  return;
}

var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=getBalance";

Bot.sendMessage("⏳ Fetching OTPX live balance...");

HTTP.get({
  url: url,
  success: "on_admin_balance"
});
