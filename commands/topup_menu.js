/*CMD
command: topup_menu
help: Topup amount selection
need_reply: false
auto_retry_tempfail: true
CMDs*/

var text = "💳 <b>Add Funds to Wallet</b>\n\n" +
  "Select a deposit amount below or enter a custom amount:\n" +
  "• Minimum Deposit: <b>₹10.00</b>\n" +
  "• Maximum Deposit: <b>₹1000.00</b>";

var buttons = [
  [
    { title: "🟢 ₹50", command: "deposit_qr 50" },
    { title: "🟢 ₹100", command: "deposit_qr 100" },
    { title: "🟢 ₹200", command: "deposit_qr 200" }
  ],
  [
    { title: "🟢 ₹500", command: "deposit_qr 500" },
    { title: "🟢 ₹1000", command: "deposit_qr 1000" },
    { title: "✏️ Custom Amount", command: "ask_custom_amt" }
  ],
  [
    { title: "🔙 Back to Wallet", command: "menu_wallet" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
