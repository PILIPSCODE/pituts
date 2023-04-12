const mongoose = require('mongoose')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')


const Usermodel = mongoose.Schema({
     name:{
        type:String,
        require:true
     },
     password:{
      type:String,
      require:true
     },
     email:{
      type:String,
      require:true
     },
     admin:{
      default:false
     },
     created:{
      type:String,
      default:"kunnn"
     },
     image:{
       type:String,
       default:"./img/nologin pic.jpg"
     },
     bio:{
      type:String,
      default:"Your bio"
     },
     web:{
      type:String,
      default:"https://pilipscode.github.io/Portfolio-new/"
     },
     todoispublic:{
      default:false,
      type:Boolean
     }
})


const Users = mongoose.model("users",Usermodel)
const validate = (data) => {
  const schema = joi.object({
      name:joi.string().label('Name'),
      email:joi.string().email().required().label('Email'),
      password:passwordComplexity().required().label('Password'),
  })
  return schema.validate(data)
}
module.exports = {Users,validate}