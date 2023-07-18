import context from '../Contex/UserContex.js';
// import userController from './UserController.js';
import  jwt  from "jsonwebtoken";

const secret = "shira=100000$&&sweet";

const AuthController={

    signUp: async(req,res)=>{
        console.log('enter to signUp',req.body);
        const {name,email,password}=req.body;
        const usrEmail= await context.getUserByEmail(email);
        if(!usrEmail&&email&&name&&password)
        { 
            console.log('enter if signup');
            const newUser = await context.addUser(name,email,password);
            const token = jwt.sign({name:newUser.name, id:newUser._id},secret);
            // const links = [];
            // links = await userController.getLinkById(email);
            // console.log('links',links);
            console.log("token",token);
            res.send({accessToken:token});
        }
        else
        res.status(401).send("This user already exists or a data is missing")
    },
    signIn: async(req,res)=>{
        //const password=req.query.password ;
        console.log("password controller ",req.params.password)
        const user=await context.signIn(req.params.email,req.params.password);
        console.log("get user in controller ",user) 
        console.log("get user by id");
        if(user&&user!=-1)
         { 
            const token=jwt.sign({name:user.name, id:user._id},secret)
            // const links = [];
            // links = await userController.getLinkById(id);
            // console.log('links',links);
            res.send({accessToken:token});
         }
        else if(!user){
            res.status(401).send("The email is wrong");}
        else if(user==-1)
           {   res.status(401).send("The password is wrong");}
    },
}
export default AuthController;
// import contex from '../contex/UserContex.js';
// import jwt from 'jsonwebtoken';

// const secret = "Shira=1000000$&&sweet";

// const AuthorizationController = {
 
//     signUp: async (req,res) => {
//         const {name,email,password} = req.body;
//         console.log("login",name)
//         const user = await contex.checkUser(email,password);
//         if(!user)
//         {
//             const newUser = await contex.addUser({name,email,password});
//             const token = jwt.sign(
//                 {email:user.email,password:user.password},secret);
//             res.send({accessToken:token});    
//         }
//         else{
//             res.status(401).send({message: "This user already exists"});
//         }
//     },
//     signIn: async (req,res) => {
//         const {email,password} = req.body;
//         const user = await contex.checkUser(email,password);
//         if(user)
//         {
//             const token = jwt.sign(
//                 {email:user.email,password:user.password},secret);
//             res.send({accessToken:token});    
//         }
//         else
//         {
//             res.status(401).send({message: "This user no exists"});
//         }
//     }

// }

// export default AuthorizationController;