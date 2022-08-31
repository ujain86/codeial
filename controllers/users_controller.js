const User = require('../models/user');

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>');
    console.log(req.body);
    return res.render('users_profile', {
        title: 'Users/Profile',
    });
    
};

module.exports.name = function(req,res){
    res.end('<h1>User Name</h1>');
};

//Render the SignUp page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
     return res.render('signup', {
        title: 'Signup'
    });
};

//Render the SignIn page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signIn', {
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
            console.log("Error in finding the user");
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


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return; }    
        return res.redirect('/');
      });
};


