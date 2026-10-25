/*CMD
command: adm_on_stats
help: Callback for live system metrics
need_reply: false
auto_retry_tempfail: true
CMDs*/

var res = (content || "").trim();
var provBal = "37.21";
if (res.indexOf("ACCESS_BALANCE:") !== -1) {
  provBal = res.split("ACCESS_BALANCE:")[1].trim();
}

var totalUsers = Bot.getProperty("stat_user_count") || 1;
var adminCount = Bot.getProperty("stat_admin_count") || 1;
var bannedUsers = Bot.getProperty("stat_banned_count") || 0;
var totalOrders = Bot.getProperty("stat_order_count") || 0;
var completedOrders = Bot.getProperty("stat_completed_orders") || 0;
var totalDeposits = Bot.getProperty("stat_total_deposits") || 0.0;

var text = "📊 <b>System Statistics & Metrics</b>\n\n" +
  "👥 <b>Total Users:</b> " + totalUsers + "\n" +
  "👑 <b>Total Admins:</b> " + adminCount + "\n" +
  "🚫 <b>Banned Users:</b> " + bannedUsers + "\n" +
  "📦 <b>Total Orders:</b> " + totalOrders + "\n" +
  "✅ <b>Completed Orders:</b> " + completedOrders + "\n" +
  "💰 <b>Total Verified Deposits:</b> ₹" + totalDeposits.toFixed(2) + "\n" +
  "🔌 <b>Active Provider Balance:</b> ₹" + provBal;

var buttons = [
  [{ title: "🔄 Refresh Metrics", command: "adm_stats" }],
  [{ title: "🔙 Back to Dashboard", command: "admin_dashboard" }]
];

Bot.sendInlineKeyboard(buttons, text);
