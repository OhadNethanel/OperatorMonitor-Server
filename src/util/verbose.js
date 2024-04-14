const getCurrentTimeStamp = require("./getCurrentTimeStamp");

module.exports = (msg) => {
  console.log(`${getCurrentTimeStamp()} :: ${msg}`);
};

