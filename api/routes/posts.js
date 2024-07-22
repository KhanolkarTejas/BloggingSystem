const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

//create post
router.post("/", async (req, res) => {
  const newPost = await new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post


router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.username,req.body.username)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      res.status(401).json("you can update only user post!....");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//deleter post

router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post.username,req.body.username)
      if (post.username === req.body.username) {
        try {
           await Post.findByIdAndDelete( req.params.id );
          res.status(200).json("post deleted!");
        } catch (err) {
          res.status(500).json(err)
        }
      } else {
        res.status(401).json("you can delete only user post!....");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


  /*
router.delete("/:id", async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted...");
      } catch (err) {
        res.status(500).json("user not found error!");
      }
    } catch (err) {
      res.status(404).json("user not found");
    }
  } else {
    res.status(401).json("you can't delete another user account");
  }
});
*/
//get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts

router.get("/",async (req, res)=>{
    const userName = req.query.user;
    const catName =  req.query.cat;
    try{
        let posts;
        if(userName){
            posts = await Post.find({username:userName})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts); 
    }catch(err){
        res.status(500).json(err);
    }
})
//follow user
//unfollow user

module.exports = router;


/*
const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.username)
    console.log(req.body.username)
    if (post.username == req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
*/