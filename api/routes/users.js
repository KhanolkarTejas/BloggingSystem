const router = require("express").Router();
const Post= require("../models/post");
const User = require("../models/user");
const bcrypt = require("bcrypt")

//update user

router.put("/:id",async (req,res)=>{
    console.log(
        "methos is runing")
    if(req.params.id){
    try{
        bcrypt.hash(req.body.password,10,async (err,hash)=>{    
            req.body.password=hash
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:req.body},{new:true})
            console.log(updatedUser)
            res.status(200).json(updatedUser); 
            
             });  

    }catch(err){
        res.status(500).json("have unique user name");
        
    }
}else{
    res.status(401).json('you can update only your account...')
}
})

/*
router.put("/:id",async(req,res)=>{
    if(req.body.userId==req.params.id)
    {
        const salt = await bcrypt.genSalt(10)
        req.body.password= await bcrypt.hash(req.body.password,salt)
        try{
            const updateUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body})
            res.status(200).json(updateUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("you can update only your account")
    }
});
*/


//deleter user

router.delete("/:id",async(req,res)=>{
    console.log(req.params.id,req.body.userId)
    if (req.body.userId==req.params.id){
            try{
                const user = await User.findById(req.params.id)
                console.log("user:---------->",user)
                try{
                    await Post.deleteMany({username:user.username})
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("user deleted...")
                }catch(err){
                    res.status(500).json("user not found error!")
                }   
            }catch(err){
                res.status(404).json("user not found")
            }  
    }else{
        res.status(401).json("you can't delete another user account")
    }
});


//get user

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { pasword, ...others}=user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json("user not found")
    }
})
//follow user
//unfollow user

module.exports=router