var express = require("express");
const router = express.Router();
var Message = require("../models/message");

router.get('/', async function (req, res, next) {

    try {
        const messages = await Message.find({});
        return res.status(200).json({
            msg: "Mensagem recuperada com sucesso",
            data: messages
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar as mensagens",
            err: error
        });
    }


});



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


router.delete('/:id', async function (req, res, next) {

    // console.log(req.body)
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

// router.get('/:id', async function (req, res, next) {
//     console.log(req.body);
//     console.log(req.params);

//     try {
//         const {
//             id
//         } = req.params;

//         const messageUpdateContent = await Message.findById(id);

//         res.status(200).json(messageUpdateContent);

//     } catch (error) {
//         res.status(500).json({
//             msg: "Ops, mensagem não existe"
//         });
//     }
// })



router.put('/:id', async function (req, res, next) {

    console.log(req.params);
    console.log(req.body);

    // try {
    //     const {
    //         id
    //     } = req.params;

    //     const MessageUpdated = await Message.findByIdAndUpdate(id, req.body);

    //     const responseUpdated = [{
    //             message: "Messsage updated !!"
    //         },
    //         MessageUpdated

    //     ]


    //     return res.status(200).json(responseUpdated)

    // } catch (error) {
    //     return res.status(400).json({
    //         msg: "Failed to update Product",
    //         err: error
    //     })
    // }
})




module.exports = router;