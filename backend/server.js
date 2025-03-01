const express=require('express')
const mongoose=require('mongoose')
const UserSchema=require('./models/User')
const User = require('./models/User')
const bcrypt=require('bcryptjs')

const app=express()
const PORT=3000
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to the session")
})

app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new UserSchema({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registered.."})
        console.log("User registeration completed..")

    }
    catch(err){
        console.log(err);
    }

})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        res.json({message:"Login Successful",usename:user.username})

    }
    catch(err){
        console.log(err);
    }
})

mongoose.connect("mongodb+srv://demomongo123:demomongo123@cluster0.8mt8r.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0").then(
    ()=>{console.log("DB connected successfully")}
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server is running on port :"+PORT)
})