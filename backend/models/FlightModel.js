const mongoose = require("mongoose");

const { Schema } = mongoose;

const flightsSchema = new Schema(
  {
    flightNumber: {
      type: String,
      required: true,
    },
    departureAirport: {
      type: String,
      required: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
    },
    departureDate: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    perSeatCost: {
      type: Number,
      default: 100,
    },
    //   booking: [Schema.Types.ObjectId],
    //   memberships: [Schema.Types.ObjectId],
    //   booking: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'booking',
    //   }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("flights", flightsSchema);
