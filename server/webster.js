const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const mongoose = require('mongoose');

const {SERVER, DB} = require('./config');
const config = require("./config");
const app = express();
// const wwwDir = '../www';
const clientDir = '../client/build';
const imageDir = '../img';


app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://my.printapp.store', 'http://img.printapp.store', 'http://api.printapp.store', 'http://printapp.store']
}));

// app.all('*', function(req, res, next) {
//     let origin = req.get('origin');
//     console.log(origin);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', origin);
//     // res.header('Access-Control-Allow-Origin', "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// console.log(path.resolve(config.STORAGE_FILES, 'photos'));

app.use(express.json({ extended: true }));
// app.use('/img', express.static(imageDir));
app.use(fileUpload({}));
app.use(cookieParser());
let corsOptions;
// app.all('*', function(req, res, next) {
//     let origin = req.get('origin');
//     corsOptions = {
//         credentials: true,
//         origin: origin
//     }
//     console.log(origin);
//     next();
// });



// app.use('/api', cors, require('./routes/api.routes'));
app.use('/api', require('./routes/api.routes'));

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev') {
    // app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.use('/', express.static(clientDir));
    // app.use('/', express.static(wwwDir));

    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname, wwwDir, 'index.html'));
    // });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, clientDir, 'index.html'));
    });
}


async function start() {
    try {
        await mongoose.connect(DB.MONGOOSE.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(SERVER.PORT, () => {
            console.log(`Server start at ${SERVER.PROTOCOL}://${SERVER.HOST}:${SERVER.PORT}`);
        })
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();