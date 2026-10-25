/*CMD
command: c_page
help: Select country for service with OTPX country IDs and colored buttons
need_reply: false
auto_retry_tempfail: true
CMD*/

var p = (params || "").trim().split(" ");
var srvCode = p[0] || "wa";
var srvName = (p[1] || srvCode).replace(/_/g, " ");
var basePrice = (srvCode == "wa") ? 130.0 : ((srvCode == "tg") ? 170.0 : (parseFloat(p[2]) || 50.0));
var page = parseInt(p[3]) || 1;

var COUNTRIES = [
  // Page 1 - Most Popular for WhatsApp & Telegram
  { id: 22, name: "India", flag: "🇮🇳", dial: "+91", price: basePrice },
  { id: 12, name: "USA", flag: "🇺🇸", dial: "+1", price: Math.round(basePrice * 1.12) },
  { id: 16, name: "United Kingdom", flag: "🇬🇧", dial: "+44", price: Math.round(basePrice * 1.15) },
  { id: 0, name: "Russia", flag: "🇷🇺", dial: "+7", price: Math.round(basePrice * 1.05) },
  { id: 6, name: "Indonesia", flag: "🇮🇩", dial: "+62", price: Math.round(basePrice * 1.08) },
  { id: 4, name: "Philippines", flag: "🇵🇭", dial: "+63", price: Math.round(basePrice * 1.08) },
  { id: 7, name: "Malaysia", flag: "🇲🇾", dial: "+60", price: Math.round(basePrice * 1.10) },
  { id: 36, name: "Canada", flag: "🇨🇦", dial: "+1", price: Math.round(basePrice * 1.15) },
  // Page 2
  { id: 43, name: "Germany", flag: "🇩🇪", dial: "+49", price: Math.round(basePrice * 1.18) },
  { id: 60, name: "Bangladesh", flag: "🇧🇩", dial: "+880", price: basePrice },
  { id: 73, name: "Brazil", flag: "🇧🇷", dial: "+55", price: Math.round(basePrice * 1.10) },
  { id: 31, name: "South Africa", flag: "🇿🇦", dial: "+27", price: Math.round(basePrice * 1.15) },
  { id: 15, name: "Poland", flag: "🇵🇱", dial: "+48", price: Math.round(basePrice * 1.15) },
  { id: 10, name: "Vietnam", flag: "🇻🇳", dial: "+84", price: Math.round(basePrice * 1.08) },
  { id: 5, name: "Myanmar", flag: "🇲🇲", dial: "+95", price: Math.round(basePrice * 1.08) },
  { id: 2, name: "Kazakhstan", flag: "🇰🇿", dial: "+7", price: Math.round(basePrice * 1.05) },
  // Page 3
  { id: 1, name: "Ukraine", flag: "🇺🇦", dial: "+380", price: Math.round(basePrice * 1.10) },
  { id: 51, name: "France", flag: "🇫🇷", dial: "+33", price: Math.round(basePrice * 1.20) },
  { id: 53, name: "Saudi Arabia", flag: "🇸🇦", dial: "+966", price: Math.round(basePrice * 1.20) },
  { id: 187, name: "UAE", flag: "🇦🇪", dial: "+971", price: Math.round(basePrice * 1.20) },
  { id: 37, name: "Morocco", flag: "🇲🇦", dial: "+212", price: Math.round(basePrice * 1.15) },
  { id: 33, name: "Colombia", flag: "🇨🇴", dial: "+57", price: Math.round(basePrice * 1.12) },
  { id: 8, name: "Kenya", flag: "🇰🇪", dial: "+254", price: Math.round(basePrice * 1.12) },
  { id: 24, name: "Cambodia", flag: "🇰🇭", dial: "+855", price: Math.round(basePrice * 1.12) },
  // Page 4
  { id: 9, name: "Tanzania", flag: "🇹🇿", dial: "+255", price: Math.round(basePrice * 1.12) },
  { id: 13, name: "Israel", flag: "🇮🇱", dial: "+972", price: Math.round(basePrice * 1.20) },
  { id: 14, name: "Hong Kong", flag: "🇭🇰", dial: "+852", price: Math.round(basePrice * 1.18) },
  { id: 21, name: "Egypt", flag: "🇪🇬", dial: "+20", price: Math.round(basePrice * 1.12) },
  { id: 32, name: "Romania", flag: "🇷🇴", dial: "+40", price: Math.round(basePrice * 1.15) },
  { id: 34, name: "Argentina", flag: "🇦🇷", dial: "+54", price: Math.round(basePrice * 1.12) },
  { id: 44, name: "Lithuania", flag: "🇱🇹", dial: "+370", price: Math.round(basePrice * 1.15) },
  { id: 47, name: "Sweden", flag: "🇸🇪", dial: "+46", price: Math.round(basePrice * 1.20) },
  // Page 5
  { id: 48, name: "Netherlands", flag: "🇳🇱", dial: "+31", price: Math.round(basePrice * 1.20) },
  { id: 62, name: "Turkey", flag: "🇹🇷", dial: "+90", price: Math.round(basePrice * 1.12) },
  { id: 66, name: "Thailand", flag: "🇹🇭", dial: "+66", price: Math.round(basePrice * 1.12) },
  { id: 78, name: "Mexico", flag: "🇲🇽", dial: "+52", price: Math.round(basePrice * 1.12) },
  { id: 86, name: "Italy", flag: "🇮🇹", dial: "+39", price: Math.round(basePrice * 1.20) },
  { id: 104, name: "Spain", flag: "🇪🇸", dial: "+34", price: Math.round(basePrice * 1.20) },
  { id: 117, name: "Portugal", flag: "🇵🇹", dial: "+351", price: Math.round(basePrice * 1.20) },
  { id: 175, name: "Singapore", flag: "🇸🇬", dial: "+65", price: Math.round(basePrice * 1.25) }
];

