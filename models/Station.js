const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    // Array of strings
    line: {
      type: Array,
      required: true
    },
    author: {
      type: Schema.Type.ObjectId,
      ref: 'users',
    }
  },

  {
    timestamps: true,
  }
);

Station = mongoose.model('Station', StationSchema);
module.exports = Alert;