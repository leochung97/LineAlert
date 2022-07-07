const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StationSchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    // Array of strings
    line: [String],
    // alerts: [{ type: Schema.Types.ObjectId, ref: "Alert" }],
    latLng: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },

  {
    timestamps: true,
  }
);

Station = mongoose.model('Station', StationSchema);
module.exports = Station;