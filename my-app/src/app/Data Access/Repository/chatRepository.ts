import axios from "axios";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { MessagesSquare } from "@tamagui/lucide-icons";
import { Chat } from "../../Service/Entities/chatEntities";
import { Message } from "../../Service/Entities/messageEntities";

export class chatRepository {
   
  private endpointchat: string;

  constructor() {
    this.endpointchat = "http://localhost:3100/chat"
  };

  async setchat(uid: string): Promise< IReturnAdapter> {
    
    try {
      console.log("createChat foi chamado!")
      const chatData = {
        uid: uid
    }
      const resp = await axios.post(this.endpointchat, chatData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization",
          "Access-Control-Allow-Methods": "POST",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      if (resp.status !== 201) {
        console.log("createChat respondeu com ERRO!");
        throw new Error(resp.statusText)
      };
      console.log("createChat respondeu com SUCESSO!");
      console.log(resp.data);
      return { val: true, data: resp.data}
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message}
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }

  }

  async createmessage( message:Message): Promise< IReturnAdapter> {
      try {
      console.log("createMessage foi chamado")
      const chatData = {
        uid: message.UserID,
        chatID: message.chatid,
        displayName: message.displayName,
        lastmsg: message.lastmsg,
        dateTime: message.dateTime
    }
   
      const resp = await axios.put(this.endpointchat, chatData, {
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
      return { val: true, data: resp.data };
     
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message }
      }
      return { val: false, erro: `Erro interno da aplicação: ${error}` }
    }

  }
 
  async getMessages(chatID: string): Promise<IReturnAdapter> {
    try {
        console.log("getMessages foi chamado!");
        const resp = await axios.get(this.endpointchat, {
          params:{
            chatID: chatID
          },
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
        return { val: true, data: resp.data as Message[] };

    } catch (error) {
        if (error instanceof Error) {
            return { val: false, erro: error.message }
        };
        return { val: false, erro: 'Internal Server Error' };
    };
};

}


