import { Request, Response, NextFunction } from "express";

export const validateClassSession =(req:Request ,res:Response ,next:NextFunction)=>{
  const {title ,capacity ,startAt ,endAt}=req.body;
  let errors:(string)[]=[];

  if(!title){
    errors.push("Title is required.");
  }
  if(!capacity){
    errors.push("Capacity is required.");
  }
  if(!startAt){
    errors.push("Start time is required.");
  }
  if(!endAt){
    errors.push("End time is required.");
  }
  if(capacity!==undefined&&capacity<=0) {
    errors.push("Capacity must be greater than 0.");
  }

  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const now = new Date();

  if(startAt&&startDate<=now) {
    errors.push("Start time must be in the future.");
  }
  if(startAt&&endAt&&endDate<=startDate) {
    errors.push("End time must be after the start time.");
  }
  if(errors.length>0) {
    return res.status(400).json({errors:errors});
  }

  next();
};