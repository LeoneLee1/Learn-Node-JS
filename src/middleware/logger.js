const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "access.log");

const logger = (req, res, next) => {
  const time = new Date().toISOString();

  const log = `[${time}] ${req.method} ${req.url}\n`;
  console.log(log.trim());

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error("Gagal menulis log:", err);
  });
  next();
};

module.exports = logger;
