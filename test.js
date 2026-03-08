const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.7hzyldu.mongodb.net", (err, records) => {
  if (err) {
    console.error("DNS Error:", err);
  } else {
    console.log("SRV Records:", records);
  }
});