const express = require("express");
const router = express.Router();

// Routes :
// 1. Signup (Done)
// 2. Signin (Done)
// 3. Update
// 4. Delete

// imports
const jwt = require('jsonwebtoken');
const { User } = require("../db");
const{ validateSignup, validateSignin } = require('../middlewares/signupAuth');
const validateUpdate = require("../middlewares/updateAuth");
const updateAuth = require("../middlewares/tokenAuth");
const tokenAuth = require("../middlewares/tokenAuth");



require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;


// SIGN-UP   
router.post("/signup", validateSignup, async (req, res) => {
    
    // This route will create a new user and save its id in a jwt token in a local storage.
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            password: req.body.password
        });

        const userId = newUser._id;

        const token = jwt.sign({
            userId,
            username :req.body.username,
            email:req.body.email,
            password:req.body.password
        }, jwt_secret );

        const payload = jwt.verify(token,jwt_secret);
        if (newUser) {
           
            res.status(200).json({
                message: "user Created successfully 2",
                token: token ,
                Payload: payload
                
            });
          

        } else {
            res.status(500).json({
                message: "Failed to create user"
            });
        }

    } catch (err) {
        res.status(500).json({
            message: "Error occurred during user creation",
            error: err.message
        });
    }
});

// SIGN-IN:
// will verify the credentials and check if the user exists in the database

router.post("/signin",validateSignin, async( req,res )=>{
    
    const {username,password} = req.body;

    const user = await User.findOne({
        username,password
    },

    { headers: { "Content-Type": "application/json" } });

    if(!user){
        return res.status(411).json({
            status:"error",
            message:"User not found!"
        })
    }

    const token = jwt.sign({
        user_id : user._id,
        username: user.username,
        email: user.email,
        password: user.password
    }, jwt_secret)

    const payload = jwt.verify(token,jwt_secret);

  
    return res.status(200).json({
            status:"user signed successfully",
            token:token,
            Payload:payload
        })
    
})

// UPDATE:
// First we authenticate the user token which contains credentials 
// Then attach the userId to the request

// how is the authorization attached the token?
router.put("/update",tokenAuth,validateUpdate, async (req,res)=>{
    
   const payload = req.body;
   console.log(req.user._id);
    await User.updateOne(
        { _id: req.user._id },
        { $set: payload }
    )
    return res.status(200).json({
        message:"update successfull"
    })
})

// Delete :
// will get all the credentials from the token and then delete the user

router.delete("/delete",tokenAuth, async(req,res)=>{
    await User.deleteOne(
        {_id: req.user_id}
    )

    return res.status(200).json({
        message:"user deleted"
    })
})

module.exports = router;
