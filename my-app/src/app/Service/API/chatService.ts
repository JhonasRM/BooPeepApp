import axios from "axios";
import { Chat } from "../Entities/chatEntities";
import { Message } from "../Entities/messageEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { MessagesSquare } from "@tamagui/lucide-icons";

export class chatService {
  private endpointchat: string;

  constructor() {
    this.endpointchat = "https://boopeepapir.onrender.com/chat"
  };

  async setchat(chat: Chat): Promise< {valido: boolean, 
  value?: number, 
  erro?: string | Error, 
  data?: Chat[]}> {
    
    try {
      console.log("createChat foi chamado!")
      const chatData = {
        uid: chat.uid,
        message: chat.messages,
    }
      const resp = await axios.post(this.endpointchat, chatData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "POST",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 200) {
        console.log("createChat respondeu com ERRO!");
        throw new Error(resp.statusText)
      };
      console.log("createChat respondeu com SUCESSO!");
      console.log(resp.data);
      return { valido: true,value:200, data: resp.data }
    } catch (error) {
      if (error instanceof Error) {
        return { valido: false, value:400, erro: error.message }
      }
      return { valido: false, value:500, erro: `Erro interno da aplicação: ${error}` }
    }

  }

  async createmessage(chat: Chat, message:Message): Promise<{
    valido: boolean, 
    value?: number, 
    erro?: string | Error, 
    data?: Message[]}> {
      try {
      console.log("createMessage foi chamado")
      const chatData = {
        uid: chat.uid,
        chat: message.chatid,
        displayName: message.displayName,
        lastmsg: message.lastmsg,
        dateTime: message.dateTime
    }
   
      const resp = await axios.post(this.endpointchat, chatData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "PUT",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 201) {
        console.log("createMessage respondeu com ERRO!");
        throw new Error(resp.statusText)
      }
      console.log("createMessage respondeu com SUCESSO!");
      console.log(resp.data);
      return { valido: true, value:200, data: resp.data };
     
    } catch (error) {
      if (error instanceof Error) {
        return { valido: false,value: 400, erro: error.message }
      }
      return { valido: false, value: 500, erro: `Erro interno da aplicação: ${error}` }
    }

  }
  async getMessages(): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Message[] }> {
  
    try {
        console.log("getMessages foi chamado!");
        const resp = await axios.get(this.endpointchat, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Authorization",
                "Access-Control-Allow-Methods": "GET",
                "Content-Type": "application/json;charset=UTF-8"
            }
        });

        console.log('Response from API:');
        console.log(resp.data);

        if (resp.status !== 200) {
            console.log('getMessages respondeu com ERRO!')
            throw new Error(resp.statusText)
        };
        console.log('getMessages respondeu com SUCESSO!');
        return { valido: true, value: 200, data: resp.data as Message[] };

    } catch (error) {
        if (error instanceof Error) {
            return { valido: false, value: 400, erro: error.message }
        };
        return { valido: false, value: 500, erro: 'Internal Server Error' };
    };
};

}


