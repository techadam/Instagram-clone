const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization) return res.status(401).json({error: "Unauthorized access"});

    const token = authorization.replace("Bearer ", "");
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = verified;

        const user = await User.findOne({_id: _id});
        if(user) req.user = user

        next();
    }catch(err) {
        res.status(400).json("Invalid token");
    }
}