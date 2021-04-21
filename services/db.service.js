const mongoose = require('mongoose');
const helper = require('../helpers/basic.helper');

module.exports = {
    init: () => (
        new Promise(async (resolve, reject) => {
            // Connect MongoDB at default port 27017.
            await mongoose.connect(process.env.DB_URL, {
                autoIndex: false,
                poolSize: 10,
                bufferMaxEntries: 0,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }, (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject({
                        label: 'mongodb',
                        msg: err
                    });
                }
            });
        })
    )
};