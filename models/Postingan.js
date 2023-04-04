const mongoose = require('mongoose')




const postScema = mongoose.Schema({
    nameofpost:{
        require:true,
        type:String
    },
    bio:{
        require:true,
        type:String
    },
    pp:{
        type:String
    },
    image:{
        type:String
    },
    postText:{
        type:String,
        require:true
    },
    filter:{
        type:String,
    },
    email:{
        type:String
    },
    time:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    comments:{
        type:String,
        default:0
    }
})

const postModel = mongoose.model("post",postScema)


module.exports = postModel