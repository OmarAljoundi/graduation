import Ranger,{ranger} from '../modules/ranger';
import express,{Request,Response} from 'express'
import jwt from "jsonwebtoken";
import { isRangerExist } from './services/dashboard';



const rangerObject = new Ranger()
const index = async (_req:Request,res:Response) =>{
    const result = await rangerObject.index()
    return res.status(200).json(result)
}
const register = async (_req:Request,res:Response)=>{
    const body = _req.body
    const userInfo:ranger = {
        name:body.name,
        password_digest:body.password,
        phone_number:body.phone_number,
        nationality_id:body.nationality_id
    }
    const result = await rangerObject.register(userInfo)
    if(result){
        return res.json(`Ranger ${result.name} has been registerd!`)
    }
}


const auth = async(_req:Request,res:Response) =>{
    const nationality_id = _req.body.nationality_id
    const password = _req.body.password
    const result = await rangerObject.authenticate(nationality_id,password)
    if(result){
        const token = jwt.sign({ user: result }, String(process.env.TOKEN_SECRET));
        res.setHeader("authorization",token)
        res.setHeader("Access-Control-Expose-Headers","*")
        res.setHeader("Access-Control-Expose-Headers","authorization")
        return res.status(200).json({
            info:result,
            message:"Login Successfully"
        })
    }
    else {
        return res.status(204).json("couldnt Log in!")
    }
}

const ranger_routes = (app:express.Application) =>{
    app.get('/rangers',index)
    app.post('/rangers/register',isRangerExist,register)
    app.post('/rangers/auth',auth)
}
export default ranger_routes