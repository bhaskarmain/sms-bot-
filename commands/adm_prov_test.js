/*CMD
command: adm_prov_test
help: Test OTPX connection
need_reply: false
auto_retry_tempfail: true
CMDs*/

var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=getBalance";

Bot.sendMessage("⏳ Testing connection to OTPX provider...");

HTTP.get({
  url: url,
  success: "adm_on_prov_test"
});
