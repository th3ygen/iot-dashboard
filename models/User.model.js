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

    hash: String,
    salt: Number,
    avatar: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
