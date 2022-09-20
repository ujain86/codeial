const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', userController.update);

router.get('/name', userController.name);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create-user', userController.createUser);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',//method passport-local
    {failureRedirect: '/users/signin'},
), userController.createSession);

router.get('/signout', userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);



module.exports = router;