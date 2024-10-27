import expess from "express";
import { PORT, MONGO_URL } from "./config.js";
import { mongoose as mongo } from "mongoose";

import userRoute from './routes/userRoute.js'
import hotelRoute from './routes/hotelRoute.js'
import foodRoute from './routes/foodRoute.js'
import trackFoodRoute  from './routes/trackFoodRoute.js'

import cors from 'cors'

const app = expess();

app.use(cors())

app.use(expess.json())

app.use('/user', userRoute)
app.use('/hotel', hotelRoute)
app.use('/food', foodRoute)
app.use('/track-food', trackFoodRoute)


mongo
  .connect(MONGO_URL)
  .then(() => {
    console.log("Mongodb connected");

    app.listen(PORT, () => {
      console.log(`App is listening on port : ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

