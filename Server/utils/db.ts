import mongoose, { set } from 'mongoose';
import { config } from 'dotenv';
config();

// require("dotenv").config();

const dbURL = process.env.DB_URL ||'';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL).then((data:any)=>{
            console.log(`MongoDB connected with: ${data.connection.host}`);
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;