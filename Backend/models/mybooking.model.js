const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  startdate: String,
  starttime: String,
});

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  BookingModel,
};
