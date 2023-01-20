import mongoose from "mongoose";
const User = new mongoose.Schema(
    {
        email: String,
        password: String
    }
)
export default mongoose.model("User", User);