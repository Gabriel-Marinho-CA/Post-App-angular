var express = require("express");
const router = express.Router();
var User = require("../models/user");
const cors = require("cors");
var app = express();

router.post("/autenticacao/signup", async function(req, res, next) {
    console.log("CHEGUEI AQUI");
    try {
        const { fname, lname, email, password } = req.body;

        const newUser = new User({
            firstName: fname,
            lastName: lname,
            password: email,
            email: password,
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

router.get("/autenticacao/signup", function(req, res, next) {
    console.log("chegou aqui memo");
});

app.use(cors());
// app.use(express.json())
module.exports = router;