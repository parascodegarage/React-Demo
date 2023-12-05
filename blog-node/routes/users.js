var express = require('express');
var router = express.Router();
const { addUser,userLogin,updateUser,deleteUser,userList } = require('../controller/user')
const {validateUserRegistration,validateUserLogin,validateUserUpdate} = require("../middleware/validation")


router.post('/addUser', validateUserRegistration,addUser);
router.get('/userList',userList);
router.post('/userLogin',validateUserLogin,userLogin);
router.put('/updateUser',validateUserUpdate,updateUser);
router.delete('/deleteUser',deleteUser);

module.exports = router;
