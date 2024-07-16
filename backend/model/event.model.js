const mongoose = require("mongoose");
const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  ticketQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  soldTickets: {
    type: Number,
    required: true,
    default: 0,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  registeredUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      _id: { type: mongoose.Schema.Types.ObjectId, auto: false },
      ref: "users",
    },
  ],
  createdAt: {
    type: Number,
  },
});

const eventCollection = mongoose.model("events", EventSchema);

module.exports = { eventCollection };
