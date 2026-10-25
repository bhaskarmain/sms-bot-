/*CMD
command: menu_services
help: Virtual SMS Numbers Catalog (Exact UI matching all_in_one.js)
need_reply: false
auto_retry_tempfail: true
CMDs*/

var p = (params || "").trim().split(" ");
var page = parseInt(p[0]) || 1;
var layout = p[1] || "linear";

var ALL_SERVICES = [
  // Page 1
  { id: 1, code: "wa", name: "WhatsApp", icon: "💬", price: 23.0, stock: 636 },
  { id: 2, code: "tg", name: "Telegram", icon: "✈️", price: 23.0, stock: 563 },
  { id: 3, code: "ig", name: "Instagram", icon: "📸", price: 17.0, stock: 285 },
  { id: 4, code: "fu", name: "Snapchat", icon: "👻", price: 15.0, stock: 212 },
  { id: 5, code: "dr", name: "OpenAI / ChatGPT", icon: "🤖", price: 22.0, stock: 271 },
  { id: 6, code: "fb", name: "Facebook", icon: "📘", price: 19.0, stock: 723 },
  { id: 7, code: "go", name: "Google / Gmail / YouTube", icon: "🔴", price: 23.0, stock: 709 },
  { id: 8, code: "tw", name: "Twitter / X", icon: "🐦", price: 19.0, stock: 869 },
  { id: 9, code: "tl", name: "Truecaller", icon: "📱", price: 17.0, stock: 358 },
  { id: 10, code: "nf", name: "Netflix", icon: "🍿", price: 19.0, stock: 796 },
  // Page 2
  { id: 11, code: "phonepe", name: "PhonePe", icon: "🟣", price: 25.0, stock: 412 },
  { id: 12, code: "paytmold", name: "Paytm", icon: "🔵", price: 25.0, stock: 530 },
  { id: 13, code: "gpay", name: "Google Pay", icon: "🌐", price: 25.0, stock: 380 },
  { id: 14, code: "am", name: "Amazon", icon: "📦", price: 22.0, stock: 620 },
  { id: 15, code: "xt", name: "Flipkart", icon: "🛍️", price: 22.0, stock: 590 },
  { id: 16, code: "claude", name: "Claude / Anthropic", icon: "🧠", price: 28.0, stock: 185 },
  { id: 17, code: "ds", name: "Discord", icon: "🎮", price: 20.0, stock: 450 },
  { id: 18, code: "blk", name: "Blinkit", icon: "⚡", price: 18.0, stock: 310 },
  { id: 19, code: "zepto", name: "Zepto", icon: "🛒", price: 18.0, stock: 340 },
  { id: 20, code: "jx", name: "Swiggy", icon: "🍲", price: 18.0, stock: 480 },
  // Page 3
  { id: 21, code: "dy", name: "Zomato", icon: "🍕", price: 18.0, stock: 490 },
  { id: 22, code: "oi", name: "Tinder", icon: "🔥", price: 28.0, stock: 240 },
  { id: 23, code: "bgmi", name: "BGMI", icon: "🎯", price: 22.0, stock: 330 },
  { id: 24, code: "freefire", name: "Free Fire", icon: "🔥", price: 22.0, stock: 360 },
  { id: 25, code: "roblox", name: "Roblox", icon: "🕹️", price: 20.0, stock: 210 },
  { id: 26, code: "mt", name: "Steam", icon: "🎮", price: 22.0, stock: 275 },
  { id: 27, code: "binance", name: "Binance", icon: "🪙", price: 28.0, stock: 195 },
  { id: 28, code: "wx", name: "Apple / iCloud", icon: "🍏", price: 25.0, stock: 160 },
  { id: 29, code: "mm", name: "Microsoft / Outlook", icon: "💼", price: 20.0, stock: 280 },
  { id: 30, code: "linkedin", name: "LinkedIn", icon: "👔", price: 25.0, stock: 220 },
  // Page 4
  { id: 31, code: "ub", name: "Uber", icon: "🚗", price: 20.0, stock: 315 },
  { id: 32, code: "ola", name: "Ola Cabs", icon: "🚕", price: 20.0, stock: 290 },
  { id: 33, code: "rapido", name: "Rapido", icon: "🛵", price: 18.0, stock: 270 },
  { id: 34, code: "nl", name: "Myntra", icon: "👗", price: 20.0, stock: 380 },
  { id: 35, code: "meesho", name: "Meesho", icon: "🛍️", price: 18.0, stock: 410 },
  { id: 36, code: "nykaa", name: "Nykaa", icon: "💄", price: 20.0, stock: 260 },
  { id: 37, code: "olx", name: "OLX", icon: "🏷️", price: 18.0, stock: 330 },
  { id: 38, code: "coindcx", name: "CoinDCX", icon: "🪙", price: 25.0, stock: 170 },
  { id: 39, code: "wazirx", name: "WazirX", icon: "🪙", price: 25.0, stock: 165 },
  { id: 40, code: "mb", name: "Yahoo", icon: "✉️", price: 20.0, stock: 290 },
  // Page 5
  { id: 41, code: "airtel", name: "Airtel Thanks", icon: "📡", price: 18.0, stock: 310 },
  { id: 42, code: "canva", name: "Canva", icon: "🎨", price: 20.0, stock: 250 },
  { id: 43, code: "capcut", name: "CapCut", icon: "🎬", price: 20.0, stock: 280 },
  { id: 44, code: "airbnb", name: "Airbnb", icon: "🏠", price: 25.0, stock: 190 },
  { id: 45, code: "github", name: "GitHub", icon: "🐙", price: 25.0, stock: 240 },
  { id: 46, code: "notion", name: "Notion", icon: "📝", price: 20.0, stock: 220 },
  { id: 47, code: "twitch", name: "Twitch", icon: "📺", price: 20.0, stock: 260 },
  { id: 48, code: "threads", name: "Threads", icon: "🧵", price: 20.0, stock: 390 },
  { id: 49, code: "reddit", name: "Reddit", icon: "👾", price: 20.0, stock: 340 },
  { id: 50, code: "quora", name: "Quora", icon: "❓", price: 18.0, stock: 280 },
  // Page 6
  { id: 51, code: "lf", name: "TikTok", icon: "🎵", price: 18.0, stock: 310 },
  { id: 52, code: "sharechat", name: "ShareChat", icon: "💬", price: 18.0, stock: 270 },
  { id: 53, code: "aab", name: "BharatPe", icon: "🇮🇳", price: 22.0, stock: 250 },
  { id: 54, code: "payzapp", name: "PayZapp", icon: "💳", price: 22.0, stock: 240 },
  { id: 55, code: "ts", name: "PayPal", icon: "🌐", price: 28.0, stock: 210 },
  { id: 56, code: "sig", name: "Signal", icon: "🔒", price: 25.0, stock: 190 }
];

