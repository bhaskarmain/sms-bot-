/*CMD
command: adm_approve
help: Admin approve deposit command
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;

if (user.telegramid != adminId) {
  Bot.sendMessage("⛔ <b>Access Denied:</b> Super Admin privileges required.");
  return;
}

var p = (params || "").trim().split(" ");
if (p.length < 3) {
  Bot.sendMessage("⚠️ Invalid format. Expected: <code>adm_approve <userId> <amount> <utr></code>");
  return;
}

var targetUserId = parseInt(p[0]);
var creditAmt = parseFloat(p[1]);
var utr = p[2];

// Check if already approved
var alreadyApproved = Bot.getProperty("utr_approved_" + utr);
if (alreadyApproved) {
  Bot.sendMessage("⚠️ <b>Already Processed!</b>\n\nUTR <code>" + utr + "</code> has already been approved and credited.");
  return;
}

// Mark approved globally
Bot.setProperty("utr_approved_" + utr, true, "boolean");

// Run credit command in target user's context
Bot.run({
  command: "credit_user " + creditAmt + " " + utr,
  for_user: { telegramid: targetUserId }
});

Bot.sendMessage("✅ <b>Deposit Approved Successfully!</b>\n\n" +
  "• User ID: <code>" + targetUserId + "</code>\n" +
  "• Amount: <b>₹" + creditAmt.toFixed(2) + "</b>\n" +
  "• UTR: <code>" + utr + "</code>\n\n" +
  "The user's balance has been updated and notified.");
