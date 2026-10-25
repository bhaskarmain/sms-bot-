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

var text = "👋 <b>Welcome to SMS Verification Bot!</b>\n\n" +
  "Get instant virtual phone numbers for receiving SMS & OTP verification codes from all popular platforms.\n\n" +
  "⚡ <b>Fast Delivery:</b> Instant SMS routing\n" +
  "🔒 <b>100% Private:</b> Non-VoIP numbers\n" +
  "💰 <b>Your Balance:</b> ₹" + balance.toFixed(2) + "\n\n" +
  "Select an option below to get started:";

var buttons = [
  [
    { title: "🟢 Buy Virtual Numbers 🟢", command: "menu_services" }
  ],
  [
    { title: "💳 Wallet & Deposit", command: "menu_wallet" },
    { title: "📱 Active Orders", command: "active_orders" }
  ],
  [
    { title: "💬 Support", url: "https://t.me/Talk_tooo_admin_bot" }
  ]
];

if (user.telegramid == 8789936408) {
  buttons.push([
    { title: "👑 Admin Control Panel", command: "/admin" }
  ]);
}

Bot.sendInlineKeyboard(buttons, text, { is_reply: false });
