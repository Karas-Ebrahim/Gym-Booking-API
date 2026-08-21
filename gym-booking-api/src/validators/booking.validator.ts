import { Request, Response, NextFunction } from "express";

export const validateBooking=(req:Request ,res:Response ,next:NextFunction)=>{
  const { session } = req.body;

  if(!session){
    return res.status(400).json({message:"Session ID is required to make a booking."});
  }
  
  next();
};