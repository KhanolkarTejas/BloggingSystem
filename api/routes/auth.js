const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")


//REGISTER
/*
router.post("/register", async (req,res)=>{
        //const salt= await bcrypt.genSalt(10)
        //const hashedPass = await bcrypt.hash(req.body.password,salt)
        //let hashedPass='t'
        let saltRound=10

        console.log('one')
        bcrypt.genSalt(saltRound,(err,salt)=>{
          //  console.log('two',hashedPass)
            bcrypt.hash(req.body.password,salt,async (err,hash)=>{
                try{
                    const newUser = new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:hash,
                    });
                const user=await newUser.save();
                res.status(200).json(user);
                   }catch{
                res.status(500).json(err);
                     }

            })
            
        })

         //console.log(hashedPass,console.log('ans is'+ans))
        //bcrypt.genSalt(salt)
        //const user=await newUser.save();

    });

   */ 

//RESISTER
/*
router.post("/register",( req , res )=>{
    
    bcrypt.gesnSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password,salt,(err,hash)=>{
             hashValue = hash;
             console.log(hashValue);
        })
    })
    
   bcrypt.hash(req.body.password,10,async (err,hash)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hash, 
        });

    const user=await newUser.save();
    res.status(200).json(user);    
    });   
});

*/



//login
/*
router.post("/login",async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("wrong credentials...!")
 
        const validated = await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("wrong credentials")
    
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
});
*/


/*
router.post('/login',async (req,res)=>{
    const user= await User.findOne({username:req.body.username});
    !user && res.status(400).json("wrong credential")

    bcrypt.compare(req.body.password,user.password).then(function(result){
        if (result==true){
            console.log(user)
            const {password, ...other}=user._doc
            res.status(200).json(other)
        }else{
            console.log(result)
            res.status(400).json("wrong credentials")
            } 
    })

})
*/

//REGISTER
router.post("/register", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
      });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN
  /*
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(496).send("canot find user")
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(496).send("cannot find user")
  
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  */
  router.post('/login',async (req,res)=>{
    const user= await User.findOne({username:req.body.username});
    if (user){
        bcrypt.compare(req.body.password,user.password).then(function(result){
            if (result==true){
                console.log(user)
                const {password, ...other}=user._doc
                res.status(200).json(other)
            }else{
                console.log(result)
                res.status(400).json("wrong credentials")
                } 
        })

    }else{
       res.status(400).json("wrong credential")

    }
    
})
  module.exports = router;

