/*CMD
command: ask_utr
help: Prompt for 12-digit UTR
need_reply: false
auto_retry_tempfail: true
CMDs*/

var amt = User.getProperty("pending_deposit_amount") || 50.0;
Bot.sendMessage("✍️ <b>Submit 12-Digit UTR Number</b>\n\nAmount: <b>₹" + amt.toFixed(2) + "</b>\n\nPlease send your 12-digit UPI reference number from your payment receipt (e.g. <code>429182374650</code>):");

Bot.run({
  command: "on_utr_input"
});
