//time to resume : 2:00:34
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingsRouter from "./routes/booking-routes";
//import logo from "./logo.svg";
import cors from "cors";
//import "./movies/src/App.css";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingsRouter);

mongoose
    .connect(
        `mongodb+srv://Pranavi:${process.env.MONGODB_PASSWORD}@cluster0.dtr0sie.mongodb.net/`
    )
    .then(() =>
    app.listen(5000, () =>
      console.log("Connected to Database and Server is running")
    )   
    )
    .catch(e=>console.log(e));
