import linkModel from '../Model/LinkModel.js'
const linkContex = {
    getAllLinks: async ()=> {
        let links = await linkModel.find();
        return links;
    },
    getLinkById: async (id) => {
        try {
          console.log('id', id);
          let link = await linkModel.findById(id);
          console.log('link', link);
          return link;
        } catch (error) {
          console.error('Error in getLinkById:', error);
          throw error; // Rethrow the error to handle it further up the call stack.
        }
    },   
    addLink: async (orginalUrl,newUrl) => {
        const newLink = new linkModel({orginalUrl,newUrl});
        newLink.save();
        return newLink;
    },
    getUrlById: async (id) =>{
        //  id = '64bd6df8074ade15074813f8'; 
        const url = await linkModel.findById(id.id);
        return url;
    },  
    getUrlBynewUrl: async (newUrl) => {
        const url = await linkModel.findOne({"newUrl":newUrl});
        console.log('url=====',url);
        return url;
    },
    removeLink: async (id) => {
        const deleted = await linkModel.findByIdAndDelete(id);
    },
    redirectLink: async(newUrl) => {
       const url = await linkModel.findOne({"newUrl":newUrl});
       return url;
   },
    deleteLink: async(id)=>{
       const deleted=await linkModel.findByIdAndDelete(id);
       return deleted;
    },

};

export default linkContex;