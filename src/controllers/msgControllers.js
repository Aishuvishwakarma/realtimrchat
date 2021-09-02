const UserModel = require('../Models/usermodel');
const msgModel = require('../Models/msgModel');
const uuid = require('uuid');
const usermodel = require('../Models/usermodel');
exports.MessageCreate = (req,res,next) =>{
   
}

exports.Allmsg = (req,res) =>{
    msgModel.find({username : req.params.username})
    .then((msg) =>  res.status(200).json(msg)
    )}

    exports.chatpanel = (req,res) =>{
     usermodel.findOne({username: req.session.passport.user})
     .then( loggedInUser=>{
      UserModel.findOne({username : req.params.username})
      .then(u => {
        UserModel.find()
        .then((data)=>{
          var returnVal = loggedInUser.message.find(msg => msg.auther === u.auther)
          if(returnVal !== undefined){
            msgModel.find({chatId : returnVal.chatId})
            .then(chats =>{
              res.render('chat',{User : data,chatUser: u,loggedInUser : loggedInUser,chats:chats})
            })
          }else{
            res.render('chat',{User : data,chatUser: u,loggedInUser : loggedInUser,chats : []})
            // console.log('no chat yet')
          }
         
         
        })
      } )
     })
    }
exports.loggedinUser = (req,res)=>{
   usermodel.findOne({username: req.session.passport.user})
     .then(u => res.json({loggedInUser : u}))
}

