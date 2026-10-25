/*CMD
command: credit_user
help: Internal credit execution in user context
need_reply: false
auto_retry_tempfail: true
CMD*/

var p = (params || "").trim().split(" ");
var amt = parseFloat(p[0]) || 0.0;
var utr = p[1] || "N/A";

if (amt <= 0) return;

var curBal = User.getProperty("balance");
if (curBal == null) curBal = 0.0;

var newBal = curBal + amt;
User.setProperty("balance", newBal, "float");

var notif = "🎉 <b>Deposit Approved & Credited!</b>\n\n" +
  "💰 Amount: <b>₹" + amt.toFixed(2) + "</b>\n" +
  "🔢 UTR: <code>" + utr + "</code>\n" +
  "💳 Updated Balance: <b>₹" + newBal.toFixed(2) + "</b>\n\n" +
  "You can now buy virtual phone numbers!";

Bot.sendInlineKeyboard([
  [{ title: "🟢 Buy Numbers", command: "menu_services" }],
  [{ title: "🏠 Main Menu", command: "/start" }]
], notif);
