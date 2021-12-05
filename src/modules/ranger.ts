import client from "../database"
import bcrypt from "bcrypt";



export type ranger = {
id?:number,
name:string,
password_digest:string,
phone_number:string,
nationality_id:string,
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
    async register(u:ranger):Promise<ranger>{
        const { SALT_ROUNDS,BCRYPT_PASSWORD } = process.env
        try{
        const conn = await client.connect()
        const sql = "INSERT INTO rangers(name,password_digest,phone_number,nationality_id) Values($1,$2,$3,$4) RETURNING *"
        const password_digest = bcrypt.hashSync(u.password_digest + BCRYPT_PASSWORD!,parseInt(SALT_ROUNDS!))
        const result = await conn.query(sql,[u.name,password_digest,u.phone_number,u.nationality_id])
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
        if(userInfo.rows[0]){
            if(bcrypt.compareSync(password+BCRYPT_PASSWORD!,userInfo.rows[0].password_digest)){
            return userInfo.rows[0]
        }
        else{
            return null
        }
        }
        else{
            return null
        }
        }    
    catch(err){
            throw new Error(`Ranger Couldnt be registerd, ${err}`)
        }
    }

  
}


export default Ranger