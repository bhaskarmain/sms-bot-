/*CMD
command: active_orders
help: View active virtual number order
need_reply: false
auto_retry_tempfail: true
CMD*/

var ord = User.getProperty("active_order");

if (!ord) {
  Bot.sendInlineKeyboard([
    [{ title: "🟢 Buy Numbers", command: "menu_services", style: "success" }],
    [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
  ], "📬 <b>Active Orders</b>\n\nYou currently have no active virtual number reservations.");
  return;
}

var msg = "📱 <b>Your Active Order:</b>\n\n" +
  "• Service: <b>" + (ord.service_name || ord.service_code) + "</b>\n" +
  "• Country: <b>" + (ord.country_name || "India") + "</b>\n" +
  "• Number: <code>" + ord.phone + "</code> (tap to copy)\n" +
  "• Order ID: <code>#" + ord.order_id + "</code>\n" +
  "• Status: " + (ord.sms_code ? "🟢 <b>OTP Received: <code>" + ord.sms_code + "</code></b>" : "⏳ <b>Waiting for SMS</b>") + "\n\n" +
  "Use the buttons below to check SMS or conclude order:";

var buttons = [
  [{ title: "🔄 Refresh SMS Code", command: "check_sms " + ord.order_id, style: "success" }],
  [
    { title: "❌ Cancel & Refund", command: "cancel_order " + ord.order_id, style: "danger" },
    { title: "✅ Finish Order", command: "finish_order " + ord.order_id, style: "primary" }
  ],
  [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, msg);
