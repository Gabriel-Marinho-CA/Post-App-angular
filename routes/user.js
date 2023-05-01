var express = require("express");
const router = express.Router();
var User = require("../models/user");
const cors = require("cors");
var app = express();

router.post("/signup", async function (req, res, next) {
  try {
    const {
      fname,
      lname,
      email,
      password
    } = req.body;

    const newUser = new User({
      firstName: fname,
      lastName: lname,
      email: email,
      password: password
    });

    const userCreate = await newUser.save();

    return res.status(200).json([{
        msg: "User created successfull",
      },
      userCreate,
    ]);
  } catch (error) {
    return res.status(404).json([{
        msg: "User not created",
      },
      error,
    ]);
  }
});

router.post("/signin", async function (req, res, next) {
  try {
    const {
      email,
      password
    } = req.body;

    const userLogin = await User.findOne({
      email: email
    });


    if (!userLogin) return res.status(404).json({
      msg: "User/Email not Find",
    });

    if (userLogin.password !== password) return res.status(404).json({
      msg: "Wrong password",
    });

    return res.redirect("/");

  } catch (error) {
    res.status(404).json([{
        msg: "User not Find",
      },
      error
    ]);
  }
})
app.use(cors());
// app.use(express.json())

module.exports = router;