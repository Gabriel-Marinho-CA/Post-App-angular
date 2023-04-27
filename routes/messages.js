var express = require("express");
const router = express.Router();
var Message = require("../models/message");


router.get('/', function (req, res, next) {
    return res.render('index');
    // Message.find()
    //     .then((res) => {
    //         res.status(200).json(200).json({
    //             msg: "Mensagem recuperada com sucesso",
    //         })
    //     })
    //     .catch((err) => {
    //         return res.status(500).json({
    //             msg: "Ocorreu  um erro ao buscar as mensagens",
    //             error: err
    //         })

    //     })
})


router.post('/', async function (req, res, next) {

    var message = new Message({
        content: req.body.content
    });

    try {
        const msgAdded = await message.save();
        res.status(200).json([{
            msg: "Mensagem cadastrada"
        }, msgAdded]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Ocorreu um erro ao adicionar a mensagem"
        });
    }
});



router.put('/:id', async function (req, res, next) {
    try {

        const {
            id
        } = req.params;

        const MessageUpdated = await Message.findByIdAndUpdate(id, req.body);

        const responseUpdated = [{
                message: "Messsage updated !!"
            },
            MessageUpdated

        ]


        return res.status(200).json(responseUpdated)

    } catch (error) {
        return res.status(400).json({
            msg: "Failed to update Product",
            err: error
        })
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        const {
            id
        } = req.params;

        const MessageDeleted = await Message.findByIdAndDelete(id);

        return MessageDeleted ?
            res.status(200).json([{
                    msg: "Product Deleted"
                },
                MessageDeleted
            ]) :
            res.status(404).json({
                msg: "Message does not exists"
            })
    } catch (error) {
        res.status(404).json([{
                msg: "Fail to delete message"
            },
            error
        ])
    }
})




module.exports = router;