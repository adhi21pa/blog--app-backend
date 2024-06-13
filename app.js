const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcryptjs = require("bcryptjs")

const {blogmodel} = require("./models/blog")

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://adithyapa2003:adithya66@cluster0.g5hvjxm.mongodb.net/userblogdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10)
return bcryptjs.hash(password,salt)
}


app.post("/signUp",async (req,res)=>{

    let input =req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword
    let blog = new blogmodel(input)
    blog.save()

    res.json({"status":"success"})
})
app.listen(8080,()=>{
    console.log("sever runing")
})