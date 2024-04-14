const { validateLogin } = require("../middlewares/validators");
const { BcryptComparePassword } = require("../util/bcrypt");
const router = require("express").Router();
const fs = require("fs");

router.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  if ((user == "operator"))
    return BcryptComparePassword(
      password,
      "$2b$10$0yen6fwtyBS2RVjmAfiGKeGfEe2iBK1gmamfBDm6LAEmanu8DlW56"
    )
      .then(() => {
        res.status(200).send(``);
      })
      .catch((err) => {
        res.status(400).send(`wrong pw :: ${err}`);
      });

  try {
    const data = fs.readFileSync(`./profiles/${user}.txt`, "utf8");
    console.log(data.split("\n"));
  } catch (err) {
    console.error(err);
  }
});

router.post("/profileLogin", async (req, res) => {
  res.status(200).send(``);
});

router.get("/profiles", async (req, res) => {
  try {
    const array = [];
    let files = fs.readdirSync("./profiles");
    files.map((e) => {
      array.push(e.split(".")[0]);
    });
    res.status(200).send(array);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
