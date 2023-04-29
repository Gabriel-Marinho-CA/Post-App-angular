var express = require("express");
const router = express.Router();
var Message = require("../models/message");


router.get('/', async function (req, res, next) {
    try {
        const messagesData = await Message.find({});
        return res.status(200).json({
            msg: "Mensagem recuperada com sucesso",
            data: messagesData
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar as mensagens",
            err: error
        });
    }
});

router.post('/', async function (req, res, next) {
    const message = new Message({
        user: {
            firstName: req.body.name
        },
        content: req.body.content
    });
    console.log(req.body);

    try {

        const MessageAdded = await message.save();
        res.status(200).json([{
                msg: "Mensagem cadastrada"
            },
            MessageAdded
        ]);

    } catch (error) {
        res.status(500).json({
            error: "Ocorreu um erro ao adicionar a mensagem"
        });
    }
});


router.delete('/:id', async function (req, res, next) {
    try {
        const {
            id
        } = req.params;

        const MessageDeleted = await Message.findByIdAndDelete(id);

        return res.status(200).json([{
                msg: "Message Deleted"
            },
            MessageDeleted
        ])

    } catch (error) {
        res.status(404).json([{
                msg: "Fail to delete message"
            },
            error
        ])
    }
})

router.put('/:id', async function (req, res, next) {

    try {
        const {
            id
        } = req.params;

        const MessageUpdated = await Message.findByIdAndUpdate(id, req.body);

        return res.status(200).json([{
                msg: "Messsage updated!"
            },
            MessageUpdated
        ])

    } catch (error) {
        return res.status(400).json([{
            msg: "Failed to update Message",
        }, error])
    }
})


module.exports = router;