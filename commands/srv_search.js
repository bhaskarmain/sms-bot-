/*CMD
command: srv_search
help: Search services by name
need_reply: true
auto_retry_tempfail: true
CMDs*/

if (!message || message == "srv_search") {
  Bot.sendMessage("🔮 <b>Search Services</b>\n\nType the service name you want (e.g. <code>WhatsApp</code>, <code>Telegram</code>, <code>Instagram</code>, <code>Netflix</code>):\n\n<i>Send /cancel to return to catalog.</i>");
  return;
}

if (message == "/cancel") {
  Bot.runCommand("menu_services");
  return;
}

var q = (message || "").toLowerCase().trim();

var ALL_SERVICES = [
  { code: "wa", name: "WhatsApp", icon: "💬", price: 130.0 },
  { code: "tg", name: "Telegram", icon: "✈️", price: 170.0 },
  { code: "ig", name: "Instagram", icon: "📸", price: 17.0 },
  { code: "fu", name: "Snapchat", icon: "👻", price: 15.0 },
  { code: "dr", name: "OpenAI / ChatGPT", icon: "🤖", price: 22.0 },
  { code: "fb", name: "Facebook", icon: "📘", price: 19.0 },
  { code: "go", name: "Google / Gmail / YouTube", icon: "🔴", price: 23.0 },
  { code: "tw", name: "Twitter / X", icon: "🐦", price: 19.0 },
  { code: "tl", name: "Truecaller", icon: "📱", price: 17.0 },
  { code: "nf", name: "Netflix", icon: "🍿", price: 19.0 },
  { code: "phonepe", name: "PhonePe", icon: "🟣", price: 25.0 },
  { code: "paytmold", name: "Paytm", icon: "🔵", price: 25.0 },
  { code: "gpay", name: "Google Pay", icon: "🌐", price: 25.0 },
  { code: "am", name: "Amazon", icon: "📦", price: 22.0 },
  { code: "xt", name: "Flipkart", icon: "🛍️", price: 22.0 },
  { code: "claude", name: "Claude / Anthropic", icon: "🧠", price: 28.0 },
  { code: "ds", name: "Discord", icon: "🎮", price: 20.0 },
  { code: "blk", name: "Blinkit", icon: "⚡", price: 18.0 },
  { code: "zepto", name: "Zepto", icon: "🛒", price: 18.0 },
  { code: "jx", name: "Swiggy", icon: "🍲", price: 18.0 },
  { code: "dy", name: "Zomato", icon: "🍕", price: 18.0 },
  { code: "oi", name: "Tinder", icon: "🔥", price: 28.0 }
];

var matches = [];
for (var i = 0; i < ALL_SERVICES.length; i++) {
  var s = ALL_SERVICES[i];
  if (s.name.toLowerCase().indexOf(q) !== -1 || s.code.toLowerCase().indexOf(q) !== -1) {
    matches.push(s);
  }
}

if (matches.length === 0) {
  Bot.sendMessage("⚠️ No matching services found for: <code>" + message + "</code>");
  Bot.runCommand("srv_search");
  return;
}

var buttons = [];
for (var j = 0; j < Math.min(matches.length, 8); j++) {
  var m = matches[j];
  var cmd = (m.code == "wa" || m.code == "tg") ? ("c_page " + m.code + " " + m.name.replace(/[\s\/]/g, "_") + " " + m.price + " 1") : ("srv_view " + m.code + " " + m.name.replace(/[\s\/]/g, "_") + " " + m.price + " 1 linear");
  buttons.push([
    { title: m.icon + " " + m.name + " · ₹" + m.price.toFixed(2), command: cmd, style: "success" }
  ]);
}

buttons.push([
  { title: "🔙 Back to Catalog", command: "menu_services", style: "primary" }
]);

Bot.sendInlineKeyboard(buttons, "🔍 <b>Search Results for:</b> <code>" + message + "</code>\n\nTap a service to purchase virtual number:");
