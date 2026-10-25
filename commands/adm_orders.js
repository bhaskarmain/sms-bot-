/*CMD
command: adm_orders
help: Admin Orders Tracking
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var recentOrders = Bot.getProperty("global_recent_orders") || [];

if (recentOrders.length === 0) {
  var emptyMsg = "📦 <b>Orders Tracking</b>\n\nNo orders found in the database yet.";
  var emptyKb = [
    [{ title: "🔙 Back to Dashboard", command: "admin_dashboard" }]
  ];
  Bot.sendInlineKeyboard(emptyKb, emptyMsg);
  return;
}

var text = "📦 <b>Recent Orders (" + recentOrders.length + ")</b>\n\n";
for (var i = 0; i < Math.min(recentOrders.length, 10); i++) {
  var ord = recentOrders[i];
  text += "• <b>Order #" + ord.id + "</b> | <code>" + (ord.phone || "N/A") + "</code>\n" +
    "  Service: <b>" + ord.service + "</b> | Status: <b>" + ord.status + "</b> | Cost: ₹" + ord.price.toFixed(2) + "\n" +
    "  SMS Code: <code>" + (ord.sms_code || "None") + "</code>\n\n";
}

var buttons = [
  [{ title: "🔄 Refresh", command: "adm_orders" }],
  [{ title: "🔙 Back to Dashboard", command: "admin_dashboard" }]
];

Bot.sendInlineKeyboard(buttons, text);
