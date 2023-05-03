var express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/user/:name", function (req, res, next) {
  const { name } = req.params;
  res.render("node", {
    message: `Olá ${req.params.name}, bem vindo a aplicação!`,
  });
});

router.get("/welcome/:msg", (req, res, next) => {
  const { msg } = req.params;
  res.render("node", {
    message: msg,
  });
});

router.post("/register", (req, res, next) => {
  const { email, idade } = req.body;

  // console.log(data);
  const msgWelcome = `Email: ${email}.\n você possui ${idade} anos de idade.`;
  res.redirect("/welcome/" + msgWelcome);
});

router.get("/node-mongodb-mongoose-user", (req, res, next) => {
  res.render("node");
});

router.post("/node-mongodb-mongoose-user", async (req, res, next) => {
  const { emailBody } = req.body;

  if (!emailBody) {
    throw new Error("Email não informado.");
  }

  const userObject = new User({
    firstName: "gab",
    lastName: "mar",
    password: "segredo",
    email: emailBody,
  });

  try {
    const userSaved = await userObject.save();

    res.status(201).json({
      msg: "User saved with success",
      userSaved,
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error saving user ${e}`,
    });
  }

  res.redirect("/node-mongodb-mongoose-user");
});

router.get(
  "/node-mongodb-mongoose-user-busca/:msgParam",
  async function (req, res, next) {
    var chaveBuscaVar = req.params.msgParam;

    const userFind = await User.findOne({
      email: chaveBuscaVar,
    });

    if (isNull(userFind)) return res.send("ERROR!!!");

    res.render("node", {
      firstNameV: userFind.firstName,
      lastNameV: userFind.lastName,
      emailV: userFind.email,
      passwordV: userFind.password,
      messagesV: userFind.messages,
    });
  }
);
module.exports = router;
