
import client from "../database"
import { authedUser } from "../handlers/services/dashboard";

export type complaint = {
id?:number,
location?:any,
image:string,
description:string,
nearest_attraction:string,
public:boolean,
place_name:string,
create_at?:Date
}

class Complaint {
    //End User Methods 
    async create(c:complaint):Promise<complaint>{
        try{
            const conn = await client.connect()
            const sql = "INSERT INTO complaints(image,description,nearest_attraction,public,place_name,location,user_id) values($1,$2,$3,$4,$5,$6,$7)"
            const result = await conn.query(sql,[c.image,c.description,c.nearest_attraction,c.public,c.place_name,c.location,authedUser.id])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Could not insert Complaints ${err}`)
        }
    }

    // Ranger Methods
    async complete(cid:number):Promise<complaint|null>{
        try{
            
            const status = "completed"
            const conn = await client.connect()
            let sql = "update complaints set status=$1,closedby_id = $2 where id = $3"
            const result = await conn.query(sql,[status,BigInt(authedUser.id),cid])
            if(result.rowCount > 0){
                sql = "SELECT * from complaints where id=$1"
                const result = await conn.query(sql,[cid])
                return result.rows[0]
            }
            else {
                return null
            }
        }
        catch(err){
            throw new Error(`Something went wrong:${err}`)
        }
    }

    // All users Methods
    async index():Promise<complaint[]>{
        try{
            const conn = await client.connect()
            const sql = "SELECT * from complaints"
            const  result = await conn.query(sql)
            conn.release()
            return result.rows
        }
        catch(err){
            throw new Error(`Something went wrong: ${err}`)
        }
    }
    async getComplaintById(cid:number):Promise<complaint>{
        try{
            const conn = await client.connect()
            const sql = "SELECT * FROM complaints where id=$1"
            const result = await conn.query(sql,[cid])
            conn.release()
            return result.rows[0]
        }
        catch(err){
            throw new Error(`Something went wrong ${err}`)
        }
    }
}
export default Complaint