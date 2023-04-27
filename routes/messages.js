var express = require("express");
const router = express.Router();
var Message = require("../models/message");

router.post('/', async function (req, res, next) {
    console.log(req.body.content)
    var message = new Message({
        content: req.body.content
    });

    console.log(message);

    try {
        await message.save();
    } catch (error) {
        console.log(error)
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


router.get('/', function (req, res, next) {
    Message.find()
        .exec()
        .then(messages => {
            console.log("dsadsa" + messages);
            res.status(200).json({
                message: 'Messages retrieved successfully',
                data: messages
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})


module.exports = router;