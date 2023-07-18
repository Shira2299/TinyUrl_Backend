import mongoose from 'mongoose';

const UserModelSchema = mongoose.Schema({

    "name": String,
    "email": String,
    "password": String,
    "links": [{"id":String}],
    // "links": [{type: mongoose.Schema.Types.ObjectId, ref: "link",}],
})

export default mongoose.model('users',UserModelSchema);