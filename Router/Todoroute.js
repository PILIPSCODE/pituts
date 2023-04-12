const router = require('express').Router()
const TodoModel = require('../models/TodoList')
const {randomString,date,time} = require('../auth/auth')




router.get('/todo-list',(req,res) => {
    TodoModel.find((err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})


router.post('/todo-list',(req,res) => {
    const todoList = new TodoModel({
        nameofpost:req.body.nameofpost,
        bio:req.body.bio,
        pp:req.body.pp,
        postText:req.body.postText,
        filter:randomString(7),
        email:req.body.email,
        time:time,
        date:date,
        ismain:req.body.ismain,
        isfinish:false,
    })
    todoList.save((err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.put('/todo-list/:id',(req,res) => {
    TodoModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.delete('/todo-list/:id',(req,res) => {
    TodoModel.findByIdAndDelete({_id:req.params.id},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})
router.put('/todo-list/:id',(req,res) => {
    TodoModel.updateOne({_id:req.params.id},{
        $set:{isfinish:req.body.isfinish}
    })
})
router.put('/todo-list/:id',(req,res) => {
    TodoModel.updateOne({_id:req.params.id},{
        $set:{isprivate:req.body.isprivate}
    })
})















module.exports = router