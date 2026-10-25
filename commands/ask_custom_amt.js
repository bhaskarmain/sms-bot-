/*CMD
command: ask_custom_amt
help: Ask user for custom deposit amount
need_reply: false
auto_retry_tempfail: true
CMDs*/

Bot.sendMessage("✍️ <b>Enter Custom Amount (in INR):</b>\n\nMin: ₹10.00 | Max: ₹1000.00\n\nPlease send the amount now (e.g. <code>150</code>):");

Bot.run({
  command: "on_custom_amt"
});
