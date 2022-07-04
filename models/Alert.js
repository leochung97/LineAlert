const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlertSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

Alert = mongoose.model("Alert", AlertSchema);
module.exports = Alert;

// pour Leo
// https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/