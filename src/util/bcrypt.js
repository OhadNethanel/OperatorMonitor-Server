const bcrypt = require("bcrypt");

const BcryptHashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        return resolve(hashedPassword);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const BcryptComparePassword = (reqPassword, dbPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(reqPassword, dbPassword, (err, result) => {
      if (err) {
        return reject(err); //error in algorithm
      }
      if (result) {
        return resolve(result); //there is a match
      }
      return reject(false); //no match
    });
  });
};

module.exports = {
  BcryptHashPassword,
  BcryptComparePassword,
};