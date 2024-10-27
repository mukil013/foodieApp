import mongoose from "mongoose";

const trackToodsSchema = mongoose.Schema(
  {
    clientName:{
      type: String,
      required: true
    },
    foodname: {
      type: String,
      required: true
    },
    hotelName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  }
);

export const trackFoods = mongoose.models.foods || mongoose.model('trackFood', trackToodsSchema);
