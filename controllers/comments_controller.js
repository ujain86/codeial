const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('error in finding the post');
            return;
        }

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id //getting from app.use(passport.setAuthenticatedUser) from index.js
            }, function(err, comment){
                if(err){
                    console.log('error in creating new comment :', err);
                    return;
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            });
        }
    });
};