//  timestamp ready for oracle
// module.exports = () => new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
// module.exports = () => new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString(); //ISRAEL - ISO
module.exports = () =>
  new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, ""); //ISRAEL - CLEAN ISO TIME
