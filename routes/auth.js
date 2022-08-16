const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res)=>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        //respond with status 500 and return error
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async(req,res)=>{
    try{
        //find the unique user
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Wrong credentials!")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong credentials!")

        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;