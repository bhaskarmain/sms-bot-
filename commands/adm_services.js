/*CMD
command: adm_services
help: Services & Pricing Manager
need_reply: false
auto_retry_tempfail: true
CMDs*/

var adminId = 8789936408;
var isAdm = (user.telegramid == adminId) || Bot.getProperty("admin_" + user.telegramid);

if (!isAdm) {
  Bot.sendMessage("⛔ Access denied.");
  return;
}

var text = "🛍️ <b>Services Catalog Management</b>\n\nTap a service to toggle status or view details:";

var buttons = [
  [
    { title: "🟢 WhatsApp (₹130)", command: "adm_srv_view wa WhatsApp 130" },
    { title: "🟢 Telegram (₹170)", command: "adm_srv_view tg Telegram 170" }
  ],
  [
    { title: "🟢 ChatGPT / OpenAI (₹65)", command: "adm_srv_view dr ChatGPT 65" },
    { title: "🟢 Google / Gmail (₹55)", command: "adm_srv_view go Google 55" }
  ],
  [
    { title: "🟢 Instagram (₹45)", command: "adm_srv_view ig Instagram 45" },
    { title: "🟢 Facebook (₹45)", command: "adm_srv_view fb Facebook 45" }
  ],
  [
    { title: "🟢 PhonePe (₹55)", command: "adm_srv_view phonepe PhonePe 55" },
    { title: "🟢 Amazon (₹50)", command: "adm_srv_view am Amazon 50" }
  ],
  [
    { title: "🔙 Back to Dashboard", command: "admin_dashboard" }
  ]
];

Bot.sendInlineKeyboard(buttons, text);