var pageSize = 8;
var totalPages = Math.ceil(COUNTRIES.length / pageSize);
if (page < 1) page = 1;
if (page > totalPages) page = totalPages;

var startIdx = (page - 1) * pageSize;
var pageCountries = COUNTRIES.slice(startIdx, startIdx + pageSize);

var buttons = [];
for (var i = 0; i < pageCountries.length; i += 2) {
  var c1 = pageCountries[i];
  var c2 = pageCountries[i + 1];
  var row = [
    { title: c1.flag + " " + c1.name + " (₹" + c1.price.toFixed(2) + ")", command: "c_sel " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + c1.price + " " + c1.id + " " + c1.name.replace(/\s+/g, "_") + " " + c1.dial + " " + c1.flag, style: "success" }
  ];
  if (c2) {
    row.push({
      title: c2.flag + " " + c2.name + " (₹" + c2.price.toFixed(2) + ")",
      command: "c_sel " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + c2.price + " " + c2.id + " " + c2.name.replace(/\s+/g, "_") + " " + c2.dial + " " + c2.flag,
      style: "success"
    });
  }
  buttons.push(row);
}

// Navigation row (Cyan / Primary style)
var nav = [];
if (page > 1) {
  nav.push({ title: "◀️", command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + basePrice + " " + (page - 1), style: "primary" });
} else {
  nav.push({ title: "◀️", command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + basePrice + " 1", style: "primary" });
}
nav.push({ title: "📄 " + page + "/" + totalPages, command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + basePrice + " " + page, style: "primary" });
if (page < totalPages) {
  nav.push({ title: "▶️", command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + basePrice + " " + (page + 1), style: "primary" });
} else {
  nav.push({ title: "▶️", command: "c_page " + srvCode + " " + srvName.replace(/\s+/g, "_") + " " + basePrice + " " + totalPages, style: "primary" });
}
buttons.push(nav);

buttons.push([
  { title: "🔙 Back to Services", command: "menu_services", style: "primary" }
]);

var text = "🌍 <b>Select Country for " + srvName + "</b>\n\n" +
  "Choose your country to get instant numbers:\n" +
  "<i>(Page " + page + "/" + totalPages + ")</i>";

Bot.sendInlineKeyboard(buttons, text);
