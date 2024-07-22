const express = require("express");
const app= express();
const mongoose=require("mongoose")
const dotenv= require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer")
const path=require("path");


dotenv.config();


PATH="mongodb+srv://tejaskhanolkar023:tejas123@cluster0.jd46fjn.mongodb.net/"
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect( 'mongodb://127.0.0.1:27017/blogingSystem' || PATH).
then((console.log('database connected...'))).
catch((e)=>console.log(e));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
})


const upload = multer({storage:storage})
app.post("/api/upload",upload.single('file'),(req,res)=>{
    res.status(200).json("file has been uploaded")
})
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)

app.listen(8080,()=>{
    console.log("backend sever is running!...")
});



//import  {f1} from "./test.js";
/*const a =require("./test.js");
const x ={ 
    tejas:'tejas'
};
console.log(x["tejas"])*/

