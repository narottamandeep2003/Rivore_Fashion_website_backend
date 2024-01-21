import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  categories: {
    type: String,
    required: true,
    index: true
  },
});
export const Product = mongoose.model("Product", ProductSchema);
