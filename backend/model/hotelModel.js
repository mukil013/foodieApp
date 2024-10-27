import mongoose from "mongoose";

const hotelSchema = mongoose.Schema(
  {
    image:{
      type: String
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    sellerId: {
      type: String,
      required: true
    },
    sellerEmail: {
      type: String,
      required: true
    },
    sellerName: {
      type: String,
      required: true
    }
  }
);

export const Hotel = mongoose.models.hotels || mongoose.model('hotels', hotelSchema);
