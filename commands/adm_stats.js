/*CMD
command: adm_stats
help: Admin live stats & metrics
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=getBalance";

HTTP.get({
  url: url,
  success: "adm_on_stats"
});
