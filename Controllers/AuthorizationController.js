import context from '../Contex/UserContex.js';
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
            console.log("token",token);
            res.send({accessToken:token});
        }
        else
        res.status(401).send("This user already exists or a data is missing")
    },

    signIn: async(req,res)=>{
        console.log("password controller ",req.params.password)
        const user=await context.signIn(req.params.email,req.params.password);
        console.log("get user in controller ",user) 
        console.log("get user by id");
        if(user&&user!=-1)
         { 
            const token=jwt.sign({name:user.name, id:user._id},secret)
            res.send({accessToken:token,name:user.name});
         }
        else if(!user){
            res.status(401).send("The email is wrong");}
        else if(user==-1)
           {   res.status(401).send("The password is wrong");}
    },
}

export default AuthController;