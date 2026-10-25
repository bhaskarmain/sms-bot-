/*CMD
command: srv_view
help: Service purchase confirmation view
need_reply: false
auto_retry_tempfail: true
CMDs*/

var p = (params || "").trim().split(" ");
var srvCode = p[0];
var srvName = (p[1] || srvCode).replace(/_/g, " ");
var price = parseFloat(p[2]) || 23.0;
var page = parseInt(p[3]) || 1;
var layout = p[4] || "linear";

var balance = User.getProperty("balance") || 0.0;

var text = "🏷 <b>Service:</b> " + srvName + "\n" +
  "🌍 <b>Country:</b> 🇮🇳 India (+91)\n" +
  "💰 <b>Price:</b> <b>₹" + price.toFixed(2) + "</b>\n" +
  "💳 <b>Your Balance:</b> ₹" + balance.toFixed(2) + "\n\n" +
  "⏱ <i>Number is reserved for 20 minutes.</i>";

var buttons = [
  [{ title: "✅ Purchase for ₹" + price.toFixed(2), command: "buy_srv " + srvCode + " " + price + " " + srvName.replace(/\s+/g, "_") }],
  [{ title: "🔙 Back to Services", command: "menu_services " + page + " " + layout }]
];

Bot.sendInlineKeyboard(buttons, text);
