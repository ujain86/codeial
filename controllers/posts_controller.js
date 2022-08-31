const Post = require('../models/post');

module.exports.create = function(req,res){
    // console.log(req.body.content);
    // console.log(req.user.email);

    Post.create({
        content: req.body.content,
        user: req.user._id //getting from app.use(passport.setAuthenticatedUser) from index.js
    }, function(err,post){
        if(err){
            console.log('error in creating a new post');
            return;
        }

        console.log('****', post);
        return res.redirect('back');
    })
}