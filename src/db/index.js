import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
export const connectDB = async () => {
  const instance = await mongoose.connect(
    `${process.env.MONGODB_URL}${DB_NAME}?retryWrites=true&w=majority`
  );
  console.log(instance.connection.host);
};
