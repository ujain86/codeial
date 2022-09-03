const Post = require('../models/post');
const Comment = require('../models/comment');

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
};

module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err,post){
        if(err){
            console.log('error in finding the post');
            return;
        }
        // here .id is used instead of ._id bcz it converts object id into string making it useful in comparison
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){
                    console.log('error in deleting comments');
                    return;
                }

                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
};

