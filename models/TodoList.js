const mongoose = require('mongoose')



const todoscema = mongoose.Schema({
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
    },
    ismain:false,
    isfinish:false
})


const Todomodel = mongoose.model('Todo-List',todoscema)

module.exports = Todomodel