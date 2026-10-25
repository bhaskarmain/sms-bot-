/*CMD
command: menu_wallet
help: User Wallet Management
need_reply: false
auto_retry_tempfail: true
CMDs*/

var balance = User.getProperty("balance") || 0.0;
var name = user.first_name || "User";

var text = "💳 <b>My Wallet</b>\n\n" +
  "👤 <b>Account:</b> " + name + " (ID: <code>" + user.telegramid + "</code>)\n" +
  "💰 <b>Current Balance:</b> <b>₹" + balance.toFixed(2) + "</b>\n\n" +
  "Top up instantly using UPI QR code below.";

var buttons = [
  [{ title: "➕ Add Balance (UPI QR)", command: "topup_menu" }],
  [{ title: "📜 Transaction History", command: "history_ledger" }],
  [{ title: "🔙 Main Menu", command: "/start" }]
];

Bot.sendInlineKeyboard(buttons, text);
