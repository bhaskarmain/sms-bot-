/*CMD
command: admin_dashboard
help: Admin Executive Dashboard
need_reply: false
auto_retry_tempfail: true
CMD*/

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
    { title: "🔹 Live Dashboard", command: "adm_stats", style: "primary" },
    { title: payBadge, command: "adm_payments", style: pendingCount > 0 ? "danger" : "success" }
  ],
  [
    { title: "👥 Users Manager", command: "adm_users", style: "primary" },
    { title: "👑 Admin Team", command: "adm_admins_menu", style: "primary" }
  ],
  [
    { title: "🔹 Services & Pricing", command: "adm_services", style: "primary" },
    { title: "🔹 Orders Tracking", command: "adm_orders", style: "primary" }
  ],
  [
    { title: "🔹 Broadcast Msg", command: "adm_broadcast", style: "primary" },
    { title: fsubBadge, command: "adm_forcesub_menu", style: isFsub ? "success" : "primary" }
  ],
  [
    { title: "🔹 Provider API", command: "adm_provider", style: "primary" },
    { title: "🔹 UPI Gateway", command: "adm_upi_settings", style: "primary" }
  ],
  [
    { title: maintBadge, command: "adm_toggle_maintenance", style: isMaint ? "danger" : "primary" },
    { title: "🔹 Audit Logs", command: "adm_audit_logs", style: "primary" }
  ],
  [
    { title: "🔵 User Main Menu", command: "/start", style: "primary" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
