/*CMD
command: finish_order
help: Complete active order
need_reply: false
auto_retry_tempfail: true
CMDs*/

var orderId = params;
var ord = User.getProperty("active_order");

if (ord && ord.order_id == orderId) {
  User.setProperty("active_order", null);
  
  var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
  HTTP.get({
    url: "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=setStatus&status=6&id=" + orderId
  });
}

var msg = "✅ <b>Order #" + orderId + " Completed!</b>\n\n" +
  "Thank you for using our service. Your virtual number session has concluded.\n\n" +
  "Need another number? Tap below:";

Bot.sendInlineKeyboard([
  [{ title: "🟢 Buy Another Number", command: "menu_services" }],
  [{ title: "🏠 Main Menu", command: "/start" }]
], msg);
