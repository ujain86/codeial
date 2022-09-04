const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res){

    try{
    let posts = await Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    });
    let users = await User.find({});

    return res.render('home',{
        title: 'Home',
        posts: posts,
        all_users: users
        });
    }
    catch (err){
        console.log('Error', err);
        return;
    }
};



    // console.log(req.cookies);
    // return res.end('<h1>Express server is up</h1>');

    //to display all posts with user id
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

    ////to display all posts with user name by fetching details of user using objectID 
//     Post.find({}).populate('user')
//     .populate({
//         path: 'comments',
//         populate:{
//             path: 'user'
//         }
//     })    
//     .exec(function(err, posts){
//         if(err){
//             console.log('Error in fetching posts from db');
//             return;
//         }

//         User.find({}, function(err,users){
//             if(err){
//                 console.log('error in finding all users');
//                 return;
//             }

//             return res.render('home',{
//                 title: 'Home',
//                 posts: posts,
//                 all_users: users
//             });
    
//         })

        
    
//     });
    
// };
