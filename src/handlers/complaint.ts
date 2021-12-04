import express,{ Request,Response } from "express";
import Complaint,{ complaint } from "../modules/complaint"
import Dashboard from "../modules/services/dashboard";
import { isRanger, verifyAuthToken } from './services/dashboard';
import sgMail from "@sendgrid/mail"

const { mail_api } = process.env

const dashboard = new Dashboard()
const complaintObject = new Complaint()
const create = async (_req:Request,res:Response)=>{
    const body = _req.body
    const complaintInfo:complaint = {
      image:body.image,
      description:body.description,
      place_name:body.place_name,
      nearest_attraction:body.nearest_attraction,
      public:body.public
    }
    const result = await complaintObject.create(complaintInfo)
    return res.json(result)
}
const index = async(_req:Request,res:Response)=>{
  const status = String(_req.query.status)
  const result = await complaintObject.index(status)
  return res.json(result)
}
const getComplaintById = async (_req:Request,res:Response)=>{
  const id = _req.params.id
  const result = await complaintObject.getComplaintById(Number(id))
  return res.json(result)
}
const completed = async(_req:Request,res:Response)=>{
  const cid = _req.params.id
  const result = await complaintObject.complete(Number(cid))
  if(result){
    const userInfo = await dashboard.getUserInfoFromComplaint(cid)
    sgMail.setApiKey(mail_api!)
    const msg = {
    to: userInfo.email, 
    from: 'omaraljoundi@gmail.com', 
    templateId:"d-1deb2298c3c340fe8d6825d6d80fcdd5",
    dynamicTemplateData: {
    name:userInfo.name,
    public:result.public,
    nearestPlace:result.nearest_attraction,
    area:result.place_name,
    topic:result.description,
    date:result.create_at,
    cid:result.id
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
    return res.status(201).json(`Complaint with id: ${cid} has been completed`)
  
}}

const complaint_routes = (app:express.Application)=>{
    app.post('/complaints',verifyAuthToken,create)
    app.get('/complaints',verifyAuthToken,index)
    app.get('/complaints/:id',verifyAuthToken,getComplaintById)
    app.put('/complaints/:id',[verifyAuthToken,isRanger],completed)
}


export default complaint_routes