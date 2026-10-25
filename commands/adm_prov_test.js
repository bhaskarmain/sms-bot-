/*CMD
command: adm_prov_test
help: Test OTPX connection
need_reply: false
auto_retry_tempfail: true
CMD*/

var apiUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
var apiKey = Bot.getProperty("provider_api_key") || "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = apiUrl + "?api_key=" + apiKey + "&action=getBalance";

Bot.sendMessage("⏳ Testing connection to provider:\n<code>" + apiUrl + "</code>...");

HTTP.get({
  url: url,
  success: "adm_on_prov_test"
});
