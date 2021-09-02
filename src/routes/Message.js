const express = require('express');
const router = express.Router();

const {
    MessageCreate,
    Allmsg,
    chatpanel,
    loggedinUser
} = require('../controllers/msgControllers');
const {
    IsLoggedIn,
    rediretToProfil
  } = require('../controllers/UserController');

/* GET users listing. */
router.get('/',(req,res,next) => console.log('test Route'))

router.post('/SendMsg/:reciver',IsLoggedIn,MessageCreate)
router.get('/panale/:username',IsLoggedIn,chatpanel)

router.get('/allmsgs/:user',Allmsg)
router.get('/loggedinUser',loggedinUser)

module.exports = router;
