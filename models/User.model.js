const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "cant left blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "cant left blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },

    title: String,

    likedChannels: [mongoose.Schema.Types.ObjectId],

    hash: String,
    salt: Number,
    avatar: String,
    role: String,
  },
  { timestamps: true }
);

schema.methods.likeChannel = async function(channelId) {
  const user = this;

  if (user.likedChannels.includes(channelId)) {
    return;
  }

  user.likedChannels.push(channelId);
  await user.save();
}

const User = mongoose.model("User", schema);

module.exports = User;
