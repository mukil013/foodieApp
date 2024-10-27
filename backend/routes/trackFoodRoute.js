import { trackFoods } from "../model/trackOrder.js";
import express from "express";

const route = express.Router();

// POST /api/trackfood
route.post("/", async (req, res) => {
  try {
    const { clientName, foodName, hotelName, status } = req.body;

    if (!clientName || !foodName || !hotelName || !status) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    const newTrackFood = {
      clientName,
      foodName,
      hotelName,
      status,
    };

    const trackFood = await trackFoods.create(newTrackFood);
    return res.status(201).send(trackFood);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// GET /api/trackfood
route.get("/", async (req, res) => {
  try {
    const trackFoodData = await TrackFood.find({});
    return res.status(200).json(trackFoodData);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// PUT /api/trackfood/:id
route.put("/:id", async (req, res) => {
  try {
    const { clientName, foodName, hotelName, status } = req.body;

    if (!clientName || !foodName || !hotelName || !status) {
      return res.status(400).send({ message: "Enter valid details!" });
    }

    const { id } = req.params;

    const result = await TrackFood.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      return res.status(404).send({ message: "Food item not found" });
    } else {
      return res.status(200).send({ message: "Food item updated successfully!", data: result });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// DELETE /api/trackfood/:id
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await TrackFood.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Food item not found" });
    } else {
      return res.status(200).send({ message: "Food item deleted successfully!" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

// GET /api/trackfood/hotel/:hotelName
route.get('/hotel/:hotelName', async (req, res) => {
  try {
    const { hotelName } = req.params;
  
    const foods = await TrackFood.find({ hotelName: hotelName });

    if (foods.length === 0) {
      return res.status(404).send({ message: "No food items found for this hotel." });
    }

    return res.status(200).json(foods);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ message: e.message });
  }
});

export default route;
