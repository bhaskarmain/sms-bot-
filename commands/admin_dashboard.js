/*CMD
command: admin_dashboard
help: Admin Control Panel
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;

if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ Access Denied. Admin only.");
  return;
}

var text = "👑 <b>Admin Control Panel</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "Select a management section below:";

var buttons = [
  [
    { title: "🔹 Live Stats & Balance", command: "/admin" },
    { title: "💳 Payments Hub", command: "/admin" }
  ],
  [
    { title: "🔹 Services & Pricing", command: "menu_services" },
    { title: "🔹 Orders Tracking", command: "active_orders" }
  ],
  [
    { title: "🔵 User Main Menu", command: "/start" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
