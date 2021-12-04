
import client from "../database"
import { authedUser } from "../handlers/services/dashboard";

export type complaint = {
id?:number,
// location?:any,
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
            const sql = "INSERT INTO complaints(image,description,nearest_attraction,public,place_name,user_id) values($1,$2,$3,$4,$5,$6)"
            const result = await conn.query(sql,[c.image,c.description,c.nearest_attraction,c.public,c.place_name,authedUser.id])
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
            let sql = "update complaints set status=$1 where id = $2"
            const result = await conn.query(sql,[status,cid])
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
    async index(status:string):Promise<complaint[]>{
        try{
            let sql
            var result
            const conn = await client.connect()
            console.log(status)
            if(status === "undefined"){
                sql = "SELECT * from complaints where user_id = $1"
                result = await conn.query(sql,[authedUser.id])
            }
            else{
                sql = "SELECT * from complaints where status=$1 AND user_id=$2"
                result = await conn.query(sql,[status,authedUser.id])
            }
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