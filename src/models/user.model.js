import mongoose from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "User"],
  },
  prifileImg: {
    type: String,
  }
});
UserSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,10)
  }
  next();
});
UserSchema.method('CheckPassword',async function(password){
  return await bcrypt.compare(this.password,password)
})
export const User = mongoose.model("user", UserSchema);
