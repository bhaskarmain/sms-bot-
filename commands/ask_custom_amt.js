/*CMD
command: ask_custom_amt
help: Custom deposit amount input
need_reply: true
auto_retry_tempfail: true
CMDs*/

if (!message || message == "ask_custom_amt" || message == "amt_custom") {
  Bot.sendMessage("✍️ <b>Enter Custom Amount (in INR):</b>\n\nMin: ₹10.00 | Max: ₹1000.00\n\nPlease send the amount now (e.g. <code>150</code>):\n\n<i>Send /cancel to return to menu.</i>");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("topup_menu");
  return;
}

var raw = (message || "").trim();
var amt = parseFloat(raw);

if (isNaN(amt) || amt < 10.0 || amt > 1000.0) {
  Bot.sendMessage("⚠️ <b>Invalid Amount!</b>\nPlease enter a value between ₹10.00 and ₹1000.00 (e.g. <code>100</code>):\n\n<i>Send /cancel to return to menu.</i>");
  return;
}

Bot.runCommand("deposit_qr " + amt);
