import axios from "axios";
import { User } from "../Entities/userEntities";
export class userService{
    private endpointuser: string;
    constructor(){
        this.endpointuser = 'https://boopeepapir.onrender.com/user'
        };
    
    async cadastro(user: User){
      const userData = {
        name: user.name,
        email: user.email,
        password: user.password
      }
      try {
        console.log('bateu...')
        await axios.post(this.endpointuser, userData, {
          headers: {                  
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization", 
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
            "Content-Type": "application/json;charset=UTF-8"                   
        },
        }).then(resp => {
          console.log(resp)
          return resp.data
        })
          }catch (error) {
        console.log(error)
        return error
      }
        
    }
}