import { Hotel } from "../model/hotelModel.js";
import express from "express";

const route = express.Router();

route.post("/addHotel", async (req, res) => {
  try {
    if (
      !req.body.image ||
      !req.body.name ||
      !req.body.address ||
      !req.body.contact ||
      !req.body.sellerEmail ||
      !req.body.sellerName
    ) {
      return res.send(400).send({
        message: "All feilds are required!!!",
      });
    }

    const newHotel = {
      image: req.body.image,
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
      sellerId: req.body.sellerId,
      sellerEmail: req.body.sellerEmail,
      sellerName: req.body.sellerName,
    };

    const hotel = await Hotel.create(newHotel);

    return res.status(200).send(hotel);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const hotelData = await Hotel.find({});

    return res.status(200).json(hotelData);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    if (
      !req.body.image ||
      !req.body.name ||
      !req.body.address ||
      !req.body.contact ||
      !req.body.sellerEmail ||
      !req.body.sellerName
    ) {
      return res.status(400).send({ message: "Enter vaild details!!!" });
    } else {
      const { id } = req.params;

      const result = await Hotel.findByIdAndUpdate(id);

      if (!result) {
        return res.status(400).send({ message: "Hotel not found" });
      } else {
        return res.status(200).send({ message: "Hotel updated!!!" });
      }
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Hotel.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).send({ message: "user not found" });
    } else {
      return res.status(200).send({ message: "user deleted" });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

export default route;
