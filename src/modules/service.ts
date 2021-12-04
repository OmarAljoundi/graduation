import client from "../database";
import { authedUser } from "../handlers/services/dashboard";

export type service = {
    id?:number,
    age_group?:string,
    entity_name?:string
    expected_audience?:number,
    is_company?:boolean,
    notes:string,
    number_of_cars?:number,
    service_date?:Date,
    service_detalis?:string,
    status?:string,
    service_type?:bigint,
    user_id?:bigint,
    create_at?:Date
}


class Service {
    async index():Promise<service[]>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * FROM Services"
        const result = await client.query(sql)
        conn.release()
        return result.rows
        }
        catch(err){
            throw new Error(`Couldnt get services: ${err}`)
        }
    }
     async createProposalRequest(s:service):Promise<service>{
        try{
        const serviceType = 'proposal_request'
        const conn = await client.connect()
        const sql = "INSERT INTO services (entity_name,notes,user_id,service_type) values($1,$2,$3,$4) RETURNING *"
        const result = await client.query(sql,[s.entity_name,s.notes,authedUser.id,serviceType])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Couldnt get services: ${err}`)
        }
    }

     async createCarsCheckRequest(s:service):Promise<service>{
        try{
        const serviceType = 'cars_check_request'
        const conn = await client.connect()
        const sql = "INSERT INTO services (entity_name,is_company,number_of_cars,notes,user_id,service_type) values($1,$2,$3,$4,$5,$6) RETURNING *"
        const result = await client.query(sql,[s.entity_name,s.is_company,s.number_of_cars,s.notes,authedUser.id,serviceType])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Couldnt get services: ${err}`)
        }
    }
      async createNosieMeasurementRequest(s:service):Promise<service>{
        try{
        const serviceType = 'nosie_measurement_request'
        const conn = await client.connect()
        const sql = "INSERT INTO services (entity_name,notes,user_id,service_type) values($1,$2,$3,$4) RETURNING *"
        const result = await client.query(sql,[s.entity_name,s.notes,authedUser.id,serviceType])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Couldnt get services: ${err}`)
        }
    }

      async createCourseRequest(s:service):Promise<service>{
        try{
        const serviceType = 'course_request'
        const conn = await client.connect()
        const sql = "INSERT INTO services (age_group,entity_name,expected_audience,notes,service_date,user_id,service_type) values($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        const result = await client.query(sql,[s.age_group,s.entity_name,s.expected_audience,s.notes,s.service_date,authedUser.id,serviceType])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Couldnt get services: ${err}`)
        }
    }
    async deleteService(sid:number):Promise<boolean>{
        try{
            const conn = await client.connect()
            const sql = "DELETE FROM services where id=$1"
            const result = await conn.query(sql,[sid])
            conn.release()
            if(result.rowCount > 0){
                return true
            }
            else{
                return false
            }
        }
        catch(err){
            throw new Error(`Row Couldnt be Deleted : ${err}`)
        }
    }
    async getServiceById(sid:number):Promise<service|string>{
        try{
            const conn = await client.connect()
            const sql = "SELECT * FROM services where id=$1"
            const result = await conn.query(sql,[sid])
            conn.release()
            if(result.rowCount>0){
                return result.rows[0]
            }
            else{
                return `No Service With id : ${sid}`
            }
        }
        catch(err){
            throw new Error(`Couldnt Get service:${err}`)
        }
    }
    async updateService(sid:number,status:string):Promise<service|null>{
        try{
            const conn = await client.connect()
            const sql = "update services set status=$1 where id=$2"
            const result = await conn.query(sql,[status,sid])
            if(result.rowCount>0){
                const sql2 = "SELECT * FROM services where id=$1"
                const result2 = await conn.query(sql2,[sid])
                return result2.rows[0]
            }
            else{
                return null
            }
        }
        catch(err){
            throw new Error(`Couldnt update the service:${err}`)
        }
    }

}
export default Service