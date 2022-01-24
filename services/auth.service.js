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
                username, id: user._id, role: user.role,
            }, process.env.JWT_SECRET);

            resolve({
                token,
                id: user._id,
                username: user.username,
                role: user.role || 'user',
                title: user.title || 'Guest',
            });
        } catch (e) {
            console.log(Object.keys(e));
            reject({
                label: `auth from {u:${username}, p:${password}}`,
                msg: e
            });
        }
    })
);

const register = (username, password, email, title) => (
    new Promise(async (resolve, reject) => {
        try {
            // username must be unique
            let user = await User.findOne({ username });

            if (user) {
                return reject({
                    label: `register from {u:${username}, p:${password}, e:${email}}`,
                    msg: 'username already exists',
                    payload: {
                        username,
                        email,
                        password,
                    },
                });
            }

            // username must have atleast 4 characters
            if (username.length < 4) {
                return reject({
                    label: `register from {u:${username}, p:${password}, e:${email}}`,
                    msg: 'username must have atleast 4 characters',
                    payload: {
                        username,
                        email,
                        password,
                    },
                });
            }

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

            /* const usernameExists = await User.findOne({ username });

            if (usernameExists) {
                return reject({
                    label: 'register',
                    payload: {
                        username, password, email
                    },
                    msg: 'username already exist'
                });
            } */

            const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS));

            user = new User({
                username, hash, email, title, role: 'user',
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

const create = (username, password, email, title, role) => (
    new Promise(async (resolve, reject) => {    
        try {
            let user = await User.findOne({ username });

            if (user) {
                return reject({
                    label: `create from {u:${username}, p:${password}, e:${email}}`,
                    msg: 'username already exists',
                    payload: {
                        username,
                        email,
                        password,
                    },
                });
            }

            const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS));

            user = new User({
                username, hash, email, title, role,
            });

            await user.save();

            resolve(user);
        } catch (e) {
            reject({
                label: 'create',
                payload: {
                    username, password, email
                },
                msg: e.message
            });
        }
    })
);

const update = (id, username, password, email, title, role) => (
    new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);

            if (!user) {
                return reject({
                    label: `update from {id:${id}, u:${username}, p:${password}, e:${email}}`,
                    msg: 'user not found',
                    payload: {
                        id,
                        username,
                        email,
                        password,
                    },
                });

            }

            if (username) {
                user.username = username;
            }

            if (password && password.length > 0) {
                user.hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALTROUNDS));
            }

            if (email) {
                user.email = email;
            }

            if (title) {
                user.title = title;
            }

            if (role) {
                user.role = role;
            }

            await user.save();

            resolve(user);

        } catch (e) {
            reject({
                label: 'update',
                payload: {
                    id, username, password, email
                },
                msg: e.message
            });
        }
    })
);


const getRole = (id) => (
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                return reject({
                    label: 'getRole',
                    msg: 'user not found'
                });

            }

            resolve(user.role);
        } catch (e) {
            reject({
                label: 'getRole',
                msg: e.message
            });
        }
    })
);

const deleteUser = (id) => (
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                return reject({
                    label: 'deleteUser',
                    msg: 'user not found'
                });
            }

            await user.remove();

            resolve();
        } catch (e) {
            reject({
                label: 'deleteUser',
                msg: e.message
            });
        }
    })
);

const get = (id) => (
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);

            if (!user) {
                return reject({
                    label: 'get',
                    msg: 'user not found'
                });
            }

            resolve(user);
        } catch (e) {
            reject({
                label: 'get',
                msg: e.message
            });
        }
    })
);

const getAll = () => (
    new Promise(async (resolve, reject) => {
        try {
            const users = await User.find({ role: "user" });

            resolve(users);
        } catch (e) {
            reject({
                label: 'getAll',
                msg: e.message
            });
        }
    })
);

module.exports = {
    login, register, getRole, deleteUser, getAll, create, get, update
};