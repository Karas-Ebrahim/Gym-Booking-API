import { Request, Response, NextFunction } from "express";

export const validateRegister=(req:Request ,res:Response ,next:NextFunction)=>{

  const{fullName ,email ,password ,role}=req.body;
  let errors:(string)[]=[];

  if(!fullName){
    errors.push("Full name is required.");
  }
  if(!email){
    errors.push("Email is required.");
  }
  if(!password){
    errors.push("Password is required.");
  }
  if(!role){
    errors.push("Role is required.");
  }
  if(password&&password.length<6){
    errors.push("Password must be at least 6 characters long.");
  }
  if(role&&role!=="Member"&&role!=="Trainer"){
    errors.push("Role must be either 'Member' or 'Trainer'.");
  }
  if(errors.length>0) {
    return res.status(400).json({errors:errors});
  }
  next();
};