import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
dotenv.config({ path: "./.env" });
import app from "./app.js";
const port = process.env.PORT || 4000;

connectDB().then(async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connect");
  });
  app.listen(port, () => console.log("server start"));
  mongoose.connection.on("connected", () => {
    console.log("Connect");
  });
});
