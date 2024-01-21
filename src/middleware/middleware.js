import { asyncHandler } from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js"
import jsonwebtoken from 'jsonwebtoken'
export const verifyMiddleware = asyncHandler(async (req, res, next) => {
  const token=req.cookies['user']
  if(!token||token===""){
    throw new apiResponse(200, { success: false})
  }
  let data=jsonwebtoken.verify(token, process.env.JWT_PASS);
  req.data=data
  next();
});
