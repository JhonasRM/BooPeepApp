import axios from "axios";
import { User } from "../Entities/userEntities";
export class userService{
    private endpointuser: string;
    constructor(){
        this.endpointuser = 'https://boopeepapir.onrender.com/user'
        };
    
    async cadastro (user: User):Promise<{valido: boolean, value?: number, error?: string | Error, data?: User}>{
      const userData = {
        name: user.name,
        email: user.email,
        password: user.password
      }
      try {
        console.log('bateu...')
        const resp = await axios.post(this.endpointuser, userData, {
          headers: {                  
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization", 
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            "Content-Type": "application/json;charset=UTF-8"                   
        }
      })
        if(resp.status !== 201){
          console.log('voltou')
          throw new Error(resp.statusText)
        }
        console.log('voltou')
        return { valido: true, value: 201, data: resp.data }
          }catch (error) {
            if(error instanceof Error){
        return { valido: false, value: 400, error:error.message }
      }
      return { valido: false, value: 500, error: 'Internal Server Error'}
      }
        
    }
}