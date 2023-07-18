import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGODB_URI;

const isLocalhost = true
const connectDB = async () => {
    // await mongoose.connect(uri,{ ssl: true, sslValidate: false });
    await mongoose.connect(uri,{ ssl: true, sslValidate: !isLocalhost });

};

mongoose.connection.on("connected", () => {
    console.log("mongo is connected");
});

mongoose.set('toJSON',{
    // virtuals: true,
    virtuals: false,
    transform: (doc,converted) => {
        delete converted._id;
    }
});

export default connectDB;
