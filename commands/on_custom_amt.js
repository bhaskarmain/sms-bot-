/*CMD
command: on_custom_amt
help: Process user custom amount input
need_reply: true
auto_retry_tempfail: true
CMDs*/

var raw = (message || "").trim();
var amt = parseFloat(raw);

if (isNaN(amt) || amt < 10.0 || amt > 1000.0) {
  Bot.sendMessage("⚠️ <b>Invalid Amount!</b>\nPlease enter a value between ₹10.00 and ₹1000.00 (e.g. <code>100</code>):");
  Bot.run({ command: "on_custom_amt" });
  return;
}

Bot.runCommand("deposit_qr " + amt);
