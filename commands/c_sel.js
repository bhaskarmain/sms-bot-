/*CMD
command: c_sel
help: Country selected confirmation modal
need_reply: false
auto_retry_tempfail: true
CMDs*/

var p = (params || "").trim().split(" ");
var srvCode = p[0] || "wa";
var srvName = (p[1] || srvCode).replace(/_/g, " ");
var price = parseFloat(p[2]) || 130.0;
var countryId = parseInt(p[3]) || 22;
var countryName = (p[4] || "India").replace(/_/g, " ");
var dial = p[5] || "+91";
var flag = p[6] || "🌐";

var balance = User.getProperty("balance") || 0.0;

var text = "🏷 <b>Service:</b> " + srvName + "\n" +
  "🌍 <b>Country:</b> " + flag + " " + countryName + " (" + dial + ")\n" +
  "💰 <b>Price:</b> <b>₹" + price.toFixed(2) + "</b>\n" +
  "💳 <b>Your Balance:</b> ₹" + balance.toFixed(2) + "\n\n" +
  "⏱ <i>Number is reserved for 20 minutes.</i>";

var buttons = [
  [{ title: "✅ Purchase for ₹" + price.toFixed(2), command: "buy_srv " + srvCode + " " + price + " " + srvName.replace(/\s+/g, "_") + " " + countryId + " " + countryName.replace(/\s+/g, "_"), style: "success" }],
  [{ title: "🌍 Change Country", command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + price + " 1", style: "primary" }],
  [{ title: "🔙 Back to Services", command: "menu_services", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
