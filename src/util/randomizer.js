const crypto = require("crypto");

const RandomHexBytes = (bytesCount = 16) => {
  return crypto.randomBytes(bytesCount).toString("hex");
};


const RandomizeInteger = (min = 0, max = 1000)=> { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  RandomHexBytes,
  RandomizeInteger
};
