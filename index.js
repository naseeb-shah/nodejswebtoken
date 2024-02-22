const express = require('express')
const cors= require('cors')

const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken');
const key ="alima"

// initilize app

const app = express()
//apply middlewares
app.use(cors())
app.use(express.json())
// connect to database

mongoose.connect("mongodb://localhost:27017/alima"
).then(()=>console.log('connected')).catch((e)=>console.log(e))


// uer model
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  const User = mongoose.model('User', userSchema);

// route for user
app.post("/reg",async(req,res)=>{
    const {email,password,username}=req.body
    console.log(email,password,username)

 const user =  await User.create({
    email:email,
    password,
    username
 })
 res.send(user)

})

// login
app.post('/login',async(req,res)=>{
const {email,password}=req.body

    const user = await User.findOne({email:email,password:password}).select("username email").lean()
    if(user){
        const token = jwt.sign({user}, key, { expiresIn: '1d' });

        res.send({...user,token})
    }else{
        res.statusCode(404)
    }

})
 app.post('/token',async(req,res)=>{
    const {token}=req.body
    try{
        let result= jwt.verify(token,key)
        console.log(result)
        res.send(result)
    }
catch(e){
    res.send(e)
}
 })


app.get('/',async(req,res)=>{
    res.send({
        'data':'server is started'
    })
})

app.listen(8000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server is started on 8000")
    }
})