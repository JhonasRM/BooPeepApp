import axios from "axios";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
export class userRepository {
  private endpointuser: string;
  private endpointlogin: string;
  private endpointreset: string;
  private endpointest: string;
  private endpointestlogin: string;
  constructor() {
    this.endpointuser = 'https://boopeepapir.onrender.com/user'
    this.endpointlogin = 'https://boopeepapir.onrender.com/loginuser'
    this.endpointreset = 'https://boopeepapir.onrender.com/resetpwd'
    this.endpointest = 'http://localhost:3000/user'
    this.endpointestlogin = 'http://localhost:3000/loginuser'

  };

  async cadastro(user: User): Promise<IReturnAdapter> {
    const userData = {
      displayName: user.name,
      email: user.email,
      password: user.password
    }
    try {
      console.log('bateu...')
      const resp = await axios.post(this.endpointest, userData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 201) {
        throw new Error(resp.statusText)
      }
      return { val: true, data: resp.data }
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message }
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }

  }

  async getUser(email: string, password: string): Promise<IReturnAdapter> {
    try{
      const resp = await axios.get(this.endpointest, {
        params: {
          email: email,
          password: password
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 200) {
        throw new Error(resp.statusText)
      }
      return { val: true, data: resp.data }
    }catch(error){
       if (error instanceof Error) {
      return { val: false, erro: error.message }
    }
    return { val: false, erro: `Erro interno da aplicação: ${error}` }
  }
  }

  async login(email: string, password: string): Promise<IReturnAdapter> {
    try {
      console.log('bateu...')
      const loginData = {
        email: email,
        password: password
      }
      const resp = await axios.post(this.endpointestlogin, loginData,{
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 200) {
        throw new Error(resp.statusText)
      }
      return { val: true, data: resp.data }
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message }
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }

  }
  async resetPwd(email: string): Promise<IReturnAdapter> {
    try {
      console.log('bateu...')
      const resetData = {
        email: email
      }
      const resp = await axios.post(this.endpointreset, resetData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 200) {
        throw new Error(resp.statusText)
      }
      return { val: true, data: 'Email enviado com sucesso!'}
    } catch (error) {
      if (error instanceof Error) {
        return { val: false,  erro: error.message }
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }
  }

  async update(email: string, fieldToUpdate: string, newValue: string): Promise<IReturnAdapter> {
    if(fieldToUpdate === "name" || fieldToUpdate === "nickname"){
      fieldToUpdate = "displayName"
    }
    const  updateData = {
        email: email,
        fieldToUpdate: fieldToUpdate,
        newValue: newValue
    }
    try {
      console.log('bateu...')
      const resp = await axios.put(this.endpointest, updateData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 200) {
        console.log('voltou')
        throw new Error(resp.statusText)
      }
      console.log('voltou')
      console.log(resp.data)
      return { val: true, data: resp.data }
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message }
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }
  }
}
