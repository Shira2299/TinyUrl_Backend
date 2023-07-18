import express from 'express'
import db from './db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import linkRouter from './Routers/LinkRouter.js';
import userRouter from './Routers/UserRouter.js';
import linkController from './Controllers/LinkController.js';
import jwt from 'jsonwebtoken'
import authRouter from './Routers/AuthRouter.js';
import MailSender from './mail.js';

const app = express()
const port = 3000
const secret = "shira=100000$&&sweet";

app.use(cors())
app.use(bodyParser.json())
db()

app.use('/auth',authRouter);

app.use('/users',(req,res,next)=>{
 console.log("header",req.headers.authorization);
 const token= req.headers.authorization.slice(7);
 console.log("token",token);
 try{
  const decoded= jwt.verify(token,secret);
  req.id=decoded.id;//מה לגבי פונקציות שלוקחות ID האם לשנות את כולם לקבל שם
  next(); 
 }
 catch{
  res.status(401).send({message:"unauthorized"});
 }
});

app.use('/links',(req,res,next)=>{
  console.log("header links",req.headers.authorization);
 const token= req.headers.authorization.slice(7);
 console.log("token",token);
 try{
  const decoded= jwt.verify(token,secret);
  req.id=decoded.id;//מה לגבי פונקציות שלוקחות ID האם לשנות את כולם לקבל שם
  console.log('successed',req.id);
  next(); 
 }
 catch{
  res.status(401).send({message:"unauthorized"});
 }
});

app.use('/links',linkRouter);
app.use('/users',userRouter);
app.get('/:newUrl',linkController.redirect);//:
app.get('/mail/:mail/:tinyUrl', await MailSender.sendEmail);

app.listen(port, () => {
    console.log(`server run on port http://localhost:${port}`)
})
// app.listen(PORT, () => console.log("server run on port " + PORT));