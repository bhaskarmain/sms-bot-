/*CMD
command: buy_srv
help: Buy virtual number with country support
need_reply: false
auto_retry_tempfail: true
CMDs*/

var p = params.split(" ");
var srvCode = p[0];
var price = parseFloat(p[1]);
var srvName = (p[2] || srvCode).replace(/_/g, " ");
var countryId = p[3] || "22";
var countryName = (p[4] || "India").replace(/_/g, " ");

var balance = User.getProperty("balance") || 0.0;
if (balance < price) {
  var errText = "⚠️ <b>Insufficient Balance!</b>\n\n" +
    "• Service: <b>" + srvName + "</b>\n" +
    "• Country: <b>" + countryName + "</b>\n" +
    "• Required: <b>₹" + price.toFixed(2) + "</b>\n" +
    "• Available: <b>₹" + balance.toFixed(2) + "</b>\n\n" +
    "Please top up your wallet using UPI to purchase numbers.";
  
  Bot.sendInlineKeyboard([
    [{ title: "💳 Add Balance (UPI QR)", command: "menu_wallet", style: "success" }],
    [{ title: "🔙 Back to Services", command: "menu_services", style: "primary" }]
  ], errText);
  return;
}

// Deduct balance
User.setProperty("balance", balance - price, "float");

Bot.sendMessage("⏳ <i>Connecting to carrier network & allocating " + srvName + " (" + countryName + ") number...</i>");

var apiUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
var apiKey = Bot.getProperty("provider_api_key") || "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = apiUrl + "?api_key=" + apiKey + "&action=getNumber&service=" + srvCode + "&country=" + countryId;

HTTP.get({
  url: url,
  success: "on_number_api " + srvCode + " " + price + " " + srvName.replace(/\s+/g, "_") + " " + countryId + " " + countryName.replace(/\s+/g, "_")
});
