const mongoose=require("mongoose");

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:false
    },
    photo:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        required:false,
    },
    categories:{
        type:Array,
        required:false
    }

},{timestamps:true})

module.exports=mongoose.model("post",PostSchema)
