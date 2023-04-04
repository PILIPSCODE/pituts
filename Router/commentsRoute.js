const router = require('express').Router()
const comments = require('../models/comments')
const {date} = require('../auth/auth')
router.get("/comments",(req,res) => {
    comments.find((err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})




router.post('/comments',(req,res) => {
    const comment =new comments({
        comment:req.body.comment,
        filter:req.body.filter,
        nameofcomment:req.body.nameofcomment,
        ppofcomment:req.body.ppofcomment,
        date:date,
        email:req.body.email
    })
    comment.save((err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})
router.put('/comments/:id',(req,res) => {
    comments.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})
router.delete('/comments/:id',(req,res) => {
    comments.findByIdAndDelete({_id:req.params.id},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})


module.exports= router