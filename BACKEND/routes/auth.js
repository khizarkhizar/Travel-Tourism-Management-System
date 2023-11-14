const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");
const User = require("../models/User");

var jwtSecret = "mysecrettoken";

//@route POST /users
//@desc Register user
//@access Public

router.post("/", [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter password with 6 or more characters").isLength({min: 6})
],
   async(req , res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name , email , password} = req.body;

    try{
        //see if user exists
        let user = await User.findOne({email});

        if(user){
            res.status(400).json({errors: [{msg:"User already exists"}]});
        }
        user = new User({
            name,
            email,
            password,
        });

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Return json web token(jwt)
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(payload, jwtSecret, {expiresIn: 360000}, (err, token) => {
            if(err) throw err;
            res.json({token});
        });
    }catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }


   }
);

//@route GET /users/auth
//@desc Get user by token/ Loading server
//@access Private 
router.get("/auth",auth , async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

 
//@route POST /users/auth
//@desc Authentication user & get token /Login user
//@access Public
router.post(
    "/auth", [
        check("email" , "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async(req , res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const { email , password} = req.body;
    
        try{
            //see if user exists
            let user = await User.findOne({email});
    
            if(!user){
                return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({errors: [{msg: "Invalid credentials"}]});
            }


            //Return jsonwebtoken(jwt)
            const payload = {
                user: {
                    id: user.id,
                }  
            };
    
            jwt.sign(payload, jwtSecret, {expiresIn: "5 days"}, (err, token) => {
                if(err) throw err;
                res.json({token});
            });
        }catch(err){
            console.log(err);
            res.status(500).send("Server Error");
        }
     }     
)

module.exports = router;

//bcrypt js is actually a password hashing library
//jasonwebtoken is a method for allowing authentication
//express-validator is used for server side validation

