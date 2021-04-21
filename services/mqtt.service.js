const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL, {
    port: process.env.MQTT_PORT
});
let isConnected = false;
let isError = false;
let errorMsg = '';

client.on('connect', () => {
    isConnected = true;
});

client.on('error', e => {
    isError = true;
    errorMsg = e;
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