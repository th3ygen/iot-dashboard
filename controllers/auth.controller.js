const auth = require('../services/auth.service');
const helper = require('../helpers/basic.helper');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const token = await auth.login(username, password);

            res.status(200).json({
                token
            });
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(401).json({
                msg: 'invalid username or password',
                err: e
            });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            await auth.register(username, password, email);

            res.status(200).json({
                msg: 'user created'
            });
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(401).json({
                msg: 'invalid username or password'
            });
        }
    }
}