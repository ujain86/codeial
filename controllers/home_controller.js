module.exports.home = function(req,res){
    console.log(req.cookies);
    // return res.end('<h1>Express server is up</h1>');
    return res.render('home',{
        title: 'Home',
    });
};