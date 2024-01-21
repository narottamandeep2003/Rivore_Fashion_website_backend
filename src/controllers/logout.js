
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const logOut = asyncHandler(async (req, res) => {
  res.cookie("user", "", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1 * 60 * 60 * 1000,
  });
  res.status(200).json(
    new apiResponse(200, {
      success: true,
      message: "ok",
    })
  );
});
