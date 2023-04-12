
const router = require('express').Router()
const {Users} = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const auth = require('../auth/asu')
const jwt = require('jsonwebtoken')



router.post('/infouser',(req,res) => {
    Users.find({name:req.body.name},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.get('/profile',auth,async(req,res) => {
    const user = await Users.findById(req.user._id)
  res.json({
    name:user.name,
    email:user.email,
    bio:user.bio,
    image:user.image,
    web:user.web,
    id:user._id,
    email:user.email
  })
})

router.get('/todopub',(req,res) => {
    Users.find({todoispublic:true},(err,data) => {
        if(err) console.log(err)
        res.json(data)
    })
})

router.post('/tokenValid', async (req,res) => {
    try {
        const token = req.header("token")
		if(!token){
			return res.json(false)
		} 
		const verifed = jwt.verify(token,process.env.JWTPRIVATEKEY)

		if(verifed) {return res.json(true)}

		const user = await Users.findById(verifed._id)
	    if(!user) {return res.json(false)}
        return res.json(true)
    } catch (error) {
        res.status(500).json({msg:error})
    }
})





router.post('/user/login',async (req,res) => {
    try {
        const {error} = validate(req.body)
         
        if(error)
        return res.status(400).send({message: error.details[0].message})

        const user = await Users.findOne({email:req.body.email});

        if(!user)
        return res.status(401).send({message:"Invalid Email or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password,user.password
        );

        if(!validPassword)
        return res.status(401).send({message:"Invalid Email or Password"})
  

        const ulgPassword = await bcrypt.compare(
            req.body.Ulangpassword,user.password
        );
        
        if(!ulgPassword)
        return res.status(401).send({message:"password & repeat password not same"})

        const token = jwt.sign({_id:user._id},process.env.JWTPRIVATEKEY,{
            expiresIn: '7d'
        })

        res.cookie('token',token,{
            httpOnly:true,
            
        })
        
        res.json({
            token:token,
            users:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
})







const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
        Ulangpassword:Joi.string().required().label("ulgPassword")
	});
	return schema.validate(data);
};















module.exports = router














// pertama get data user,filter == publictrue,map ,