/*CMD
command: admin_dashboard
help: Admin Executive Dashboard
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ <b>Access Denied:</b> You are not an administrator.");
  return;
}

var userCount = Bot.getProperty("stat_user_count") || 1;
var adminCount = Bot.getProperty("stat_admin_count") || 1;
var orderCount = Bot.getProperty("stat_order_count") || 0;
var pendingPayments = Bot.getProperty("pending_payments_queue") || [];
var pendingCount = pendingPayments.length;

var isMaint = Bot.getProperty("maintenance_mode") || false;
var isFsub = Bot.getProperty("force_channel_enabled") || false;
var fsubId = Bot.getProperty("force_channel_id") || "Not Set";

var text = "⚡ <b>ADMIN EXECUTIVE DASHBOARD</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "📊 <b>System Overview:</b>\n" +
  "• 👥 Registered Users: <b>" + userCount + "</b>\n" +
  "• 👑 Bot Admins: <b>" + adminCount + "</b>\n" +
  "• 📦 Total Orders: <b>" + orderCount + "</b>\n" +
  "• 💳 Pending Approvals: <b>" + pendingCount + "</b>\n" +
  "• 🔌 Provider API: <b>https://otpx.org</b>\n\n" +
  "🔒 <b>Security & Gatekeeping:</b>\n" +
  "• 📢 Force Channel Join: <b>" + (isFsub ? "🟢 ON (" + fsubId + ")" : "🔴 OFF") + "</b>\n" +
  "• 🛠️ Maintenance Mode: <b>" + (isMaint ? "🔴 ACTIVE (Locked)" : "🟢 INACTIVE (Open)") + "</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "<i>Select a control category below:</i>";

var payBadge = pendingCount > 0 ? "💳 Payments [" + pendingCount + " PENDING]" : "🔹 Payments Hub";
var maintBadge = isMaint ? "🔴 Maintenance: ON" : "🔹 Maintenance: OFF";
var fsubBadge = isFsub ? "🟢 Force Sub: ON" : "🔹 Force Sub: OFF";

var buttons = [
  [
    { title: "🔹 Live Dashboard", command: "adm_stats" },
    { title: payBadge, command: "adm_payments" }
  ],
  [
    { title: "👥 Users Manager", command: "adm_users" },
    { title: "👑 Admin Team", command: "adm_admins_menu" }
  ],
  [
    { title: "🔹 Services & Pricing", command: "adm_services" },
    { title: "🔹 Orders Tracking", command: "adm_orders" }
  ],
  [
    { title: "🔹 Broadcast Msg", command: "adm_broadcast" },
    { title: fsubBadge, command: "adm_forcesub_menu" }
  ],
  [
    { title: "🔹 Provider API", command: "adm_provider" },
    { title: "🔹 UPI Gateway", command: "adm_upi_settings" }
  ],
  [
    { title: maintBadge, command: "adm_toggle_maintenance" },
    { title: "🔹 Audit Logs", command: "adm_audit_logs" }
  ],
  [
    { title: "🔵 User Main Menu", command: "/start" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
