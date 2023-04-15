const express = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const router = express.Router();

router.route('/register').get((req, res) => {
    res.send('this is a registration')
    res.json(res.body)
}).post(async (req, res) => {
    try {

        const { email, Password, username, phoneNumbers } = req.body;
        
        let userExists = await User.findOne({ email });

        if (userExists) {
            res.status(401).json({ message: "Email is already in use." });
            return;
        }


        const saltRounds = 10;


        bcrypt.hash(Password, saltRounds, (err, hash) => {
            if (err) throw new Error("Internal Server Error");

            // Create a new user
            let user = new User({
                email,
                username,
                Password: hash,
                phoneNumbers
            });

            // Save user to database
            user.save().then(() => {
                res.json({ message: "User created successfully", user });
            });
        });
    } catch (err) {
        return res.status(401).send(err.message);
    }
})
router.route('/log-in').get((req, res) => {
    res.send('this is a login')
}).post(async (req, res) => {
    try {
        // Extract email and password from the req.body object
        const { email, Password } = req.body;

        // Check if user exists in database
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        bcrypt.compare(Password, user.Password, (err, result) => {
            if (result) {

                const token = jwt.sign(
                    {
                        userId: user.username,
                        userEmail: user.email,
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                );


                return res.status(200).json({ message:"User Logged in Successfully" ,username:user.username, email: user.email, token: token });

            }

            console.log(err);
            return res.status(401).json({ message: "Invalid Credentials" });
        });
    } catch (error) {
        res.status(401).send(err.message);
    }
})

router.get('/find/:id',(req,res)=>{
   User.findById(req.params.id).then(user =>{
    res.json(user)
   })
   .catch(err=>{res.status(401).json("no users")})
})

router.get('/',(req,res)=>{
   User.find(req.params.id).then(users =>{
    res.json(users)
   })
   .catch(err=>{res.status(401).json("no users")})
})

// free endpoint
router.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
    response.json({ message: "You are authorized to access me" });
});

module.exports = router;