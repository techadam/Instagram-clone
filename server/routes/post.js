const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const {postValidator} = require('../validator');
const verifyTokenMiddleware = require('../middleware/verifyToken');

router.get('/all', verifyTokenMiddleware, async (req, res) => {
    try {
        const posts = await Post.find().populate({path: 'postedBy', select: 'name', model: User});
        res.json({posts: posts});
    }catch(err) {
        return res.json({error: err});
    }
})

router.get('/', verifyTokenMiddleware, async(req, res) => {
    try {
        const posts = await Post.find({postedBy: req.user._id}).populate({path: 'postedBy', select: 'name', model: User});
        res.json({posts: posts});
    }catch(err) {
        return res.json({error: err});
    }
})

router.post('/create', verifyTokenMiddleware, async(req, res, next) => {
    const {title, body, photo} = req.body;

    const {error} = postValidator.validate(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //Remove user password on request
    req.user.password = '';
    
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user._id
    })

    try {
       const newPost = await post.save();
       res.json({post: newPost});
    }catch(err) {
        return res.json({error: err});
    }

})

router.put('/like', verifyTokenMiddleware, async(req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $push: {likes: req.user._id}
        },{
            new: true,
        }).exec();
        res.json(result);
    }catch(err) {
        return res.json({error: err});
    }
})

router.put('/unlike', verifyTokenMiddleware, async(req, res) => {
    try {
        const result = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: {likes: req.user._id}
        },{
            new: true,
        }).exec();
        res.json(result);
    }catch(err) {
        return res.json({error: err});
    }
})

module.exports = router;