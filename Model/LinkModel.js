import mongoose from 'mongoose';

const LinkModelSchema = mongoose.Schema({
    "orginalUrl": String,
    "newUrl": String,
    "clicks": [
        {
            "insertedAt": Date,
            "ipAdress": String,
            "targetParamValue": String//meir/elkaiyam
            
        }
    ],
    "targetParamKey": String,//sem אחרי הסימן שאלה לפני השווה
    "targetValues": [
        {
            "name": String,//שנתון ה או שנתון ו
            "value": String//meir/elkaiyam המילה שרוצה לשרשר אחרי הסימן שאלה
            //עוזר לעוגה
        }
    ],
    // userId: 
})

export default mongoose.model('Links',LinkModelSchema);