const router = require('express').Router()
const followmodels = require('../models/followmodels')

router.get('/follow',(req,res) => {
    followmodels.find((err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.get('/follow/:id',(req,res) => {
    followmodels.findById(req.params.id,(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.post('/follow',(req,res) => {
    const follow = new followmodels(req.body)
    follow.save((err,data) => {
        if(err)console.log(err)
        res.json(data)
    })
})

router.delete('/follow/:id',(req,res) => {
    followmodels.findOneAndDelete(req.params.id,(err,data) =>{
        if(err)console.log(err)
        res.json(data)
    })
})
router.put('/follow/:id',(req,res) => {
    followmodels.findByIdAndUpdate({id:req.params.id},{following:req.body.following},{new:true},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})






module.exports = router



