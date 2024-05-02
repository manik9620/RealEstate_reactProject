import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);