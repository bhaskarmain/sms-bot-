/*CMD
command: history_ledger
help: Show recent wallet transactions
need_reply: false
auto_retry_tempfail: true
CMDs*/

var history = User.getProperty("wallet_history") || [];

var text = "📜 <b>Recent Transactions</b>\n\n";

if (!history || history.length === 0) {
  text += "No transaction history found yet.";
} else {
  for (var i = 0; i < Math.min(history.length, 10); i++) {
    var it = history[i];
    var sign = it.type === "DEPOSIT" ? "+" : "-";
    text += "• <b>" + it.type + ":</b> " + sign + "₹" + it.amount.toFixed(2) + "\n" +
      "  <i>Balance:</i> ₹" + it.bal_after.toFixed(2) + " | " + it.date + "\n" +
      "  <i>Ref:</i> <code>" + it.ref + "</code>\n\n";
  }
}

var buttons = [
  [{ title: "🔙 Back to Wallet", command: "menu_wallet", style: "primary" }]
];

Bot.sendInlineKeyboard(buttons, text);
