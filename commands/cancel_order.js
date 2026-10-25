/*CMD
command: cancel_order
help: Cancel order and auto-refund
need_reply: false
auto_retry_tempfail: true
CMDs*/

var orderId = params;
var ord = User.getProperty("active_order");

if (!ord || ord.order_id != orderId) {
  Bot.sendMessage("⚠️ Order not found or already completed/cancelled.");
  return;
}

if (ord.sms_code) {
  Bot.sendMessage("⚠️ Cannot cancel or refund after SMS verification code has already been received.");
  return;
}

// Refund balance
var curBal = User.getProperty("balance") || 0.0;
var refundAmt = ord.price;
var newBal = curBal + refundAmt;
User.setProperty("balance", newBal, "float");
User.setProperty("active_order", null);

// Call provider cancel in background
var apiKey = "AZm7bG54fbg8557OA3ndETf4O3SWjmIAdCqAKmoS";
HTTP.get({
  url: "https://otpx.org/api/stubs/handler_api.php?api_key=" + apiKey + "&action=setStatus&status=8&id=" + orderId
});

var msg = "🚫 <b>Order Cancelled & Refunded!</b>\n\n" +
  "• Phone: <code>" + ord.phone + "</code>\n" +
  "• Refund Amount: <b>₹" + refundAmt.toFixed(2) + "</b>\n" +
  "• Current Wallet Balance: <b>₹" + newBal.toFixed(2) + "</b>\n\n" +
  "The amount has been returned to your wallet.";

Bot.sendInlineKeyboard([
  [{ title: "🛍️ Browse Services", command: "menu_services" }],
  [{ title: "🏠 Main Menu", command: "/start" }]
], msg);
