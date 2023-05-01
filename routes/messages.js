var express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");
const Newsletter = require("../models/newsletter");


router.get('/', async function (req, res, next) {

    try {
        const allMessagesData = await Message.find({});

        const allUsers = await User.find({});

        const transformedDatas = await formatMessages(allUsers, allMessagesData);

        // Não aceita aninhamento muito grande (aqui ta mandando 1 [] desnecessario por isso o flat);
        const formatedData = transformedDatas.flat();

        return res.status(200).json({
            msg: "Mensagem recuperada com sucesso",
            data: formatedData
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Ocorreu um erro ao buscar as mensagens",
            err: error
        });
    }
});

router.post('/', async function (req, res, next) {
    const userLoggedId = req.body.userId;

    const userLogged = await User.findById(userLoggedId);

    if (!userLogged) return res.status(404).json({
        msg: "User not found"
    });

    const message = new Message({
        content: req.body.content,
        msgIdUserId: userLogged._id
    });


    const UserMessageAttach = await userLogged.messages.push(message);

    await userLogged.save(UserMessageAttach);

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

        const allUsers = await User.find({});

        const user = await findUserByMessageId(MessageDeleted._id, allUsers);

        const userMsgIds = user.messages.map(id => id.toString());

        const updatedMessages = userMsgIds.filter(id => id !== MessageDeleted._id.toString());

        await User.findByIdAndUpdate(user._id, {
            messages: updatedMessages
        });

        return res.status(200).json([{
                msg: "Message Deleted"
            },
            MessageDeleted
        ]);

    } catch (error) {
        res.status(404).json([{
                msg: "Fail to delete message"
            },
            error
        ]);
    }
});

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

router.post('/newsletter', async function (req, res, next) {
    const {
        gender,
        knowing,
        confirmSignup,
        emailNews
    } = req.body;

    const newNewsletter = new Newsletter({
        gender,
        knowing,
        confirmSignup,
        emailNews
    });

    try {
        await newNewsletter.save();
        return res.status(200).json({
            msg: "Newsletter send"
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Oops something went whwong while send the newsletter"
        })
    }

})


// --------  FUNCTIONS ----------- //

async function formatMessages(users, messages) {
    const formattedMessages = [];

    users.forEach(user => {
        const messagesForUser = messages.filter(message => message.msgIdUserId.toString() === user._id.toString());

        const formattedMessagesForUser = messagesForUser.map(message => ({
            author: user.firstName,
            content: message.content,
            messageId: message._id,
            userId: user._id,
        }));

        formattedMessages.push(formattedMessagesForUser);
    });
    return formattedMessages;
}

function findUserByMessageId(msg, users) {

    for (let i = 0; i < users.length; i++) {
        const msgIdStr = msg.toString();
        const userMsgIds = users[i].messages.map(id => id.toString());
        if (userMsgIds.includes(msgIdStr)) {
            return users[i];
        }
    }

    return null;
}

module.exports = router;