var pageSize = (layout == "grid") ? 12 : 10;
var totalPages = Math.ceil(ALL_SERVICES.length / pageSize);
if (page < 1) page = 1;
if (page > totalPages) page = totalPages;

var startIdx = (page - 1) * pageSize;
var pageServices = ALL_SERVICES.slice(startIdx, startIdx + pageSize);

var buttons = [];

// Top highlights banner row (WhatsApp & Telegram shortcuts) on page 1
if (page == 1) {
  buttons.push([
    { title: "💬 WhatsApp · ₹23.00", command: "srv_view wa WhatsApp 23 1 " + layout },
    { title: "✈️ Telegram · ₹23.00", command: "srv_view tg Telegram 23 1 " + layout }
  ]);
}

// Main service items (Linear full-width or 2-column Grid)
if (layout == "grid") {
  for (var i = 0; i < pageServices.length; i += 2) {
    var s1 = pageServices[i];
    var s2 = pageServices[i + 1];
    var usd1 = (s1.price / 85.0).toFixed(2);
    var row = [
      { title: s1.icon + " " + s1.name + " · ₹" + s1.price.toFixed(2) + " / $" + usd1, command: "srv_view " + s1.code + " " + s1.name.replace(/[\s\/]/g, "_") + " " + s1.price + " " + page + " " + layout }
    ];
    if (s2) {
      var usd2 = (s2.price / 85.0).toFixed(2);
      row.push({
        title: s2.icon + " " + s2.name + " · ₹" + s2.price.toFixed(2) + " / $" + usd2,
        command: "srv_view " + s2.code + " " + s2.name.replace(/[\s\/]/g, "_") + " " + s2.price + " " + page + " " + layout
      });
    }
    buttons.push(row);
  }
} else {
  // Linear layout exactly matching screenshot
  for (var j = 0; j < pageServices.length; j++) {
    var s = pageServices[j];
    var usd = (s.price / 85.0).toFixed(2);
    buttons.push([
      {
        title: s.icon + " " + s.name + " · " + s.stock + " in stock · ₹" + s.price.toFixed(2) + " / $" + usd,
        command: "srv_view " + s.code + " " + s.name.replace(/[\s\/]/g, "_") + " " + s.price + " " + page + " " + layout
      }
    ]);
  }
}

// Pagination row (matching screenshot: 1/6 | 2 › or ‹ 1 | 2/6 | 3 ›)
var navRow = [];
if (page > 1) {
  navRow.push({ title: "‹ " + (page - 1), command: "menu_services " + (page - 1) + " " + layout });
}
navRow.push({ title: page + "/" + totalPages, command: "menu_services " + page + " " + layout });
if (page < totalPages) {
  navRow.push({ title: (page + 1) + " ›", command: "menu_services " + (page + 1) + " " + layout });
}
buttons.push(navRow);

// Layout Toggle row (matching screenshot: Grid | ✓ Linear)
buttons.push([
  { title: (layout == "grid" ? "✓ Grid" : "Grid"), command: "menu_services " + page + " grid" },
  { title: (layout == "linear" ? "✓ Linear" : "Linear"), command: "menu_services " + page + " linear" }
]);

// Search row (matching screenshot: 🔮 Search Products)
buttons.push([
  { title: "🔮 Search Products", command: "srv_search" }
]);

// Main Menu row (matching screenshot: 🏠 Main Menu)
buttons.push([
  { title: "🏠 Main Menu", command: "/start" }
]);

var text = "📱 <b>Virtual SMS Numbers (Page " + page + "/" + totalPages + ")</b>\n" +
  "━━━━━━━━━━━━━━━━━━━━━━\n" +
  "⚡ <i>Instant SMS Delivery · High Reliability</i>\n" +
  "Select your service to generate a virtual number:";

Bot.sendInlineKeyboard(buttons, text);
