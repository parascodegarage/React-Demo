var express = require('express');
var router = express.Router();
var {userAddBlog,blogList,deleteBlog}=require('../controller/blog')
var {tokenDecode}=require('../middleware/tokenDecode')
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({

   destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images'), function (error, success) {
         if (error) throw error
      });
   },

     filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name, function (error1, success1) {
         if (error1) throw error1

      })
   }
});
const upload = multer({ storage: storage });

router.post('/userAddBlog', tokenDecode, upload.single('image'), userAddBlog);
router.get('/blogList',blogList);
router.delete('/deleteBlog',tokenDecode,deleteBlog);
router.put('/updateBlog',tokenDecode,upload.single('image'),updateBlog)


module.exports = router;
