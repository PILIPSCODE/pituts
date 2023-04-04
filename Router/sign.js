const router = require('express').Router()
const {Users,validate} = require('../models/user');
const bcrypt = require('bcrypt')

router.post('/user/sign',async(req,res) => {
    try {
        const {eror }= validate(req.body);
        if(eror)
        return res.status(400).send({message: eror.details[0].message})

        const user = await Users.findOne({email:req.body.email});
        if(user)
        return res.status(409).send({message:"Email Already Exist!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        await new Users({...req.body,password:hashPassword}).save();
        res.status(200).send({message:"successfuly"})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
        console.log(error)
    }
})

module.exports = router;