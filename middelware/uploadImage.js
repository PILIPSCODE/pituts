// multer
const multer = require('multer')


const storage = multer.diskStorage({
    destination: "upload",
    filename: function (req, file, cb) {
      cb(null,new Date().getTime() + "-" + file.originalname)
    }
  })
  
  const fileFilter = (req,file,cb) => {
     if(file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg"){
      cb(null,true)
     }else{
      cb(null,false)
     }
  
  }
  const upload = multer({ storage: storage,fileFilter:fileFilter }).single('image')
  // end multer
  module.exports ={upload}