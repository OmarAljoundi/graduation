import Ranger,{ranger} from '../modules/ranger';
import express,{Request,Response} from 'express'
import jwt from "jsonwebtoken";
import { isRangerAccount, isRangerExist, verifyAuthToken } from './services/dashboard';
import sgMail from "@sendgrid/mail"
import Client from "twilio";

const { mail_api } = process.env

const { token,sid,service_id } = process.env
const clientServer = Client(sid,token)


const rangerObject = new Ranger()
const index = async (_req:Request,res:Response) =>{
    const result = await rangerObject.index()
    return res.status(200).json(result)
}
const registerAdmin = async (_req:Request,res:Response)=>{
    const body = _req.body
    const userInfo:ranger = {
        name:body.name,
        email:body.email,
        phone_number:body.phone_number,
        nationality_id:body.nationality_id,
        role:body.role,
        password_digest:body.password
    }
    const result = await rangerObject.registerAdmin(userInfo)
    if(result){
        return res.sendStatus(201)
    }
    else {
        return res.sendStatus(404)
    }
}
const register = async (_req:Request,res:Response)=>{
    const body = _req.body
    const userInfo:ranger = {
        name:body.name,
        email:body.email,
        phone_number:body.phone_number,
        nationality_id:body.nationality_id,
        role:body.role
    }
    const result = await rangerObject.register(userInfo)
    if(typeof result !== 'string'){
    sgMail.setApiKey(mail_api!)
    const msg = {
    to: result.email, 
    from: 'omaraljoundi@gmail.com', 
    templateId:"d-a7717a54218c45dabc1dc9781fc5d626",
    dynamicTemplateData: {
    name:result.name,
    username:result.nationality_id,
    password:result.password_digest,
  },
    }
    await sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error: any) => {
        console.error(error)
    })
    return res.status(201).json(`Account Has been Created`)
  
}
else{
    return res.sendStatus(400)
}
}

const auth = async(_req:Request,res:Response) =>{
    const nationality_id = _req.body.nationality_id
    const password = _req.body.password
    const result = await rangerObject.authenticate(nationality_id,password)
    if(result){
        const token = jwt.sign({ ranger: result }, String(process.env.TOKEN_SECRET));
        res.setHeader("authorization",token)
        res.setHeader("Access-Control-Expose-Headers","*")
        res.setHeader("Access-Control-Expose-Headers","authorization")
        return res.status(200).json({
            info:result,
            message:"Login Successfully"
        })
    }
    else {
        return res.sendStatus(204)
    }
}
const getRangerById = async (_req:Request,res:Response) =>{
    const id = _req.params.id
    const result = await rangerObject.getRangerById(id)
    return res.json(result)
}
const getRangerClosedService = async(_req:Request,res:Response)=>{
    const id = _req.params.id
    const result = await rangerObject.getRangerClosedService(id)
    return res.json(result)
}
const getRangerClosedComplaint = async(_req:Request,res:Response)=>{
    const id = _req.params.id
    const result = await rangerObject.getRangerClosedComplaint(id)
    return res.json(result)
}
const createRangerPassword = async(_req:Request,res:Response) =>{
    const body = _req.body
      const userInfo:ranger = {
        password_digest:body.password,
        nationality_id:body.nationality_id
    }
    const result = await rangerObject.createRangerPassword(userInfo)
    const token = jwt.sign({ ranger: result }, String(process.env.TOKEN_SECRET));
        res.setHeader("authorization",token)
        res.setHeader("Access-Control-Expose-Headers","*")
        res.setHeader("Access-Control-Expose-Headers","authorization")
        return res.status(200).json({
            info:result,
            message:"Login Successfully"
        })
}
const chnagePassword = async(_req:Request,res:Response)=>{
      const oldPassword = _req.body.oldPassword
      const newPassword = _req.body.newPassword
      const nationalityID = _req.body.nationality_id
      const result = await rangerObject.changePassword(oldPassword,newPassword,nationalityID)
      if(result){
          return res.sendStatus(200)
      }
      else{
          return res.sendStatus(404)
      }
    
}
const deleteRanger =async (_req:Request,res:Response) => {
    const id = _req.params.id
    const result = await rangerObject.delete(Number(id))
    if(result){
        return res.sendStatus(201)
    }
    else{
        return res.sendStatus(404)
    }
}
const resendCode = async (_req:Request,res:Response)=>{
    const nationality_id = _req.body.nationality_id
    const object = await rangerObject.checkRanger(nationality_id)
    if(object){
        await clientServer.verify.services(service_id!).verifications
        .create({to:`+962${object.phone_number}`,channel:'sms'}).then((r)=>{
            if(r)
                return res.json({phone_number:object.phone_number})
            else 
                return res.sendStatus(404)
        })

    }
    else{
        return res.sendStatus(404)
    }
}

const resetRangerPassword = async(_req:Request,res:Response) =>{
    const body = _req.body
    const userInfo:ranger = {
        password_digest:body.password,
        nationality_id:body.nationality_id
    }
    const code = body.code
    const phone_number = body.phoneNumber

     await clientServer.verify.services(service_id!)
            .verificationChecks
            .create({to: `+962${phone_number}`, code: code})
            .then(async verification_check => {
                 if(verification_check.status === "approved"){
                  const result = await rangerObject.createRangerPassword(userInfo)
                  const token = jwt.sign({ ranger: result }, String(process.env.TOKEN_SECRET));
                        res.setHeader("authorization",token)
                        res.setHeader("Access-Control-Expose-Headers","*")
                        res.setHeader("Access-Control-Expose-Headers","authorization")
                        return res.json({
                            info:result,
                            message:"Login Successfully"
                        })
                }
                else return res.sendStatus(404)
            })
            .catch(err=>{return res.sendStatus(404)})
}

const ranger_routes = (app:express.Application) =>{
    app.get('/rangers',index)
    app.get('/rangers/:id',[verifyAuthToken,isRangerAccount],getRangerById)
    app.get('/rangers/services/:id',[verifyAuthToken,isRangerAccount],getRangerClosedService)
    app.get('/rangers/complaints/:id',[verifyAuthToken,isRangerAccount],getRangerClosedComplaint)
    app.post('/rangers/register',[verifyAuthToken,isRangerAccount],register)
    app.post('/adminranger',registerAdmin)
    app.post('/rangers/auth',auth)
    app.post('/ranger/resendCode',resendCode)
    app.put('/rangers/auth',createRangerPassword)
    app.put('/reset-password',resetRangerPassword)
    app.put('/rangers/auth/changePassword',[verifyAuthToken,isRangerAccount],chnagePassword)
    app.delete('/rangers/:id',[verifyAuthToken,isRangerAccount],deleteRanger)
}
export default ranger_routes