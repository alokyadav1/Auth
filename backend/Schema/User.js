import mongoose from "mongoose";
import dotenv from "dotenv"
import encrypt from "mongoose-encryption"
dotenv.config();
const User = new mongoose.Schema(
    {
        email: String,
        password: String
    }
)
const secret = process.env.SECRET_KEY;
User.plugin(encrypt,{secret: secret, encryptedFields:["password"]})

export default mongoose.model("User", User);