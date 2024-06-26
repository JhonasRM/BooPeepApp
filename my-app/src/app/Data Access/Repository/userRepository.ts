import axios from "axios";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
export class userRepository {

  private endpointuser: string;
  private endpointlogin: string;
  private endpointestreset: string;
  private endpointreset: string;
  private endpointest: string;
  private endpointestlogin: string;
  private endpointests: string;
  constructor() {
    this.endpointuser = 'http://localhost:3100/user',
    this.endpointlogin = 'http://localhost:3100/loginuser',
    this.endpointreset = 'http://localhost:3100/resetpwd',
    this.endpointest = 'http://localhost:3100/user',
    this.endpointests = 'http://localhost:3100/users',
    this.endpointestlogin = 'http://localhost:3100/loginuser',
    this.endpointestreset = 'http://localhost:3100/resetpwd'
  };

  async cadastro(user: User): Promise<IReturnAdapter> {
    const userData = {
      displayName: user.name,
      email: user.email,
      password: user.password
    }
    try {
      console.log('bateu...')
      const resp = await axios.post(this.endpointuser, userData, {
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

  async getUsers(): Promise<IReturnAdapter> {
    try{
      const resp = await axios.get(this.endpointests, {
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
  async getUser(email: string, password: string): Promise<IReturnAdapter> {
    try{
      const resp = await axios.get(this.endpointuser, {
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

  async getUserByUID(uid: string): Promise<IReturnAdapter> {
    try{
      const resp = await axios.get(`${this.endpointest}/${uid}`, {
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
      const loginData = {
        email: email,
        password: password
      }
      const resp = await axios.post(this.endpointlogin, loginData,{
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
    const  updateData = {
        email: email,
        fieldToUpdate: fieldToUpdate,
        newValue: newValue
    }
    try {
      console.log('bateu...')
      const resp = await axios.put(this.endpointuser, updateData, {
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
  async delete(email: string){

    try{
      const resp = await axios.delete(this.endpointuser, {
        params: {
          email: email
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
}
