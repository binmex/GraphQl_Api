const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaClient = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  celphone: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  reservations: [
    {
      type: Schema.Types.ObjectId,
      ref: "reservation",
    },
  ],
});

module.exports = mongoose.model("client", SchemaClient);
