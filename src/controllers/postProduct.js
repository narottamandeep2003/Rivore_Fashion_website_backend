import { Product } from "../models/product.model.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jsonwebtoken from "jsonwebtoken";
export const postProduct = asyncHandler(async (req, res) => {
  let token = req.cookies["user"];
  // console.log(token)
  let user = jsonwebtoken.verify(token, process.env.JWT_PASS);
  let file = req.file;
  const image = await uploadOnCloud(file.path);
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let color = req.body.color;
  let size = req.body.size;
  let categories = req.body.categories;
  let product = await Product.create({
    userId: user._id,
    title: title,
    description: description,
    imgUrl: image.url,
    price: price,
    quantity: quantity,
    color: color,
    size: size,
    categories: categories,
  });
  await product.save();
  res.json(new apiResponse(200, { success: true }));
});
export const getUserProduct = asyncHandler(async (req, res) => {
  let token = req.cookies["user"];
  let user = jsonwebtoken.verify(token, process.env.JWT_PASS);
  let data = await Product.find(
    { userId: user._id },
    { title: 1, price: 1, categories: 1, quantity: 1 }
  );
  res.json(new apiResponse(200, { success: true, data }));
});
export const getFeaturedProduct = asyncHandler(async (req, res) => {
  let data = await Product.find(
    {},
    { title: 1, price: 1, categories: 1, imgUrl: 1, description: 1 }
  ).limit(8);
  res.json(new apiResponse(200, { success: true, data }));
});

export const getProductInfo = asyncHandler(async (req, res) => {
  if(!req.params.id||req.params.id===""){
    throw new Error(200,{
      success: false,
      message: "invalid id",
    })
  }
  let data = await Product.findById(req.params.id);
  res.json(new apiResponse(200, { success: true, data }));
});
