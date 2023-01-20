import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import User from "./Schema/User.js"
import dotenv from "dotenv"
import mongoose from "mongoose";
import md5 from "md5";

//App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

//DB config
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true
    },
    (err)=>{
        if(err){
            console.log("Error connecting to Database",err.message);
        } else{
            console.log("Connected to database");
        }
    }
);

//API endpoints
app.get("/", (req, res) => {
    console.log("hello");
    res.status(200).send("Hello World");
})

app.post('/register', (req, res) => {
    //create User
    const newUser = new User({
        email:req.body.email,
        password:md5(req.body.password)
    })
    
    newUser.save(err=>{
        if(err){
            console.log(err);
        } else {
            console.log("signUp successful");
        }
    })
    res.status(200).send("success")
})

app.post("/login",(req,res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    User.findOne({email:email},(err,result)=>{
        if(err){
            console.log(err);
        } else {
            if(result){
                if(result.password === password){
                    console.log('login Successful');
                } else {
                    console.log("login failed");
                    console.log(result.password);
                    console.log(password);
                }
            }
        }
    })
    res.status(200).send("success")
})

//Listener
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})