var express = require("express");
const router = express.Router();
const Message = require("../models/message");
const User = require("../models/user");


router.get('/', async function (req, res, next) {
    try {
        const allMessagesData = await Message.find({});

        const allUsers = await User.find({});

        const transformedDatas = await formatMessages(allUsers, allMessagesData);

        // Não aceita aninhamento muito grande (aqui ta mandando 1 [] desnecessario por isso o flat);

        const formatedData = transformedDatas.flat();
        console.log(formatedData);

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
    const userLoggedId = req.body.author;

    // req body.author = id do user

    const userLogged = await User.findById(userLoggedId);

    if (!userLogged) return res.status(404).json({
        msg: "User not found"
    });

    const message = new Message({
        content: req.body.content,
        msgIdUserId: userLogged._id
    });

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


function formatMessages(users, messages) {
    const formattedMessages = [];

    users.forEach(user => {
        const messagesForUser = messages.filter(message => message.msgIdUserId.toString() === user._id.toString());

        const formattedMessagesForUser = messagesForUser.map(message => ({
            author: user.firstName,
            content: message.content,
            messageId: user._id,
            userId: message._id,
        }));

        formattedMessages.push(formattedMessagesForUser);
    });

    return formattedMessages;
}
// async function formatMessages(users, messages) {
//   const findUser = (userId) => users.find((user) => user._id.toString() === userId.toString());

//   const formattedMessages = [];

//   for (const message of messages) {
//     const user = findUser(message.msgIdUserId);

//     if (!user) {
//       continue; // skip this message if user not found
//     }

//     const formattedMessage = {
//       messageId: message._id,
//       content: message.content,
//       author: user.firstName,
//     };

//     const messagesForUser = formattedMessages.find((m) => m.userId === user._id);

//     if (!messagesForUser) {
//       formattedMessages.push({
//         userId: user._id,
//         messages: [formattedMessage],
//       });
//     } else {
//       messagesForUser.messages.push(formattedMessage);
//     }
//   }

//   return formattedMessages.map(({ userId, messages }) => ({
//     user: users.find((user) => user._id.toString() === userId.toString()),
//     messages,
//   }));
// }


module.exports = router;


// De acordo com esses arrays, faça uma função que retorne os dados dessa forma: 
// [{
//         _id: "644de9782511923304a7fc5a",
//         msgIdUserId: '644db4860a67d2dec9f904e8',
//         content: 'teste12',
//         firstName: 'AA',
//     },
//     {
//         _id: "644ded0601dd5b55ea164204",
//         content: 'caca',
//         msgIdUserId: '644db4860a67d2dec9f904e8',
//         firstName: 'AA',
//     }
// ],
// [
//     {
//         _id: "644df02e77ad836fa1448b0f",
//         content: 'teste po',
//         msgIdUserId: '644d6df9563740ff87ba41d7',
//         firstName: 'B',
//     }
// ]



// const users = [{
//         _id: "644d6df9563740ff87ba41d7",
//         firstName: 'B',
//         lastName: 'BB',
//         email: 'B@B',
//         password: 'BBB',
//         messages: [],
//     },
//     {
//         _id: "644db4860a67d2dec9f904e8",
//         firstName: 'AA',
//         lastName: 'AA',
//         email: 'A@A',
//         password: 'aaa',
//         messages: [],
//     }
// ]

// const msg = [{
//         _id: "644de9782511923304a7fc5a",
//         content: 'teste12',
//         msgIdUserId: '644db4860a67d2dec9f904e8',
//     },
//     {
//         _id: "644ded0601dd5b55ea164204",
//         content: 'caca',
//         msgIdUserId: '644db4860a67d2dec9f904e8',
//     },
//     {
//         _id: "644df02e77ad836fa1448b0f",
//         content: 'teste po',
//         msgIdUserId: '644d6df9563740ff87ba41d7',
//     }
// ]