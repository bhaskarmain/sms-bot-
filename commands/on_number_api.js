/*CMD
command: on_number_api
help: Callback when number is allocated
need_reply: false
auto_retry_tempfail: true
CMD*/

var p = params.split(" ");
var srvCode = p[0];
var price = parseFloat(p[1]);
var srvName = (p[2] || srvCode).replace(/_/g, " ");
var countryId = p[3] || "22";
var countryName = (p[4] || "India").replace(/_/g, " ");

var resp = (content || "").trim();

if (resp.indexOf("ACCESS_NUMBER:") >= 0) {
  var parts = resp.split(":");
  var orderId = parts[1];
  var phone = "+" + parts[2].replace(/^\+/, "");

  var orderData = {
    order_id: orderId,
    phone: phone,
    service_code: srvCode,
    service_name: srvName,
    country_name: countryName,
    country_id: countryId,
    price: price,
    sms_code: null,
    created_at: new Date().toISOString()
  };

  User.setProperty("active_order", orderData, "json");

  // Save in global recent orders
  var globalOrders = Bot.getProperty("global_recent_orders") || [];
  globalOrders.unshift({
    id: orderId,
    phone: phone,
    service: srvName + " (" + countryName + ")",
    price: price,
    status: "ACTIVE",
    sms_code: null
  });
  Bot.setProperty("global_recent_orders", globalOrders.slice(0, 20), "json");

  // Save in user orders history
  var userOrders = User.getProperty("orders_history") || [];
  userOrders.unshift({
    phone: phone,
    service: srvName + " (" + countryName + ")",
    price: price,
    status: "ACTIVE",
    sms_code: null,
    date: new Date().toLocaleString()
  });
  User.setProperty("orders_history", userOrders.slice(0, 20), "json");

  var msg = "🎉 <b>Number Allocated Successfully!</b>\n\n" +
    "🏷 <b>Service:</b> " + srvName + "\n" +
    "🌍 <b>Country:</b> " + countryName + "\n" +
    "📱 <b>Phone Number:</b> <code>" + phone + "</code> (tap to copy)\n" +
    "🆔 <b>Order ID:</b> <code>#" + orderId + "</code>\n" +
    "⏳ <b>Reserved For:</b> 20 minutes\n\n" +
    "Enter this number into your app. When the SMS is sent, tap <b>🔄 Refresh SMS</b> below to fetch your OTP.";

  var buttons = [
    [{ title: "🔄 Refresh SMS Code", command: "check_sms " + orderId, style: "success" }],
    [
      { title: "❌ Cancel & Refund", command: "cancel_order " + orderId, style: "danger" },
      { title: "✅ Finish Order", command: "finish_order " + orderId, style: "success" }
    ],
    [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
  ];

  Bot.sendInlineKeyboard(buttons, msg);
} else {
  // Refund balance on provider error
  var curBal = User.getProperty("balance") || 0.0;
  User.setProperty("balance", curBal + price, "float");

  var failMsg = "❌ <b>Number Allocation Failed</b>\n\n" +
    "Provider message: <code>" + resp + "</code>\n\n" +
    "💵 <b>Refunded:</b> ₹" + price.toFixed(2) + " returned to your wallet balance.\n" +
    "💳 <b>Current Balance:</b> ₹" + (curBal + price).toFixed(2);

  Bot.sendInlineKeyboard([
    [{ title: "🔄 Try Another Service", command: "menu_services", style: "success" }],
    [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
  ], failMsg);
}
