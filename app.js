const express=require("express")
const app=express()
const dotEnv=require("dotenv")
const router=require("./routes/tasks")
const connectDB = require("./config/db")


// dotenv Config
dotEnv.config()

// Connect to DB
connectDB()

// middlewares
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use('/api/v1/tasks', router);

port=3000
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})