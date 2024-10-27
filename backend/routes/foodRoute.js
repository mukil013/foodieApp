import { Foods } from "../model/foodModel.js";
import express from "express";

const route = express.Router();

// POST /api/foods
route.post("/", async (req, res) => {
  try {
    const newFood = {
      image: req.body.image,
      name: req.body.name,
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      hotelId: req.body.hotelId,
      hotelName: req.body.hotelName,
    };

    const food = await Foods.create(newFood);

    return res.status(201).send(food);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// GET /api/foods
route.get("/", async (req, res) => {
  try {
    const foodsData = await Foods.find({});
    return res.status(200).json(foodsData);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// DELETE /:id
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Foods.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Food item not found" });
    } else {
      return res
        .status(200)
        .send({ message: "Food item deleted successfully!" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.get("/:name", (res, req) => {
  const { hotelName } = req.params;

  const Foods = res.find({ hotelName: hotelName });

  return res.status(200).json(Foods);
});

export default route;
