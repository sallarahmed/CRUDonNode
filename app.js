const express = require('express');
const app = express();
const Item = require('./models/items');
const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://sallarahmed:Admin123@cluster0.jmt8kio.mongodb.net/?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
mongoose.connect(mongoDB).then(() => {
    app.listen(3000);
    console.log('connected');
}).catch((err) => console.log(err))

app.get('/create-item', (req, res) => {
    const item = new Item({
        name: "Pixel",
        price: 800
    });
    item.save().then(result => res.send(result));
})

app.get('/get-items', (req, res) => {

    Item.find().then(result => res.send(result)).catch((err) => console.log(err));
})

app.get('/get-item', (req, res) => {

    Item.findById('62f2c8f98496b246ca733528').then(result => res.send(result)).catch((err) => console.log(err));
})

app.get('/', function (req, res) {
    // res.sendFile('./views/index.html', { root: __dirname })
    // const items = [
    //     {
    //         name: "Iphone",
    //         price: 200
    //     },
    //     {
    //         name: 'Pixel',
    //         price: 160
    //     },
    //     {
    //         name: 'OnePlus',
    //         price: 170
    //     }
    // ]
    // res.render('index', { items })
    // res.render('index', { items: [] })
    // res.redirect('/get-items')
    Item.find().then(result => {
        res.render('index', { items: result })
    }).catch((err) => console.log(err));

});

app.get('/get-items', function (req, res) {

    Item.find().then(result => {
        res.render('index', { items: result })
    }).catch((err) => console.log(err));
})

app.get('/add-items', function (req, res) {
    res.render('add-item');
})
app.use(function (req, res) {
    res.render('404')
})