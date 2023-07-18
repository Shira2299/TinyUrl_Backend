import linkContex from '../Contex/LinkContex.js';
import userContex from '../Contex/UserContex.js';
// import LinkModel from '../Model/LinkModel.js';
//import { containsOperation } from 'sift/lib/core';

const LinkController = {
    
    getList: async (req,res) => {
        console.log('enter getlist links controller');
        let link = await linkContex.getAllLinks();
        res.send(link);
    },
    getById: async (req,res) => {
        const link = await linkContex.getLinkById(req.params.id);
        res.send(link);
    },
    add: async (req,res) => {
        const userId = req.id;
        console.log('enter linkcontroller',req.body);
        const {orginalUrl,newUrl} = req.body;
        console.log('add link', orginalUrl)
        const newLink = await linkContex.addLink(orginalUrl,newUrl);
        console.log('newLink',newLink);
        console.log('newLink._id',newLink._id);
        const user = await userContex.addUserLink(userId,newLink._id)    
        console.log('user',user);  
        res.send(newLink);
    },
    updateTargetKey: async (req,res) => {
        // const {id_d} = req.params;
        // const {id,orginalUrl} = req.params;
        // const {target} = req.query;
        // const updatelink = await linkContex.updateLink(id_d,{id,orginalUrl});
        // res.send(updatelink);
        console.log('req.body', req.body)
        const target = req.body.targetParamKey;
       // const id = req.params;
        const url = await linkContex.getUrlById(id);
        url.targetParamKey = target;
        url.save();
        res.send(url);
    },
    updateTargetValues: async (req,res) => {
       const {name,value} = req.body;      
       const {newUrl} =req.body;
       const url =  await linkContex.getUrlBynewUrl(newUrl);   
      // console.log('url.targetParamValue',url);
       url.targetValues.push({name:name,value:value});
       url.save();
      // res.send(url);
      res.send("http://localhost:3000/"+url.newUrl+"?"+url.targetParamKey+"="+value);
    },
    // delete: async (req,res) => {
    //     const deleted = await linkContex.removeLink(req.params.id);
    //     res.send(deleted);
    // },  
    // delete: async(req,res)=>{
    //     const userid=req.id;
    //     console.log('userid',userid);
    //     const userLinks= await userContex.deleteLinkById(userid,req.params.id);
    //     console.log("delete link controler",req.params.id);
    //     const {id} = req.params.id
    //     const deleted=await linkContex.deleteLink(id);
    //     res.send(userLinks);
    //   },
     delete: async(req,res)=>{
        const userid=req.id;
        const user= await userContex.deleteLinkById(userid,req.params.id);
        console.log("delete link controler",req.params.id);
        const {id}=req.params;
        const deleted=await linkContex.deleteLink(id);
        res.send(user);
      },
    redirect: async (req,res) => {//אמור לקבל את המקוצר
        console.log('enter to redirect');
        const {newUrl} = req.params;      
        const url = await linkContex.redirectLink(newUrl);
        const clicks = url.clicks || [];
        // const {clicks} = url;//אפשר גם כך במקום השורה בנ"ל     
        const t = req.query[url.targetParamKey] || null;
        // console.log("========t==========",t);//Elkayam
        // console.log('==========object===',req.query)//{Sem: 'Elkayam'}    
        clicks.push({insertedAt: Date.now(),ipAdress: req.socket.localAddress,targetParamValue: t});
        url.save();
        res.redirect(url.orginalUrl);
    } 
  
}

export default LinkController;