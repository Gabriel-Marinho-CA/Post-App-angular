var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');
var appRoutes = require('./routes/app');
var messageRoutes = require("./routes/messages");
const Message = require("./models/message");

// const { MongoClient} = require("mongodb");

var app = express();


const db_name = 'node-angular';
// mongoose.connect(`mongodb://localhost:27017/${db_name}`);
async function main() {
    await mongoose.connect('mongodb+srv://gabriel:gabriel123-@cluster0.es8furw.mongodb.net/?retryWrites=true&w=majority')

    // const newMessage = new Message({
    //     content: "Sou um conteudo"
    // });

    // newMessage.save();
    console.log("conectado")

}
main().catch((err) => console.log(err))
// mongoose.connect(`mongodb+srv://gabriel:gabriel123-@cluster0.es8furw.mongodb.net/test`);
// mongoose.connect(`mongodb://localhost:27017/teste`);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


/* ============APLICATION ROUTES============== */


app.use('/message', messageRoutes);
app.use('/', appRoutes);



/* =========================== */

// async function main() {
//     await mongoose.connect('mongodb+srv://gabriel:gabriel123-@cluster0.es8furw.mongodb.net/test')
//     console.log("conectado ao mongoose")
// }

// main().catch((err) => console.log(err))

module.exports = app;