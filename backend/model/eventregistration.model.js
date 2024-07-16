const mongoose = require("mongoose");
const eventRegistrationSchema = new mongoose.Schema({
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  phone: {
    type: String,
    require: true,
    maxLength: 10,
    minLength: 10,
  },
  EventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    required: true,
  },
  QuantityofTickets: {
    type: Number,
    required: true,
    min: 1,
  },
  TotalPricePaid: {
    type: Number,
    required: true,
  },
  PurchaseDate: {
    type: Number,
  },
});

const eventRegistrationCollection = mongoose.model("eventregistration", eventRegistrationSchema);

module.exports = { eventRegistrationCollection };
