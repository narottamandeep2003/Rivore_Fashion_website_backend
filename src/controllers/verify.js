import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
export const verify = asyncHandler(async (req, res) => {
  let data = req.data;
  let user = await User.findOne({ email: data.email });
  if (!user) {
    throw new apiResponse(200, { success: false });
  }
  if (!user.CheckPassword(data.password)) {
    throw new apiResponse(200, { success: false });
  }
  res.json(
    new apiResponse(200, {
      success: true,
      data: {
        role: user.role,
      },
    })
  );
});
