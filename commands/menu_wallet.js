/*CMD
command: menu_wallet
help: Wallet and UPI deposit menu
need_reply: false
auto_retry_tempfail: true
CMDs*/

var balance = User.getProperty("balance") || 0.0;

var msg = "💳 <b>My Wallet & Recharge</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "👤 <b>User:</b> " + (user.first_name || "User") + " (ID: <code>" + user.telegramid + "</code>)\n" +
  "💰 <b>Current Balance:</b> <b>₹" + balance.toFixed(2) + "</b>\n\n" +
  "Select a top-up amount below to pay via UPI (GPay, PhonePe, Paytm, Cred, BHIM):";

var buttons = [
  [
    { title: "🟢 ₹50", command: "deposit_qr 50" },
    { title: "🟢 ₹100", command: "deposit_qr 100" },
    { title: "🟢 ₹200", command: "deposit_qr 200" }
  ],
  [
    { title: "🟢 ₹500", command: "deposit_qr 500" },
    { title: "🟢 ₹1000", command: "deposit_qr 1000" }
  ],
  [
    { title: "🟢 Buy Numbers", command: "menu_services" },
    { title: "🏠 Main Menu", command: "/start" }
  ]
];

Bot.sendInlineKeyboard(buttons, msg);
