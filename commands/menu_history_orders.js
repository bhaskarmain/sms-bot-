/*CMD
command: menu_history_orders
help: Show past orders history
need_reply: false
auto_retry_tempfail: true
CMDs*/

var history = User.getProperty("orders_history") || [];

var text = "📜 <b>Order History</b>\n\n";

if (!history || history.length === 0) {
  text += "No past orders found.";
} else {
  for (var i = 0; i < Math.min(history.length, 10); i++) {
    var ord = history[i];
    text += "• <b>" + ord.service + "</b> (" + ord.phone + ")\n" +
      "  <i>Status:</i> " + ord.status + " | <i>Price:</i> ₹" + ord.price.toFixed(2) + "\n" +
      "  <i>Code:</i> <code>" + (ord.sms_code || "None") + "</code> | " + ord.date + "\n\n";
  }
}

var buttons = [
  [{ title: "🔙 Main Menu", command: "/start", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
