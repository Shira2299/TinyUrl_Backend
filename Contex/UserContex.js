import userModel from '../Model/UserModel.js';
import linkContex from '../Contex/LinkContex.js';

const userContex = {
    getAllUsers: async ()=> {
        console.log('enter contex');
        let users = await userModel.find();
        console.log('out contex',users);
        return users;
    },
    getUserById: async (id) => {
        const user = await userModel.findOne({id:id});
        return user;
    },
    addUser: async (name,email,password) => {        
        console.log('enter add userContex',name,email,password);
        const newUser = new userModel({name,email,password});
        newUser.save(); 
        console.log('out add userContex: ',newUser);      
        return newUser;
    },
    getUserByEmail: async(email) => {
        const user= await userModel.findOne({email});
        return user;
     },
     signIn: async(email,password)=>{
        let user= await userModel.findOne({email});
        console.log("password context ",password)
        console.log("get user in context ",user) 
        if(user&&password==user.password)
           return user;
        else if (!user){ return null;}
        else if(password!=user.password) 
               {return -1; } 
      },
    updateUser: async (id,user) => {
        const updateUser = await userModel.findByIdAndUpdate(id,user,{new:true});
        updateUser.save();
        return updateUser;
    },
    removeUser: async (id) => {
        const deleted = await userModel.findByIdAndDelete(id);
    },
    checkUser: async (email,password) => {       
        const user = await userModel.findOne({email:email,password:password});
        return user;
    },
    addUserLink: async(userId,linkId)=>{
       console.log("link id ",linkId)
       const user= await userModel.findOne({_id:userId}); 
       user.links.push(linkId);
       user.save();
       return user;
      },
    
    deleteLinkById: async(userId,linkId)=>{
        console.log("linkId",linkId);
        let user = await userModel.findOne({_id:userId});
        console.log ("the user in delete link ",user);    
        let filter_link= user.links.filter((val)=>{
        console.log("val= ",val,"val._id= ",val._id);
        if(val._id!=linkId)
           return val;
         })    
        await userModel.findByIdAndUpdate(userId,{links:filter_link});
        user = await userModel.findOne({_id:userId});
        console.log("user ",user);  
        if(user.links.length==0)
            return null;       
         let Links=[];
         for (let i = 0; i < user.links.length; i++) {
            // console.log('user.links[index]',user.links[index]);
            const link= await linkContex.getLinkById(user.links[i]._id)
            Links.push({id:link.id,link:link.orginalUrl});
         }
        return Links;   
     }
};

export default userContex;