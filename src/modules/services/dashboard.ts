import client from "../../database";
import {user} from "../user";

class Dashboard {
    async isUserVertified(phone_number:string):Promise<boolean>{
        try{
            const conn = await client.connect()
            const sql = "SELECT status from users where phone_number=$1"
            const result = await conn.query(sql,[phone_number])
            if(result.rows[0].status === "vertify"){
               return true
            }
            else{
                return false
            }
        }
        catch(err){
            throw new Error(`An error occurred during verification check: ${err} `)
        }
    }

    async isUserExist(phone_number:string):Promise<boolean>{
        try{
            const conn = await client.connect()
            const sql = "SELECT * from users where phone_number=$1"
            const result = await conn.query(sql,[phone_number])
            if(result.rowCount > 0){
                return true
            }
            else{
                return false
            }
        }
        catch(err){
            throw new Error(`Couldnt check user existence:${err}`)
        }
    }
    async getUserInfoFromService(sid:string):Promise<user>{
        try{
            console.log(sid)
            const conn = await client.connect()
            const sql ="SELECT user_id from services where id=$1"
            const serviceObj = await conn.query(sql,[BigInt(sid)])
            const sql2 = "SELECT email,phone_number,name,nationality_id from users where id=$1"
            const userInfo = await conn.query(sql2,[serviceObj.rows[0].user_id])
            return userInfo.rows[0]
            
        }
        catch(err){
            throw new Error(`Couldnt get user:${err}`)
        }
    }
    async getUserInfoFromComplaint(sid:string):Promise<user>{
        try{
            console.log(sid)
            const conn = await client.connect()
            const sql ="SELECT user_id from complaints where id=$1"
            const serviceObj = await conn.query(sql,[BigInt(sid)])
            const sql2 = "SELECT email,phone_number,name,nationality_id from users where id=$1"
            const userInfo = await conn.query(sql2,[serviceObj.rows[0].user_id])
            return userInfo.rows[0]
            
        }
        catch(err){
            throw new Error(`Couldnt get user:${err}`)
        }
    }

}
export default Dashboard