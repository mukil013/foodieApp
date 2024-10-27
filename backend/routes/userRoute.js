import { User } from "../model/userModel.js";
import express from "express";

const route = express.Router();

route.post("/register", async (req, res) => {
  try {

    const newUser = {
      email: req.body.email,
      password: req.body.password,
      userName: req.body.userName,
      seller: req.body.seller,
    };

    const user = await User.create(newUser);

    return res.status(200).send(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.get("/", async (req, res) => {
  try {
    const usersData = await User.find({});

    return res.status(200).json(usersData);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.userName) {
      return res.status(400).send({ message: "Enter vaild details!!!" });
    } else {
      const { id } = req.params;

      const result = await User.findByIdAndUpdate(id);

      if (!result) {
        return res.status(400).send({ message: "user not found" });
      } else {
        return res.status(200).send({ message: "User updated!!!" });
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

    const result = await User.findByIdAndDelete(id);

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


route.post('/login', async (req,res) => {
  try{
    if(!req.body.email || !req.body.password){
      return res.status(300).send({message: 'All feilds required!'})
    }else{
      const result = await User.findOne({email: req.body.email, password: req.body.password})
      if(!result){
        return res.status(400).send({message: 'user not found!'})
      }else{
        return res.status(200).json({message: 'Login successfull'})
      }
    }
  }catch(e){
    console.log(e.message)
    res.status(500).send({message: e.message})
  }
})


export default route;
