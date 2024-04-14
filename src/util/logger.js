
const fs = require("fs");
module.exports = (arrayLog) => {
  arrayLog.map((e) => {
    fs.appendFileSync(
      `./logs/ErrorLog-${new Date().toISOString().slice(0, 10)}.txt`,
      JSON.stringify(e) + "\n"
    );
  });
};
