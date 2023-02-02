const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_DB_CONFIG } = require('./config/app.config');
const http = require('http');
const server = http.createServer(app);
const {initMeetingServer} = require('./meeting-server');

initMeetingServer(server);


mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database Connected');
}, (error) => {
    console.log(error.message);
});

app.use(express.json());
app.use('/api/v1', require('./routes/app.routes'));

server.listen(process.env.port || 4444, function () {
    console.log('API Ready!!!');
});