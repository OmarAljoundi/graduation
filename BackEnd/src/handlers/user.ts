import User,{user} from '../modules/user';
import express,{Request,Response} from 'express'
import jwt from "jsonwebtoken";
import Client from "twilio";
import { isRangerAccount, isUserAccount, isUserExist,isUserVaild, verifyAuthToken } from './services/dashboard';

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
        await clientServer.verify.services(service_id!).verifications
        .create({to:`+962${userInfo.phone_number}`,channel:'sms'}).then((r)=>{
            if(r){
                const token = jwt.sign({ user: result }, String(process.env.TOKEN_SECRET));
                res.setHeader("authorization",token)
                res.setHeader("Access-Control-Expose-Headers","*")
                res.setHeader("Access-Control-Expose-Headers","authorization")
                return res.json({
                    info:result,
                    message:"Login Successfully"
                })
            }
        }).catch(err=>res.sendStatus(404))
    }
}

const resendCode = async (_req:Request,res:Response)=>{
    const phone_number = _req.body.phone_number
        await clientServer.verify.services(service_id!).verifications
        .create({to:`+962${phone_number}`,channel:'sms'}).then((r)=>{
            return res.sendStatus(201)
        })
        .catch(err=>res.sendStatus(404))
}

const verificationsCode = async (_req:Request,res:Response)=>{
    const phoneNumber = _req.body.phone_number
    const code = _req.body.code
    const result = await userObject.vertifiyPhoneNumber(phoneNumber,code)
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
        return res.sendStatus(401)
    }
    
}
const getUserById = async(_req:Request,res:Response)=>{
    const id = _req.params.id
    const result = await userObject.getUserById(id)
    return res.json(result)
}
const changePassword = async (_req:Request,res:Response)=>{
    const phone_number = _req.body.phone_number
    const password = _req.body.newPassword
    const result = await userObject.changePassword(phone_number,password)
    if(result){
        return res.json(result)
    }
    else {
        return res.sendStatus(404)
    }
   
}

const updateStatus = async (_req:Request,res:Response)=>{
    const phone_number = _req.body.phone_number
    const result = await userObject.updateStatus(phone_number)
    if(result){
        return res.json(result)
    }
    else {
        return res.sendStatus(404)
    }
   
}

const forgetPassword = async (_req:Request,res:Response)=>{
    const phone_number = _req.body.phone_number
    const password = _req.body.password
    const result = await userObject.changePassword(phone_number,password)
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
        return res.sendStatus(404)
    }
   
}


const user_routes = (app:express.Application) =>{
    app.get('/users',index)
    app.put('/users/changepassword',isUserAccount,changePassword)
    app.get('/users/:id',[verifyAuthToken,isRangerAccount],getUserById)
    app.post('/register',isUserExist,register)
    app.post('/resend',resendCode)
    app.post('/users/auth',isUserVaild,auth)
    app.put('/register',verificationsCode)
    app.put('/updateStatus',updateStatus)
    app.put('/forgotpassword',forgetPassword)
}
export default user_routes