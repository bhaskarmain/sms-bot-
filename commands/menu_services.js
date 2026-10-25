/*CMD
command: menu_services
help: Browse virtual number services
need_reply: false
auto_retry_tempfail: true
CMDs*/

var balance = User.getProperty("balance") || 0.0;

var text = "📱 <b>Virtual SMS Numbers Catalog</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "💰 <b>Your Balance:</b> ₹" + balance.toFixed(2) + "\n\n" +
  "Select a service to allocate an instant virtual number:\n" +
  "<i>(Numbers are reserved for 20 minutes)</i>";

var buttons = [
  [
    { title: "💬 WhatsApp · ₹130", command: "buy_srv wa 130 WhatsApp" },
    { title: "✈️ Telegram · ₹170", command: "buy_srv tg 170 Telegram" }
  ],
  [
    { title: "💼 WA Business · ₹130", command: "buy_srv wab 130 WhatsApp_Business" },
    { title: "🤖 ChatGPT / OpenAI · ₹65", command: "buy_srv dr 65 ChatGPT" }
  ],
  [
    { title: "🧠 Claude AI · ₹70", command: "buy_srv claude 70 Claude_AI" },
    { title: "🔴 Google / Gmail · ₹55", command: "buy_srv go 55 Google" }
  ],
  [
    { title: "📸 Instagram · ₹45", command: "buy_srv ig 45 Instagram" },
    { title: "📘 Facebook · ₹45", command: "buy_srv fb 45 Facebook" }
  ],
  [
    { title: "🟣 PhonePe · ₹55", command: "buy_srv phonepe 55 PhonePe" },
    { title: "🌐 Google Pay · ₹55", command: "buy_srv gpay 55 Google_Pay" }
  ],
  [
    { title: "📦 Amazon · ₹50", command: "buy_srv am 50 Amazon" },
    { title: "🛍️ Flipkart · ₹50", command: "buy_srv xt 50 Flipkart" }
  ],
  [
    { title: "🍿 Netflix · ₹55", command: "buy_srv nf 55 Netflix" },
    { title: "🔥 Tinder · ₹65", command: "buy_srv oi 65 Tinder" }
  ],
  [
    { title: "💳 Recharge Wallet", command: "menu_wallet" },
    { title: "🏠 Main Menu", command: "/start" }
  ]
];

Bot.sendInlineKeyboard(buttons, text, { is_reply: false });
