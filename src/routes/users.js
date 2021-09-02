const express = require('express');
const router = express.Router();
const passport = require('passport');
const {UserRegister,
  IsLoggedIn,
  LogOut,
  rediretToProfile,
  AllUser,
  profile
} = require('../controllers/UserController');

/* GET users listing. */

router.get('/',rediretToProfile,(req, res, next)=> res.render('index',{loggedIn: false}));

router.get('/profile',IsLoggedIn,profile)

/* POST routes users listing. */

router.post('/register',UserRegister)

router.post('/login',passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/'
}),function(req,res){})

router.get('/logout',LogOut)
router.get('/alluser',AllUser)



module.exports = router;
