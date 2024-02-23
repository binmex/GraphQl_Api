const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaReservation = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  bookingStartDate: {
    type: Date,
    required: true,
  },
  bookingEndDate: {
    type: Date,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "client",
  },
});

module.exports = mongoose.model("reservation", SchemaReservation);
