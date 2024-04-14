const validateLogin = (req, res, next) => {
  const userName = req.body.userName ? `${req.body.userName}` : null;
  const password = req.body.password ? `${req.body.password}` : null;

  if (!userName || !password) {
    return res.status(400).send("Invalid request");
  }

  if (userName.length > 20) {
    return res.status(400).send("Invalid userName");
  }
  if (password.length > 50) {
    return res.status(400).send("Invalid password");
  }

  return next();
};

const validateRemoveFile = (req, res, next) => {
  const file = req.body.file || null;
  if (!file) {
    return res.status(400).send("Missing file name");
  }
  next();
};

module.exports = { validateLogin, validateRemoveFile };
