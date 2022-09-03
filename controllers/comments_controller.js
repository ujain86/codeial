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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(err){
            console.log('error in finding the post');
            return;
        }
        // here .id is used instead of ._id bcz it converts object id into string making it useful in comparison
        if(comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate( postId, { $pull: {comments: req.params.id}}, function(err,post){
                if(err){
                    console.log('error in deleting comment id from post');
                    return;
                }
            });

        }
        
            return res.redirect('back');
        
    });
};
