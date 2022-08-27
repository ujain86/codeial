const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);
router.get('/name', userController.name);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.post('/create-user', userController.createUser);
router.post('/create-session', userController.createSession);




module.exports = router;