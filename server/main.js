const express = require('express');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/*
    LOAD THE CONFIG (mongoDB)
*/
const config = require('./config');

const app = express();
const port = 3000;
const devPort = 3001;

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// print the request log on console
app.use(morgan('dev'));

// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

app.use('/', express.static(__dirname + '/../public'));

// configure api router
app.use('/api', require('./routes/api'));

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?');
});

// open the server
const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

/*
    CONNECT TO MONGODB SERVER
*/
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('connected to mongodb server');
});