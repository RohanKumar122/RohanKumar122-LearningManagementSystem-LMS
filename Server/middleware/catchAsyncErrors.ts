import { NextFunction, Request, Response } from "express";1

export const CatchAsyncErrors = (fn:any) => (req:Request, res:Response, next:NextFunction)=>{
    Promise.resolve(fn(req, res, next)).catch(next);    
}