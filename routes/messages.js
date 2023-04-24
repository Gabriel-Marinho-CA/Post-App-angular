var express = require("express");
const router = express.Router();


var Message = require("../models/message");

router.post('/mensagens', async function (req, res, next) {
    var message = new Message({
        content: req.body.content
    });


    await message.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                error: `Ocorreu um erro no servidor${err}`,

            });
        }
        res.status(200).json({
            msg: `Mensagem Salva com sucesso!${result}`,

        })
    })
});

router.get('/', function (req, res, next) {
    Message.find()
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    msg: `Um erro descoinhecido aconteceu${err}`
                })
            }
            res.status(200).json({
                msg: `Mensagem recuperada com sucesso ${result}`
            })
        })
})


module.exports = router;