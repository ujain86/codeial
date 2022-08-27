const User = require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>');
    // console.log(req.body);

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){console.log("error"); return;};

            if(user){
                return res.render('users_profile',{
                    title: 'Users/Profile',
                    user: user
                });
            }

            else{
                return res.redirect('users/signin');
            }
        })
    }

    else{
        return res.redirect('/users/signin');
    }
    
};

module.exports.name = function(req,res){
    res.end('<h1>User Name</h1>');
};

//Render the SignUp page
module.exports.signUp = function(req,res){
    res.render('signup', {
        title: 'Signup'
    });
};

//Render the SignIn page
module.exports.signIn = function(req,res){
    res.render('signIn', {
        title: 'Login'
    });
};

module.exports.createUser = function(req,res){
    // console.log(req.body);
    if(req.body.password != req.body.confirmPassword){
        console.log('Passwords do not match');
        return res.redirect('back');
    };

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding the user while signup");
            return;
        };

        if(!user){
            User.create(req.body, function(err, user){
                if(err)
                {
                    console.log("Error in creating the user");
                    return;
                }

                console.log('****', user);
                return res.redirect('/users/signin');
            });
        }
        else{
            console.log('User already exists');
            return res.redirect('back');
        };
    });

    };

    module.exports.createSession = function(req, res){
        
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                console.log("Error in finding the user while signin");
                return;
            }

            if(user){

                if(user.password == req.body.password){
                    res.cookie('user_id', user.id);
                    return res.redirect('/users/profile');
                }

                else{
                    console.log('incorrect password');
                    return res.redirect('back');
                };   
            }

            else{
                console.log('user not found');
                return res.redirect('/users/signup');
            };
        });
    };

