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
      type: [String],
      required: true
    },
    alerts: [{ type: Schema.Types.ObjectId, ref: "Alert" }]
  },

  {
    timestamps: true,
  }
);

Station = mongoose.model('Station', StationSchema);
module.exports = Station;