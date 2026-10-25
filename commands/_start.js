/*CMD
command: /start
help: Start the SMS bot
need_reply: false
auto_retry_tempfail: true
CMDs*/

var balance = User.getProperty("balance");
if (balance == null) {
  balance = 0.0;
  User.setProperty("balance", 0.0, "float");
}

var welcome = "👋 <b>Welcome to SMS Verification Bot!</b>\n\n" +
  "Get instant virtual phone numbers for receiving SMS & OTP verification codes from all popular online platforms securely.\n\n" +
  "⚡ Fast SMS Delivery\n" +
  "🔒 100% Private & Anonymous\n" +
  "💳 Instant UPI Auto-Wallet Recharge\n\n" +
  "Use the menu below to browse services or manage your wallet.\n\n" +
  "💰 <b>Your Balance:</b> ₹" + balance.toFixed(2);

var buttons = [
  [
    { title: "🟢 Buy Virtual Numbers 🟢", command: "menu_services", style: "success" }
  ],
  [
    { title: "💳 Wallet & Deposit", command: "menu_wallet", style: "primary" },
    { title: "📧 Temporary Email", command: "menu_tempmail", style: "primary" }
  ],
  [
    { title: "📱 Active Orders", command: "active_orders", style: "primary" },
    { title: "📜 Order History", command: "menu_history_orders", style: "primary" }
  ],
  [
    { title: "💬 Help & FAQ", command: "menu_help", style: "primary" }
  ]
];

if (user.telegramid == 8789936408) {
  buttons.push([
    { title: "👑 Admin Control Panel", command: "admin_dashboard", style: "danger" }
  ]);
}

Bot.sendInlineKeyboard(buttons, welcome, { is_reply: false });
