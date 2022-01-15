const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    commentorId: mongoose.Types.ObjectId,
    comment: String,
    replyTo: mongoose.Types.ObjectId,
    channelId: mongoose.Types.ObjectId,
}, { timestamps: true });

const Comment = mongoose.model('Comment', schema);

module.exports = Comment;