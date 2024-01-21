import { User } from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";

export const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  if (
    [email, password].some((val) => {
      return val === "";
    })
  ) {
    throw new apiResponse(200, { success: false, message: "required data" });
  }
  let user = await User.findOne({ email: email });
  if (!user) {
    throw new apiResponse(200, {
      success: false,
      message: "Check your username or password",
    });
  }
  if (!user.CheckPassword(password)) {
    throw new apiResponse(200, {
      success: false,
      message: "Check your username or password",
    });
  }
  console.log(user);
  var token = jsonwebtoken.sign(JSON.stringify(user), process.env.JWT_PASS);
  res
    .status(200)
    .cookie("user", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new apiResponse(200, {
        success: true,
        message: "ok",
        data: { role: user.role },
      })
    );
});
