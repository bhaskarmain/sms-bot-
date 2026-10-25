/*CMD
command: on_admin_balance
help: Callback for admin balance check
need_reply: false
auto_retry_tempfail: true
CMD*/

var res = (content || "").trim();
var otpxBal = "0.00";

if (res.indexOf("ACCESS_BALANCE:") !== -1) {
  otpxBal = res.split("ACCESS_BALANCE:")[1].trim();
} else {
  otpxBal = res;
}

var text = "👑 <b>Super Admin Hub</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "⚡ <b>OTPX Provider Balance:</b> ₹" + otpxBal + "\n" +
  "💳 <b>UPI Receiver:</b> <code>bhaskarswami360@fam</code>\n" +
  "🔑 <b>API Provider:</b> <code>https://otpx.org</code>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n\n" +
  "<b>Admin Management:</b>\n" +
  "• Deposits are auto-routed to your DM when users submit a 12-digit UTR.\n" +
  "• Tap [Approve] on any deposit alert to credit user balance instantly.\n" +
  "• To manually credit a user, run: <code>adm_approve &lt;user_id&gt; &lt;amount&gt; &lt;utr&gt;</code>";

var buttons = [
  [{ title: "🔄 Refresh Balance", command: "/admin" }],
  [{ title: "📱 Buy Services", command: "menu_services" }],
  [{ title: "🏠 Main Menu", command: "/start" }]
];

Bot.sendInlineKeyboard(buttons, text);
