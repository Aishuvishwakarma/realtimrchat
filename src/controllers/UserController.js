const Usermodel = require('../Models/usermodel')
const passport = require('passport');
const localStrategy = require('passport-local');
const usermodel = require('../Models/usermodel');
passport.use(new localStrategy(Usermodel.authenticate()));
exports.UserRegister = (req,res)=>{
    const {username,password,email} = req.body
    const newUser = new Usermodel({
      username : username ,
      email : email
    })
    Usermodel.register(newUser,password)
    .then((u)=> passport.authenticate('local')(req,res,()=> res.render('profile',u)))
    .catch((e)=> res.send(e))
}


 exports.IsLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }else{
      res.redirect('/')
    }
  }
  exports.LogOut = (req,res)=>{
    req.logOut();
  res.redirect('/')
  }

  exports.rediretToProfile = (req,res,next)=>{
    if(req.isAuthenticated()){
      res.redirect('/profile')
    }else{
      return next();
    }
  }
  exports.AllUser = (req,res,next) =>{
    usermodel.find()
    .then(u => console.log(u))
  }
  exports.profile = (req, res, next)=> {
    usermodel.find()
    .then (data=> res.render('profile',{User : data}))
  }