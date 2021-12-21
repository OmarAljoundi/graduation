import client from "../database"
import bcrypt from "bcrypt";



export type ranger = {
id?:number,
name?:string,
password_digest?:string,
phone_number?:string,
nationality_id?:string,
email?:string,
role?:string
}




class Ranger {
    async index():Promise<ranger[]>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * from rangers"
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        }
        catch(err){
            throw new Error(`Rangers Couldnt be retrieved, ${err}`)
        }
    }
     async getRangerById(id:string):Promise<ranger>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * from rangers where id =$1"
        const result = await conn.query(sql,[Number(id)])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Rangers Couldnt be retrieved, ${err}`)
        }
    }

    async getRangerClosedService(id:string):Promise<ranger>{
        try{
        const conn = await client.connect()
        const sql = "SELECT closedby_id from services where id= $1"
        const result = await conn.query(sql,[BigInt(id)])
        const sql2 = "SELECT * from rangers where id=$1"
        const info = await conn.query(sql2,[Number(result.rows[0].closedby_id)])
        conn.release()
        return info.rows[0]
        }
        catch(err){
            throw new Error(`Rangers Couldnt be retrieved, ${err}`)
        }
    }
      async getRangerClosedComplaint(id:string):Promise<ranger>{
        try{
        const conn = await client.connect()
        const sql = "SELECT closedby_id from complaints where id= $1"
        const result = await conn.query(sql,[BigInt(id)])
        const sql2 = "SELECT * from rangers where id=$1"
        const info = await conn.query(sql2,[Number(result.rows[0].closedby_id)])
        conn.release()
        return info.rows[0]
        }
        catch(err){
            throw new Error(`Rangers Couldnt be retrieved, ${err}`)
        }
    }
     async checkRanger(nationality_id:string):Promise<ranger|null>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * from rangers where nationality_id = $1"
        const result = await conn.query(sql,[nationality_id])
        conn.release()
        return result.rowCount > 0 ? result.rows[0] : null
        }
        catch(err){
            throw new Error(`Rangers Couldnt be retrieved, ${err}`)
        }
    }
    async register(u:ranger):Promise<ranger>{
        try{
        const conn = await client.connect()
        const sql = "INSERT INTO rangers(name,role,password_digest,email,phone_number,nationality_id,firstTime) Values($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        const password_digest = Math.random().toString(36).substr(2, 6) + Math.random().toString(36).substr(2, 6) + Math.random().toString(36).substr(2, 6);
        const result = await conn.query(sql,[u.name,u.role,password_digest,u.email,u.phone_number,u.nationality_id,true])
        conn.release()
        return result.rows[0]
    
        }
        catch(err){
            throw new Error(`Ranger Couldnt be registerd, ${err}`)
        }
    }
   async createRangerPassword(u:ranger):Promise<ranger> {
        const { SALT_ROUNDS,BCRYPT_PASSWORD } = process.env
        try{
        const conn = await client.connect()
        const sql = "UPDATE rangers set password_digest = $1 , firstTime = $2 where nationality_id = $3 RETURNING *"
        const password_digest = bcrypt.hashSync(u.password_digest + BCRYPT_PASSWORD!,parseInt(SALT_ROUNDS!))
        const result = await conn.query(sql,[password_digest,false,u.nationality_id])
        conn.release()
        return result.rows[0]
    
        }
        catch(err){
            throw new Error(`Ranger Couldnt be registerd, ${err}`)
        }
   }
    async authenticate(nationality_id:string,password:string):Promise<ranger|null>{
        const { BCRYPT_PASSWORD } = process.env
        try{
        const conn = await client.connect()
        const sql = "SELECT * from rangers where nationality_id=$1";
        const userInfo = await conn.query(sql,[nationality_id])
        conn.release()
        if(userInfo.rows[0].firsttime === false){
            if(bcrypt.compareSync(password+BCRYPT_PASSWORD!,userInfo.rows[0].password_digest)){
                return userInfo.rows[0] 
            }
            else{
            return null;
        }
        }
        else{
            if(password === userInfo.rows[0].password_digest){
                return userInfo.rows[0]
            }
            else{
                return null
            } 
        }
        }    
    catch(err){
            throw new Error(`Ranger Couldnt be registerd, ${err}`)
        }
    }

  
}


export default Ranger