//
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;

const users = [
    {name:'Yakov', id: 32},
    {name:'Israel', id: 28},
    {name:'David', id: 22},
    {name:'Daniel', id: 24}
];

app.use(cors());

app.get('/users', (req, resp) => {
// resp.send('Home - |Express JS|');
    resp.send(users);
})

// app.get('/ping', function (req, res) {
//     if (req.query.test === 'test'){
//         res.send('Listening in PORT = 123')
//     }else{
//         res.send('ERROR')
//     }
//
// })
console.log(process.env.PORT);

app.get('/home', (req, resp) => {
// resp.send('Home - |Express JS|');
resp.send('My name is - ' + req.query.name + ' and my car is - ' + req.query.car);
})

app.get('/:modelId', (req, resp) => {
// resp.send('Home - |Express JS|');
resp.send('My model car is - ' + req.params.modelId);
})

app.listen(port, () => {
    console.log(`Listening in PORT = ${port}`);
})

// console.log('HELLO FLASHDEV');

// const os = require('os');
// console.log(os.freemem()) // free Memory in the PC
// console.log(__filename) // address of the file

// alert('HELLO YEHUDA');
// window.console.log('YEHUDA THIS IS THE WINDOW');
// global.console.log('YEHUDA THIS IS THE SERVER');

//************ CREATE SERVER WITHOUT EXPRESS***************
// const http = require('http');
//
// http.createServer((req, res) => {
//     res.write('Hello Server');
//     res.end();
// }).listen(4000);