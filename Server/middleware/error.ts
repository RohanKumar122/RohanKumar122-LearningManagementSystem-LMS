import ErrorHandler from "../utils/ErrorHandler"
import { NextFunction,Request,Response } from "express";
 
export const ErrorMiddleware = (err:ErrorHandler,req:Request,res:Response,next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
   
    // wrong mongo id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //Dublicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message,400);
    }

    // jwt expire error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    });

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
    });
}


