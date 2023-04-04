const mongoose = require('mongoose')




const followScema = mongoose.Schema({
    name:{
        require:true,
        type:String
    },
    image:{
        type:String
    },
    followersid:{
        type:String,
        require:true
    },
    yourid:{
        type:String,
        require:true
    },
    following:{
        type:String,
        default:"0"
    }

 
})

const followModel = mongoose.model("follow",followScema)


module.exports = followModel