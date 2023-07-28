import linkContex from '../Contex/LinkContex.js';
import userContex from '../Contex/UserContex.js';

const LinkController = {
    
    getList: async (req,res) => {
        let link = await linkContex.getAllLinks();
        res.send(link);
    },
    getById: async (req,res) => {
        const link = await linkContex.getLinkById(req.params.id);
        res.send(link);
    },
    add: async (req,res) => {
        const userId = req.id;
        // console.log('enter linkcontroller',req.body);
        const {orginalUrl,newUrl} = req.body;
        // console.log('add link', orginalUrl)
        const newLink = await linkContex.addLink(orginalUrl,newUrl);
        // console.log('newLink',newLink);
        // console.log('newLink._id',newLink._id);
        const user = await userContex.addUserLink(userId,newLink._id)    
        // console.log('user',user);  
        res.send(newLink);
    },
    updateTargetKey: async (req,res) => {
        // const {id_d} = req.params;
        // const {id,orginalUrl} = req.params;
        // const {target} = req.query;
        // const updatelink = await linkContex.updateLink(id_d,{id,orginalUrl});
        // res.send(updatelink);
        const target = req.body.targetParamKey;
        const id = req.params;
        const url = await linkContex.getUrlById(id);
        console.log('terget',target);
        console.log("url.targetParamKey",url.targetParamKey);
        if(url.targetParamKey===undefined)
        {
            console.log('enter if target========',target);
            url.targetParamKey = target;
        }
        url.save();
        console.log('url',url);
        console.log('url.targetParamKey',url.targetParamKey);
        res.send(url);
    },    
    updateTargetValues: async (req,res) => {
       const {nameT,valueT} = req.body;      
       const {newUrl,targetParamKey} =req.body;
       console.log('updateTargetValues=======targetParamKey',targetParamKey);
       const url =  await linkContex.getUrlBynewUrl(newUrl);   
       console.log('url=====url',url);
       url.targetValues.push({name:nameT,value:valueT});///there is a problem in the first time??
       url.save();
       console.log('url.targetParamKey',url.targetParamKey);
       console.log('targetParamKey===========',targetParamKey);
       console.log('url.targetParamValue===========',url.targetValues);
       console.log('url.newUrl',url.newUrl);
       console.log('valueT',valueT);
       const t = "https://tinyb.onrender.com/"+url.newUrl+"?"+targetParamKey+"="+valueT;
       console.log('t',t);
      // res.send(url);
    //   res.send("https://tinyb.onrender.com/"+url.newUrl+"?"+targetParamKey+"="+valueT);
       const responseValue = "https://tinyb.onrender.com/" + url.newUrl + "?" + targetParamKey + "=" + valueT;
         console.log('responseValue=',responseValue);
       res.send(responseValue);
    },
    // delete: async (req,res) => {
    //     const deleted = await linkContex.removeLink(req.params.id);
    //     res.send(deleted);
    // },  
    delete: async(req,res)=>{
        const userid=req.id;
        const user= await userContex.deleteLinkById(userid,req.params.id);
        // console.log("delete link controler",req.params.id);
        const {id}=req.params;
        const deleted=await linkContex.deleteLink(id);
        res.send(user);
    },
    redirect: async (req,res) => {//אמור לקבל את המקוצר
        // console.log('enter to redirect');
        const {newUrl} = req.params;      
        const url = await linkContex.redirectLink(newUrl);
        // console.log('redirect url.clicks',url.clicks);
        const clicks = url.clicks || [];
        // const {clicks} = url;//אפשר גם כך במקום השורה בנ"ל     
        const t = req.query[url.targetParamKey] || null;
        // console.log("========t==========",t);//Elkayam
        // console.log('==========object===',req.query)//{Sem: 'Elkayam'}    
        // clicks.push({insertedAt: Date.now(),ipAdress: req.socket.localAddress,targetParamValue: t});
        // url.save();
        clicks.push({insertedAt: Date.now(),ipAdress: req.socket.localAddress,targetParamValue: t});
        url.save();
        res.redirect(url.orginalUrl);
    } 
  
}

export default LinkController;
