const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: RegExp(".*@.*..*"),
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
