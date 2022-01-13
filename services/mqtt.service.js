const mqtt = require('mqtt');
const PrettyError = require('pretty-error');
const _helper = require('../helpers/basic.helper');

const pe = new PrettyError();

const callback = {
    data: {
        write: require('../mqtt/data.topic').write
    }
};

const client = mqtt.connect(process.env.MQTT_URL, {
    port: process.env.MQTT_PORT
});
let isConnected = false;
let isError = false;
let errorMsg = '';

client.on('connect', () => {
    isConnected = true;

    client.subscribe('iot-dash/+/write');
});

client.on('error', e => {
    isError = true;
    errorMsg = e;
});

client.on('message', (topic, message) => {
    try {
        topic = topic.split('/');
        const data = JSON.parse(message);
    
        if (topic[2] === 'write') {
            callback.data.write(topic[1], data, client);
        }
    } catch(e) {
        _helper.log(`Unable to parse message: ${e.message}`, 'error', 'red');
        console.log(pe.render(e));
    }
});

const connect = () => (
    new Promise((resolve, reject) => {
        if (isConnected) {
           return resolve();
        }

        if (isError) {
            return reject({
                label: 'mqtt',
                msg: e
            });
        }

        client.on('connect', () => resolve());
        client.on('error', e => reject({
            label: 'mqtt',
            msg: e
        }));
    })
);

module.exports = {
    client, connect
};