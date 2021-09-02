const router = require('express')();
const msgModel = require('./src/Models/msgModel')
const UserModel = require('./src/Models/usermodel')
const uuid = require('uuid')
const Usr = {}
global.io.on('connection',(socket)=>{
  console.log(socket.id)
  socket.on('obj',(obj)=>{
    UserModel.findOne({username : obj.sender})
    .then((foundUser)=>{
      var returnVal = foundUser.message.find(msg => msg.another === obj.reciver)
        var chatId = (returnVal !== undefined) ? returnVal.chatId : uuid.v4();
      if(returnVal === undefined){
      msgModel.create({
        msgs : obj.msg,
        auther : obj.sender,
        reciver : obj.reciver,
        chatId : chatId
      }).then((createdChat)=>{
       foundUser.message.push({chatId :chatId,another :obj.reciver})
       foundUser.save().then((saveUser)=>{
         UserModel.findOne({username: obj.reciver})
         .then((foundReciver)=>{
           foundReciver.message.push({chatId :chatId,another : foundUser.username})
           foundReciver.save().then((save)=>{
             global.io.emit('msg',saveUser) 
           })
         })
       })
      })
    }else{
      msgModel.create({
        msgs : obj.msg,
        auther : obj.sender,
        reciver : obj.reciver,
        chatId : chatId
      }).then(function(createdChat){ 
        console.log(createdChat)
        global.io.emit('obj',createdChat) 
      })
    }
    })
    
    })
  socket.on('typing',()=>{
    socket.broadcast.emit('typing')
    
  })
 
  socket.on('disconnect',()=>{
    console.log('disconnect')
     delete Usr[socket.id] 
     global.io.emit('loggedinUser',Usr)
  })
})