import {Redis} from "ioredis";
import { config } from 'dotenv';
config();

const redisClient=()=>{
    if(process.env.REDIS_URL){
        console.log(`Redis connected with: ${process.env.REDIS_URL}`);
        return new Redis(process.env.REDIS_URL);
    }
    throw new Error("REDIS_URL is not defined");

}

// export const redis = new Redis(redisClient())