module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>');
    return res.render('users_profile', {
        title: 'Users/Profile',
    });
};

module.exports.name = function(req,res){
    res.end('<h1>User Name</h1>');
};