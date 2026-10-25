/*CMD
command: tm_new
help: Request domains to create new Temp Mail
need_reply: false
auto_retry_tempfail: true
CMD*/

HTTP.get({
  url: "https://api.mail.tm/domains",
  success: "tm_on_domains"
});
