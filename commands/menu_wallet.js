/*CMD
command: menu_wallet
help: User Wallet Management
need_reply: false
auto_retry_tempfail: true
CMD*/

var balance = User.getProperty("balance") || 0.0;
var name = user.first_name || "User";

var text = "💳 <b>My Wallet</b>\n\n" +
  "👤 <b>Account:</b> " + name + " (ID: <code>" + user.telegramid + "</code>)\n" +
  "💰 <b>Current Balance:</b> <b>₹" + balance.toFixed(2) + "</b>\n\n" +
  "Top up instantly using UPI QR code below.";

var buttons = [
  [{ title: "➕ Add Balance (UPI QR)", command: "topup_menu", style: "success" }],
  [{ title: "📜 Transaction History", command: "history_ledger", style: "primary" }],
  [{ title: "🔙 Main Menu", command: "/start", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
