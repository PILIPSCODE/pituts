const router = require('express').Router()
const {upload} = require('../middelware/uploadImage')
const {Users} = require('../models/user')
const comments = require('../models/comments')
const postModel = require("../models/Postingan");
const fs =require('fs')
const path = require('path')
router.put('/upload/:id',(req,res) => {
    
    
    
    upload(req,res, async(err) => {
        if(err){
            console.log(err)
        } 
        else{
            console.log(req.file)
            if(req.file === undefined){
                const name = await Users.findOne({name:req.body.name});
                if(name)
                return res.status(409).send({message:"name Already Exist!"})
                await Users.updateOne({_id:req.params.id},{
                    $set:{name:req.body.name,bio:req.body.bio,web:req.body.web}
                 })
                await comments.updateMany(
                    {email:req.body.email},
                    {$set:{nameofcomment:req.body.name}
                })
                await postModel.updateMany(
                    {email:req.body.email},
                    {$set:{nameofpost:req.body.name,bio:req.body.bio}
                })
                res.send({msg:"file no acc"})
            }else{
                const filename  = req.body.imgold;
                const name = await Users.findOne({name:req.body.name});
                if(name)
                return res.status(409).send({message:"name Already Exist!"})
                if(filename !== "nologin pic.jpg"){

                    const imagePath = path.join(__dirname,'../',filename);
                    fs.unlink(imagePath, (err) => {
                      
                    });
                }
                await Users.updateOne({_id:req.params.id},{
                    $set:{image:req.file.path,name:req.body.name,bio:req.body.bio,web:req.body.web}
                 })
            
              
                 await comments.updateMany(
                      {email:req.body.email},
                      {$set:{ppofcomment:req.file.path,nameofcomment:req.body.name}
                  })
                  await postModel.updateMany(
                      {email:req.body.email},
                      {$set:{pp:req.file.path,nameofpost:req.body.name,bio:req.body.bio}
                  })
               
                  res.send({msg:"edited"})
            }
        }


    })
})


router.put('/uploadisi/:id',(req,res) => {
    Users.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})






module.exports = router