import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { user } from "../../modules/user";
import Dashboard from "../../modules/services/dashboard";
export let authedUser:user
const dashboardObject = new Dashboard()

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const { TOKEN_SECRET } = process.env;
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(String(token), String(TOKEN_SECRET), function (err, decoded) {
      if (decoded) {
        authedUser = decoded.user
        next();
      } else {
          return res.send(401).json(
          "Authentication Required! Please Sign up, or sign in if You already have an account."
        );
      }
    });
  } catch (error) {
      return res.send(401).json(
      "Authentication Required! Please Sign up, or sign in if You already have an account."
    );
    
  }
};
export const isUserExist = async (_req:Request,res:Response,next:()=>void)=>{
  const phone_number = _req.body.phone_number
  const result = await dashboardObject.isUserExist(phone_number)
  if(result){
    return res.json({status:403,message:"An account with the same phone number is registered"})
  }
  else{
    next()
  }
}

export const isUserVaild = async (_req:Request,res:Response,next:()=>void)=>{
  const phone_number = _req.body.phone_number
  const result = await dashboardObject.isUserExist(phone_number)
  if(result){
    const vertifiy = await dashboardObject.isUserVertified(phone_number)
    if(vertifiy){
      next()
    }
    else{
      return res.json({status:403,message:"You Should Vertifiy Your Account"})
    }
  }
  else{
    return res.json({status:204,message:"No Account Found, try sign up first"})
  }
}

export const isRanger = async (_req:Request,res:Response,next:()=>void)=>{
    if(authedUser.user_type === "ranger"){
      next()
    } 
    else{
      return res.json({
        status:404,
        message:"Unauthorized!"
      })
    }
}




