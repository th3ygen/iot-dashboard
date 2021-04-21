// load .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const helper = require('./helpers/basic.helper');

const app = express();
const server = require('https').createServer({
    cert: fs.readFileSync(path.join(__dirname, 'cert', `${process.env.HOSTNAME}.crt`)),
    key: fs.readFileSync(path.join(__dirname, 'cert', `${process.env.HOSTNAME}.key`))
}, app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

(async () => {
    try {
        helper.log(`connecting to broker, url: ${process.env.MQTT_URL} port: ${process.env.MQTT_PORT}`, 'mqtt', 'green');
        await require('./services/mqtt.service').connect();
        helper.log('connected', 'mqtt', 'green');

        helper.log(`connecting to MongoDB server, url: ${process.env.DB_URL}`, 'mongodb', 'green');
        await require('./services/db.service').init();
        helper.log('connected', 'mongodb', 'green');
    } catch (e) {
        helper.log(e.msg, e.label, 'red');
        helper.log('Aborted, Ctrl+C to end the process', 'server', 'red');

        return;
    }

    require('./models');

    app.use(require('./router'));

    server.listen(process.env.PORT, () => {
        helper.log(`Server started, listening on port ${process.env.PORT}`, 'server', 'green');
    });
})();

