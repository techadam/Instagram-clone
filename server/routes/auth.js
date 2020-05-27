const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validators
const {loginValidator, signupValidator} = require('../validator');

router.post('/login', async(req, res) => {
    //Validate user data
    const {error} = loginValidator.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    //Pull data from request body 
    const {email, password} = req.body;

    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({error: "Invalid email or password"});

    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword) return res.status(400).json({error: "Invalid email or password"});

    //jwt Token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res.json({
        token: token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        },
        message: "Login successful",
    })
})


router.post('/signup', async(req, res, next) => {
    //Validate user data
    const {error} = signupValidator.validate(req.body);
    if(error) return res.status(422).json({error: error.details[0].message});

    //Pull data from request body 
    const {name, email, password} = req.body;
    
    //email existed
    const emailExist = await User.findOne({email: email});
    if(emailExist) return res.status(400).json({error: "Email already taken"});

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    });

    try {
		const newUser = await user.save();
		res.json({_id: newUser._id, message: "user successfully saved"});
	}catch(err) {
        return res.json(err);
	}
})


module.exports = router;