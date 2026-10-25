/*CMD
command: adm_srv_view
help: Service details & toggle in admin
need_reply: false
auto_retry_tempfail: true
CMDs*/

var p = (params || "").trim().split(" ");
var code = p[0];
var name = (p[1] || code).replace(/_/g, " ");
var price = p[2] || "50";

var isDis = Bot.getProperty("srv_disabled_" + code) || false;

var text = "🏷 <b>Service Details</b>\n\n" +
  "• Name: <b>" + name + "</b>\n" +
  "• Code: <code>" + code + "</code>\n" +
  "• Price: <b>₹" + price + ".00</b>\n" +
  "• Status: <b>" + (isDis ? "🔴 Disabled" : "🟢 Active") + "</b>";

var buttons = [
  [{ title: (isDis ? "🟢 Enable Service" : "🔴 Disable Service"), command: "adm_srv_toggle " + code }],
  [{ title: "🔙 Back to Services", command: "adm_services" }]
];

Bot.sendInlineKeyboard(buttons, text);
