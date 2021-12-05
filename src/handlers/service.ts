import Service,{service} from '../modules/service';
import express,{Request,Response} from 'express'
import { verifyAuthToken } from './services/dashboard';
import Dashboard from '../modules/services/dashboard';
import sgMail from "@sendgrid/mail"


const { mail_api } = process.env


const dashboard = new Dashboard()
const serviceObject = new Service()



const index = async (_req:Request,res:Response) =>{
    const result = await serviceObject.index()
    return res.status(200).json(result)
}
const proposalRequest = async (_req:Request,res:Response)=>{
    const body = _req.body
    const serviceInfo:service = {
        entity_name:body.entity_name,
        notes:body.notes,
    }
    const result = await serviceObject.createProposalRequest(serviceInfo)
    return res.status(201).json(result)
}
const carsCheckRequest = async (_req:Request,res:Response)=>{
    const body = _req.body
    const serviceInfo:service = {
        entity_name:body.entity_name,
        is_company:body.is_company,
        number_of_cars:body.number_of_cars,
        notes:body.notes
    }
    const result = await serviceObject.createCarsCheckRequest(serviceInfo)
    return res.status(201).json(result)
}
const nosieMeasurementRequest = async (_req:Request,res:Response)=>{
    const body = _req.body
    const serviceInfo:service = {
        entity_name:body.entity_name,
        notes:body.notes,
    }
    const result = await serviceObject.createNosieMeasurementRequest(serviceInfo)
    return res.status(201).json(result)
}
const courseRequest = async (_req:Request,res:Response)=>{
    const body = _req.body
    const serviceInfo:service = {
        entity_name:body.entity_name,
        age_group:body.age_group,
        expected_audience:body.expected_audience,
        service_date:body.service_date,
        notes:body.notes
    }
    const result = await serviceObject.createCourseRequest(serviceInfo)
    return res.status(201).json(result)
}
const deleteRow = async (_req:Request,res:Response)=>{
    const id = _req.params.id
    const result = await serviceObject.deleteService(Number(id))
    if(result){
        return res.status(202).json(`Service has been deleted with id:${id}`)
    }
    else {
        return res.status(404).json(`No Service with Id:${id}`)
    }
}
const getServiceById = async (_req:Request,res:Response)=>{
    const id = _req.params.id
    const result = await serviceObject.getServiceById(Number(id))
    return res.json(result)
}
const updateStatus = async (_req:Request,res:Response)=>{
    const id = _req.params.id
    const status = _req.body.status
    const result = await serviceObject.updateService(Number(id),status)
    if(result){  
    const userInfo = await dashboard.getUserInfoFromService(id)
    sgMail.setApiKey(mail_api!)
    const msg = {
    to: userInfo.email, 
    from: 'omaraljoundi@gmail.com', 
    templateId:"d-3dbd964e42a4416093efb1fc6c197aa7",
    dynamicTemplateData: {
    status:status === "completed" ? "قبوله" : "رفضه",
    entity_name:result.entity_name ? result.entity_name : "لايوجد" ,
    number_of_cars:result.number_of_cars ? result.number_of_cars : "لا يوجد",
    is_company:result.is_company ? result.is_company : "لايوجد",
    age_group:result.age_group ? result.age_group : "لايوجد",
    expected_age:result.expected_audience ? result.expected_audience : "لايوجد",
    service_date:result.service_date ? result.service_date.toLocaleDateString("ar-JO") : "لايوجد",
    notes:result.notes ? result.notes : "لايوجد",
    date:result.create_at?.toLocaleDateString("ar-JO"),
    sid:id
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
    return res.status(201).json(`Service with id: ${id} has been completed`)
    }
    else{
        return res.status(404).json(`No Service with Id:${id}`)
    }
}





const service_routes = (app:express.Application) =>{
    app.get('/services',verifyAuthToken,index)
    app.get('/services/:id',verifyAuthToken,getServiceById)
    app.put('/services/:id',verifyAuthToken,updateStatus)
    app.post('/services/proposal',verifyAuthToken,proposalRequest)
    app.post('/services/cars_check',verifyAuthToken,carsCheckRequest)
    app.post('/services/nosie_measurement',verifyAuthToken,nosieMeasurementRequest)
    app.post('/services/course',verifyAuthToken,courseRequest)
    app.delete('/services/:id',verifyAuthToken,deleteRow)

}

export default service_routes