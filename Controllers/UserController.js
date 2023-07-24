import userContex from '../Contex/UserContex.js';
import linkContex from '../Contex/LinkContex.js';

const UserController = {

    getList: async (req,res) => {
        let user = await userContex.getAllUsers();
        res.send(user);
    },
    getById: async (req,res) => {
        const user = await userContex.getUserById(req.params.id);
        res.send(user);
    },
    add: async (req,res) => {
       // const {user} = req.body;
        console.log('enter usercontroller add',req.body);
        const {name,email,password} = req.body;
        const newUser = await userContex.addUser(name,email,password);        
        res.send(newUser);
    },
    update: async (req,res) => {
        const {id_d} = req.params;
        const {user} = req.params;
        const updateUser = await userContex.updateUser(id_d,{user});
        res.send(updateUser);
    },
    delete: async (req,res) => {
        const deleted = await userContex.removeUser(req.params.id);
        res.send(deleted);
    },
    getLinksByUserId: async (req,res) => {
        const user = await userContex.getUserByEmail(req.params.email);
        // console.log("user.links",user.links);
         let arrLinks = [];  
        // let arrnewUrl = [];
        console.log('user.links.length',user.links.length);
         for(let i = 0; i < user.links.length; i++)
         {
            // console.log('user.links[i].id',user.links[i].id);
            // console.log('user.links[i]',user.links[i]._id.toString());
            const link = await linkContex.getLinkById(user.links[i]._id.toString())
             console.log("link",link);
            // arrLinks.push({link:link.orginalUrl})
            if(link!=null)
                arrLinks.push({id:link.id,link:link.orginalUrl,newUrl:link.newUrl,clicks:link.ipAdress})
            //   arrLinks.push({id:link.id,link:link.orginalUrl})
         }
         if(arrLinks.length === 0){
            res.send([]);
         }else{
            res.send(arrLinks);
         }
        //  user.links.map(arrLinks.push(linkContex.getLinkById(user.links.id)));
       //  res.send(arrLinks);//מחזיר את האובייקט
        // res.send(arrnewUrl);
    },
  
}

export default UserController;