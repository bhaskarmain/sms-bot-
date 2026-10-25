/*CMD
command: adm_set_max_dep
help: Set Maximum Deposit Amount
need_reply: true
auto_retry_tempfail: true
answer: 📈 Please send the Maximum Deposit Amount in ₹ (e.g. 1000):
CMD*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("adm_upi_settings");
  return;
}

var val = parseFloat((message || "").trim());
if (isNaN(val) || val <= 0) {
  Bot.sendMessage("⚠️ Invalid number. Send a valid amount (e.g. <code>1000</code>) or /cancel:");
  return;
}

Bot.setProperty("cfg_max_dep", val.toString(), "string");
Bot.sendMessage("✅ <b>Maximum Deposit Updated to ₹" + val.toFixed(2) + "!</b>");
Bot.runCommand("adm_upi_settings");
