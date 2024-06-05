import axios from "axios";
import { Chat } from "../Entities/chatEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
export class userService {
  private endpointchat: string;
  private endpointmessage: string;
 
  constructor() {
    this.endpointchat = ''
    this.endpointmessage = ''
  };

  async chat(chat: Chat): Promise<IReturnAdapter> {
    const chatData = {
        uid: chat.uid
    }
    try {
      console.log('bateu...')
      const resp = await axios.post(this.endpointchat, chatData, {
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
  
}
