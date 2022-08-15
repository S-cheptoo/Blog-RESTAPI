const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res)=>{
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        //respond with status 500 and return error
        res.status(500).json(err)
    }
});

//LOGIN
