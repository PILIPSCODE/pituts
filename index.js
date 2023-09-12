const express = require('express')
const app = express()
require("dotenv").config()
const port = 8080 || process.env.PORT
app.use(express.json())
const patho = require('path')
const connection = require('./db/db')
const fs = require('fs');
const cookieParser = require('cookie-parser')
const uploadImageroute = require('./Router/UploadImageRoute')
const signroute = require('./Router/sign')
const loginroute = require('./Router/login')
const postingroute = require('./Router/PostinganRoute')
const todoRoute = require('./Router/Todoroute')
const follow = require('./Router/follow')
const comments = require('./Router/commentsRoute')
const cors = require('cors')




app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers' ,'Content-Type, Authorization');
  next()
})
app.use(express.static("frontend"));

app.use(cors())

app.use(cookieParser())

app.use("/upload",express.static(patho.join(__dirname,"upload")))
// app.use('/',uploadImageroute)
app.use('/',signroute)
app.use('/',todoRoute)
app.use('/',loginroute)
app.use('/',uploadImageroute)
app.use('/',postingroute)
app.use('/',follow)
app.use('/',comments)

app.get('/random-image', (req, res) => {
  const directoryPath = patho.join(__dirname, 'images');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send('Internal server error');
    } else {
      const randomIndex = Math.floor(Math.random() * files.length);
      const imagePath = patho.join(directoryPath, files[randomIndex]);
      res.sendFile(imagePath);
    }
  });
});




connection()


app.listen(port,() => {
    console.log(`server running in http://localhost:${port}`)
})
