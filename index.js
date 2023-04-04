const express = require('express')
const app = express()
require("dotenv").config()
const port = 8080 || process.env.PORT
app.use(express.json())
const patho = require('path')
const connection = require('./db/db')
const cookieParser = require('cookie-parser')
const uploadImageroute = require('./Router/UploadImageRoute')
const signroute = require('./Router/sign')
const loginroute = require('./Router/login')
const postingroute = require('./Router/PostinganRoute')
const todoRoute = require('./Router/Todoroute')
const follow = require('./Router/follow')
const comments = require('./Router/commentsRoute')
const { Server } = require("socket.io");
const cors = require('cors')
const io = new Server({
  serveClient: false
});


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





connection()


app.listen(port,() => {
    console.log(`server running in http://localhost:${port}`)
})
