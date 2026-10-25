/*CMD
command: amt_custom
help: Prompt for custom deposit amount
need_reply: true
auto_retry_tempfail: true
CMDs*/

if (!message || message == "amt_custom") {
  Bot.sendMessage("✍️ <b>Enter Custom Amount (in INR):</b>\n\nMin: ₹10.00 | Max: ₹1000.00\n\nSend the amount now (e.g. <code>150</code>):");
  return;
}

var amt = parseFloat((message || "").trim());
if (isNaN(amt) || amt < 10.0 || amt > 1000.0) {
  Bot.sendMessage("⚠️ <b>Invalid Amount!</b>\nPlease enter a value between ₹10.00 and ₹1000.00:");
  Bot.runCommand("amt_custom");
  return;
}

Bot.runCommand("deposit_qr " + amt);
