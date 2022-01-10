import client from "../database";
import bcrypt from "bcrypt";
import Client from "twilio";

const { token,sid,service_id } = process.env
const clientServer = Client(sid,token)

export type user = {
    id?:number,
    name:string,
    b_date:Date,
    email:string,
    gender:string,
    password_digest:string,
    phone_number:string,
    nationality_id:string,
}

class User {
    async index():Promise<user[]>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * from users"
        const result = await conn.query(sql)
        conn.release()
        return result.rows
        }
        catch(err){
            throw new Error(`Users Couldnt be retrieved, ${err}`)
        }
    }
    async getUserById(id:string):Promise<user>{
        try{
        const conn = await client.connect()
        const sql = "SELECT * from users where id =$1"
        const result = await conn.query(sql,[Number(id)])
        conn.release()
        return result.rows[0]
        }
        catch(err){
            throw new Error(`Users Couldnt be retrieved, ${err}`)
        }
    }
    async register(u:user):Promise<user>{
        const { SALT_ROUNDS,BCRYPT_PASSWORD } = process.env
        try{
        const conn = await client.connect()
        const sql = "INSERT INTO users(name,b_date,email,gender,password_digest,phone_number,nationality_id) Values($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        const password_digest = bcrypt.hashSync(u.password_digest + BCRYPT_PASSWORD!,parseInt(SALT_ROUNDS!))
        const result = await conn.query(sql,[u.name,u.b_date,u.email,u.gender,password_digest,u.phone_number,u.nationality_id])
        conn.release()
        return result.rows[0]
    
        }
        catch(err){
            throw new Error(`Users Couldnt be registerd, ${err}`)
        }
    }
    async authenticate(phoneNumber:string,password:string):Promise<user|null>{
        const { BCRYPT_PASSWORD } = process.env
        try{
        const conn = await client.connect()
        const sql = "SELECT * from users where phone_number=$1";
        const userInfo = await conn.query(sql,[phoneNumber])
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
            throw new Error(`Users Couldnt be registerd, ${err}`)
        }
    }

    async vertifiyPhoneNumber(phone_number:string,code:string):Promise<boolean>{
        
         try{
            let vertify :boolean = false
            const status = "verify"
            const conn = await client.connect()
            const sql = 'UPDATE users set status=$1 where phone_number=$2'
            await clientServer.verify.services(service_id!)
            .verificationChecks
            .create({to: `+962${phone_number}`, code: code})
            .then(async verification_check => {
                 if(verification_check.status === "approved"){
                    const result = await conn.query(sql,[status,phone_number])
                    conn.release()
                    vertify = true
                }
            });
            console.log(vertify)
            if(vertify){
                return true
            }
            else{
                 return false
            }
           
        }
        catch(err){
            throw new Error(`Couldnt Vertified ${err}`)
        }
   
    }


    async changePassword(phone_number:string,password:string):Promise<user|null>{
        const { SALT_ROUNDS,BCRYPT_PASSWORD } = process.env
        try{
           const conn = await client.connect()
           const sql = 'UPDATE users set password_digest=$1 where phone_number=$2 RETURNING *'
           const password_digest = bcrypt.hashSync(password + BCRYPT_PASSWORD!,parseInt(SALT_ROUNDS!))
           const result = await conn.query(sql,[password_digest,phone_number])
           return result.rows[0]
       }
       catch(err){
          return null
       }
  
   }

   async updateStatus(phone_number:string):Promise<boolean>{
        
    try{
       let vertify :boolean = false
       const status = "verify"
       const conn = await client.connect()
       const sql = 'UPDATE users set status=$1 where phone_number=$2'
       const result = await conn.query(sql,[status,phone_number])
       conn.release()
       return true
   }
   catch(err){
       return false
   }
}





}


export default User