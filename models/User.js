const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    preferences: {
      type: Object,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

User = mongoose.model("User", UserSchema);
module.exports = User;
