const express = require('express'); 
const router = express.Router(); 
// const upload =require('../utils/multer')
const { signup,login,} = require('../controllers/LoginSignupController');


router.post('/register', signup); 

router.post('/login', login);

module.exports = router; 