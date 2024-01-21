import { User } from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
export const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (
    [name, email, password, role].some((val) => {
      return !val || val === "";
    })
  ) {
    throw new apiResponse(200, { success: false, message: "required data" });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new apiResponse(200, {
      success: false,
      message: "user already exists",
    });
  }
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.API_user,
      pass: process.env.API_pass,
    },
  });

  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,
    subject: "OTP",
    text: "OTP",
    html: `<b>${otp} is your otp</b>`,
  });

  let data = {
    name: name,
    email: email,
    password: password,
    role: role,
    otp: otp,
  };
  var token = jsonwebtoken.sign(JSON.stringify(data), process.env.JWT_PASS);
  res
    .cookie("user", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1 * 60 * 60 * 1000,
    })
    .json(
      new apiResponse(200, {
        success: true,
        message: "Check your otp",
        email: email,
      })
    );
});

export const Otp = asyncHandler(async (req, res) => {
  let token = req.cookies["user"];
  let otp = req.body.otp;
  if (!token) {
    throw new apiResponse(200, {
      success: false,
      message: "server error",
    });
  }
  let data = jsonwebtoken.verify(token, process.env.JWT_PASS);
  console.log(data);
  if (data.otp !== otp) {
    throw new apiResponse(200, {
      success: false,
      message: "otp is not valid",
    });
  }

  const newuser = await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    prifileImg: "",
  });
  const newuserSave = await newuser.save({
    timestamps: { createdAt: true, updatedAt: false },
  });
  res
    .status(200)
    .cookie("user", "", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json(
      new apiResponse(200, {
        success: true,
        message: "ok",
      })
    );
});
