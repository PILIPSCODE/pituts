const router = require("express").Router();
const { upload } = require("../middelware/uploadImage");
const postModel = require("../models/Postingan");
const comments = require('../models/comments')

const {randomString,date,time} = require('../auth/auth')
const fs =require('fs')
const path = require('path')

router.get("/YourPost",(req,res) => {
  postModel.find((err,data) => {
    if(err) console.log(err)
    res.json(data)
  })
})

router.get("/YourPost/:id",(req,res) => {
  postModel.findById(req.params.id,(err,data) => {
    if(err) console.log(err)
    res.json(data)
  })
})
router.delete("/YourPost/:id",(req,res) => {
  const filename  = req.body.img;
  const imagePath = path.join(__dirname,'../',filename);
  comments.deleteMany({filter:req.body.filter},(err,data) => {})
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Image deleted successfully');
    }
  });
  postModel.findByIdAndDelete(req.params.id,(err,data) => {
    
  })
})


router.put("/putcommmany/:filter",async(req,res) => {
 await postModel.updateOne({filter:req.params.filter},{
    $set:{comments:req.body.commentar}
  })
})



router.post("/YourPost", (req, res) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    else {
      if (req.file == undefined) {
        res.send("file no acc");
      } else {
        const posting = {
          nameofpost: req.body.nameofpost,
          bio:req.body.bio,
          pp:req.body.pp,
          image:req.file.path,
          postText:req.body.postText,
          filter:randomString(7),
          date:date,
          time:time,
          email:req.body.email,
        };

        const addpostting = new postModel(posting)
        addpostting.save((err,data) => {
          if(err)console.log(err)
          res.json(data)
        })
      }
    }
  });
});

module.exports = router;
