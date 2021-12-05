import User,{user} from '../modules/user';
import express,{Request,Response} from 'express'
import jwt from "jsonwebtoken";
import Client from "twilio";
import { isUserExist,isUserVaild } from './services/dashboard';


const { token,sid,service_id } = process.env
const clientServer = Client(sid,token)
const userObject = new User()
const index = async (_req:Request,res:Response) =>{
    const result = await userObject.index()
    return res.status(200).json(result)
}
const register = async (_req:Request,res:Response)=>{
    const body = _req.body
    const userInfo:user = {
        name:body.name,
        b_date:body.b_date,
        email:body.email,
        gender:body.gender,
        password_digest:body.password,
        phone_number:body.phone_number,
        nationality_id:body.nationality_id
    }
    const result = await userObject.register(userInfo)
    if(result){
        clientServer.verify.services(service_id!).verifications
        .create({to:`+962${userInfo.phone_number}`,channel:'sms'})
        return res.setHeader('phoneNumber',userInfo.phone_number).setHeader('user_id',result?.id!).json("Please Vertifiy Your Phone Number")
    }
}
const verificationsCode = async (_req:Request,res:Response)=>{
    const phoneNumber = _req.body.phone_number
    const code = _req.body.code
    const user_id = _req.body.user_id
    const result = await userObject.vertifiyPhoneNumber(phoneNumber,code,user_id)
    if(result){
        return res.json("Vertifed")
    }
    else{
        return res.json("Not Vertified")
    }
}

const auth = async(_req:Request,res:Response) =>{
    const phoneNumber = _req.body.phone_number
    const password = _req.body.password
    const result = await userObject.authenticate(phoneNumber,password)
    if(result){
        const token = jwt.sign({ user: result }, String(process.env.TOKEN_SECRET));
        res.setHeader("authorization",token)
        res.setHeader("Access-Control-Expose-Headers","*")
        res.setHeader("Access-Control-Expose-Headers","authorization")
        return res.json({
            info:result,
            message:"Login Successfully"
        })
    }
    else {
        return res.json("couldnt Log in!")
    }
    
}

const user_routes = (app:express.Application) =>{
    app.get('/users',index)
    app.post('/register',isUserExist,register)
    app.post('/users/auth',isUserVaild,auth)
    app.put('/register',verificationsCode)
}
export default user_routes