import express from "express";
import { Otp, signUp } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { verify } from "../controllers/verify.js";
import { verifyMiddleware } from "../middleware/middleware.js";
import { logOut } from "../controllers/logout.js";
import { getFeaturedProduct, getProductInfo, getUserProduct, postProduct } from "../controllers/postProduct.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();
router.post("/signup", signUp);
router.post("/otp", Otp);
router.post("/login", login);
router.post("/verify", verifyMiddleware, verify);
router.post("/logout", logOut);
router.post("/postProduct", upload.single("file"), postProduct);
router.get("/userProduct",  getUserProduct);
router.get("/getFeaturedProduct",  getFeaturedProduct);
router.get("/getProductInfo/:id",  getProductInfo);
export default router;
