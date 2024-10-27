import mongoose from "mongoose";

const foodsSchema = mongoose.Schema(
  {
    image:{
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    quantity: {
      type: String,
      required: true
    },
    hotelId: {
      type: String,
      required: true
    },
    hotelName: {
      type: String,
      required: true
    }
  }
);

export const Foods = mongoose.model('foods', foodsSchema);
