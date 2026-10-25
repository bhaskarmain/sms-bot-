/*CMD
command: adm_upi_settings
help: UPI Gateway Configuration
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var upiId = Bot.getProperty("cfg_upi_id") || "bhaskarswami360@fam";
var payeeName = Bot.getProperty("cfg_payee_name") || "Bhaskar Swami";
var minDep = Bot.getProperty("cfg_min_dep") || "10";
var maxDep = Bot.getProperty("cfg_max_dep") || "1000";

var text = "🏦 <b>UPI Payment Gateway Settings</b>\n\n" +
  "📍 <b>UPI ID (VPA):</b> <code>" + upiId + "</code>\n" +
  "👤 <b>Payee Name:</b> " + payeeName + "\n" +
  "📉 <b>Min Deposit:</b> ₹" + minDep + "\n" +
  "📈 <b>Max Deposit:</b> ₹" + maxDep;

var buttons = [
  [
    { title: "✏️ Edit UPI ID", command: "adm_set_upi_id", style: "primary" },
    { title: "✏️ Edit Payee Name", command: "adm_set_payee_name", style: "primary" }
  ],
  [
    { title: "📉 Min Deposit", command: "adm_set_min_dep", style: "primary" },
    { title: "📈 Max Deposit", command: "adm_set_max_dep", style: "primary" }
  ],
  [
    { title: "🔙 Back to Dashboard", command: "admin_dashboard", style: "primary" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
