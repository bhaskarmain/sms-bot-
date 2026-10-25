/*CMD
command: cancel_order
help: Cancel order & refund
need_reply: false
auto_retry_tempfail: true
CMDs*/

var orderId = (params || "").trim();
var ord = User.getProperty("active_order");

if (!ord || ord.order_id != orderId) {
  Bot.sendMessage("⚠️ Order not found or already concluded.");
  return;
}

var apiUrl = Bot.getProperty("provider_api_url") || "https://otpx.org/api/stubs/handler_api.php";
var apiKey = Bot.getProperty("provider_api_key") || "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
var url = apiUrl + "?api_key=" + apiKey + "&action=setStatus&status=8&id=" + orderId;

HTTP.get({ url: url });

// Refund balance
var curBal = User.getProperty("balance") || 0.0;
var newBal = curBal + ord.price;
User.setProperty("balance", newBal, "float");
User.setProperty("active_order", null);

var text = "❌ <b>Order Cancelled & Refunded</b>\n\n" +
  "• Number: <code>" + ord.phone + "</code>\n" +
  "• Service: <b>" + (ord.service_name || ord.service_code) + "</b>\n" +
  "• Refund Amount: <b>₹" + ord.price.toFixed(2) + "</b>\n" +
  "• Updated Balance: <b>₹" + newBal.toFixed(2) + "</b>\n\n" +
  "The full amount has been returned to your wallet.";

Bot.sendInlineKeyboard([
  [{ title: "🟢 Buy Numbers", command: "menu_services", style: "success" }],
  [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
], text);
