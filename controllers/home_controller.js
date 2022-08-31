const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // return res.end('<h1>Express server is up</h1>');

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('Error in fetching posts from db');
    //         return;
    //     }

    //     return res.render('home',{
    //         title: 'Home',
    //         posts: posts
    //     });

    // });

    Post.find({}).populate('user').exec(function(err, posts){
        if(err){
            console.log('Error in fetching posts from db');
            return;
        }

        return res.render('home',{
            title: 'Home',
            posts: posts
        });
    
    });
    
};