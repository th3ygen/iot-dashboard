const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator').default;

const User = mongoose.model('User');

const login = (username, password) => (
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                throw new Error({
                    label: `auth from {u:${username}, p:${password}}`,
                    msg: 'username not found'
                });
            }

            const isPassValid = await bcrypt.compare(password, user.hash);

            if (!isPassValid) {
                throw new Error({
                    label: `auth from {u:${username}, p:${password}}`,
                    msg: 'incorrect password'
                });
            }

            const token = jwt.sign({
                username, id: user._id
            }, process.env.JWT_SECRET);

            resolve(token);
        } catch (e) {
            console.log(Object.keys(e));
            reject({
                label: `auth from {u:${username}, p:${password}}`,
                msg: e
            });
        }
    })
);

const register = (username, password, email) => (
    new Promise(async (resolve, reject) => {
        try {
            if (!validator.isEmail(email)) {
                return reject({
                    label: 'register',
                    payload: {
                        username, password, email
                    },
                    msg: 'invalid email address'
                });
            }

            const emailExists = await User.findOne({ email });

            if (emailExists) {
                return reject({
                    label: 'register',
                    payload: {
                        username, password, email
                    },
                    msg: 'email address already exist'
                });
            }

            const usernameExists = await User.findOne({ username });

            if (usernameExists) {
                return reject({
                    label: 'register',
                    payload: {
                        username, password, email
                    },
                    msg: 'username already exist'
                });
            }

            const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS));

            const user = new User({
                username, hash, email
            });

            await user.save();

            resolve(user);
        } catch (e) {
            reject({
                label: 'register',
                payload: {
                    username, password, email
                },
                msg: e.message
            });
        }
    })
);

module.exports = {
    login, register
};