/*CMD
command: on_sms_api
help: Callback when SMS status is returned
need_reply: false
auto_retry_tempfail: true
CMD*/

var ord = User.getProperty("active_order") || {};
var orderId = (params || "").trim() || User.getProperty("checking_order_id") || (ord && ord.order_id);
var resp = (content || "").trim();

if (resp.indexOf("STATUS_OK:") >= 0) {
  var code = resp.split(":")[1];
  ord.sms_code = code;
  User.setProperty("active_order", ord, "json");

  var msg = "📬 <b>SMS Verification Code Received!</b>\n\n" +
    "📱 <b>Phone:</b> <code>" + (ord.phone || "") + "</code>\n" +
    "🔑 <b>OTP Code:</b> <code>" + code + "</code> (tap to copy)\n\n" +
    "📝 <b>Status:</b> Verification code successfully extracted.\n\n" +
    "Tap <b>✅ Finish Order</b> once you have verified your account.";

  var buttons = [
    [{ title: "✅ Finish Order", command: "finish_order " + orderId, style: "success" }],
    [{ title: "🏠 Main Menu", command: "/start", style: "primary" }]
  ];

  Bot.sendInlineKeyboard(buttons, msg);
} else {
  var waitMsg = "⏳ <b>No SMS received yet.</b>\n\n" +
    "📱 <b>Phone:</b> <code>" + (ord.phone || "") + "</code>\n" +
    "Provider status: <code>" + (resp || "STATUS_WAIT_CODE") + "</code>\n\n" +
    "Please send the OTP request from your application, wait 10-15 seconds, and tap <b>🔄 Refresh SMS Code</b> below.";

  var buttons = [
    [{ title: "🔄 Refresh SMS Code", command: "check_sms " + orderId, style: "success" }],
    [
      { title: "❌ Cancel & Refund", command: "cancel_order " + orderId, style: "danger" },
      { title: "🏠 Main Menu", command: "/start", style: "primary" }
    ]
  ];

  Bot.sendInlineKeyboard(buttons, waitMsg);
}
