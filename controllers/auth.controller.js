const auth = require('../services/auth.service');
const helper = require('../helpers/basic.helper');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await auth.login(username, password);

            res.status(200).json(user);
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
            const { username, password, email, title } = req.body;

            await auth.register(username, password, email, title);

            res.status(200).json({
                msg: 'user created'
            });
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(401).json({
                msg: 'invalid username or password'
            });
        }
    },
    getRole: async (req, res) => {
        try {
            const role = await auth.getRole(req.payload.id);

            res.status(200).json(role);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error getting role'
            });
        }
    },
    delete: async (req, res) => {
        try {
            const user = await auth.deleteUser(req.payload.id);

            res.status(200).json(user);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error deleting user'
            });
        }
    },
    getAll: async (req, res) => {
        try {
            const users = await auth.getAll();

            res.status(200).json(users);
        } catch (e) {
            helper.log(e.msg, e.label, 'red');
            res.status(500).json({
                msg: 'error getting all users'
            });
        }
    }
}