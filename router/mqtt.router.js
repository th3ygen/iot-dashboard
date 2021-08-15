const helper = require('../helpers/basic.helper');
const controller = {
    mqtt: require('../controllers/mqtt.controller')
};

const { client: mqtt } = require('../services/mqtt.service');

/* 
    data feed example
        iotdash/feed/<channelId>
*/
mqtt.subscribe('iotdash/+/+');

mqtt.on('message', async (topic, message) => {
    try {
        message = JSON.parse(message);
    } catch(e) {}

    topic = topic.split('/');

    // FEED
    if (topic[1] === 'feed') {

        // validate payload
        if (controller.mqtt.validate.payload(message)) {
            // validate channel id
            const channelId = await controller.mqtt.validate.isChannelExists(topic[2]);

            const { fieldName, value } = message;

            if (channelId !== '') {
                controller.mqtt.feed(fieldName, value, channelId);
            } else if (process.env.DEBUG) {
                helper.log(`Channel id does not exists, ${topic[2]}`, 'Data feed', 'red');
            }
        } else if (process.env.DEBUG) {
            helper.log(`Invalid payload format, recevied ${JSON.stringify(message)}`, 'Data feed', 'red');
        }

    }
    
});