var express = require('express');
const User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/user/:name', function (req, res, next) {
    const { name } = req.params;
    res.render('node', { message: `Olá ${req.params.name}, bem vindo a aplicação!` });
});

router.get('/welcome/:msg', (req, res, next) => {
    const { msg } = req.params;
    res.render('node', { message: msg });
})

router.post('/register', (req, res, next) => {
    const { email, idade } = req.body;

    // console.log(data);
    const msgWelcome = `Email: ${email}.\n você possui ${idade} anos de idade.`;
    res.redirect('/welcome/' + msgWelcome);
})

router.get('/node-mongodb-mongoose-user', (req, res, next) => {
    res.render('node');
})

router.post('/node-mongodb-mongoose-user', (req, res, next) => {
    const { emailBody } = req.body;
    console.log('@@@@@', emailBody);
    if (!emailBody) {
        throw new Error('Email não informado.');
    }

    const userObject = new User({
        firstName: 'Stans',
        lastName: 'Barbosa',
        password: 'segredo',
        email: emailBody
    });
    userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

router.get('/node-mongodb-mongoose-user-busca', async (req, res, next) => {
    // User.findOne({}, (err, documents) => {
    // if (err) {
    //     return res.send('Error!!!');
    // }
    // console.log('@@@documents', {
    //     firstNameV: documents.firstName,
    //     lastNameV: documents.lastName,
    //     emailV: documents.email,
    //     passwordV: documents.password,
    //     messagesV: documents.messages
    // });
    // res.render('node', { })
    // })
    const response = {
        firstNameV: userFind.firstName,
        lastNameV: userFind.lastName,
        emailV: userFind.email,
        passwordV: userFind.password,
        messagesV: userFind.messages
    }
    const userFind = await User.findOne({});
    console.log('@response', response);
    res.render('node', {
        firstNameV: userFind.firstName,
        lastNameV: userFind.lastName,
        emailV: userFind.email,
        passwordV: userFind.password,
        messagesV: userFind.messages
    });
    // User.findOne().exec((err, documents) => {
    //     if (err) {
    //         return res.send('Error!!!');
    //     }
        
    // })
})

module.exports = router;

// C:\Program Files\PROGRAMAS\MongoDB\Server\5.0\bin
