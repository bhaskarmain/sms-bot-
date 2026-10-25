/*CMD
command: adm_srv_toggle
help: Toggle service active/disabled
need_reply: false
auto_retry_tempfail: true
CMDs*/

var code = (params || "").trim();
if (!code) return;

var cur = Bot.getProperty("srv_disabled_" + code) || false;
Bot.setProperty("srv_disabled_" + code, !cur, "boolean");

Bot.sendMessage("✅ Service <code>" + code + "</code> status set to: <b>" + (!cur ? "DISABLED 🔴" : "ENABLED 🟢") + "</b>");
Bot.runCommand("adm_services");
