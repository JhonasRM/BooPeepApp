import { useState } from "react";
import { chatValidator } from "../../Service/Validators/chatValidator";
import { chatService } from "../../Service/API/chatService";
import { Chat } from "../../Service/Entities/chatEntities";
import  {Message} from "../../Service/Entities/messageEntities"
import { searchOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import ChatPersistence from "../../Service/Persistence/chatPersistence";

const ChatStateController = () =>{

    const getchat = async(): Promise <IReturnAdapter> => {    
   

        try {
            const chatServiceInstance = new chatService();
            const req = await chatServiceInstance.getMessages(chat)
            console.log(`Request: ${req}`);
            if (req.val === false) {
                throw new Error("Bad Request");
            }

            const chatData = req.data as Message[]

            let chat: Message[] = []
            chatData.forEach(message => {
                const newMessage = new Message(
                    message.UserID, 
                    message.chatid,
                    message.displayName,          
                    message.lastmsg
                )

                chat.push(newMessage)
            });

            const MyChat = ChatPersistence.getInstance()
            MyChat.setchat(newMessage)
            return { val: true, data: 'ChatID criado com sucesso' };
          } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error };
            }
            return { val: false, erro: "Internal Server Error" };
          }

        } catch (error) {
            console.log("setchat respondeu com ERRO!")
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                  return { val: false, erro: error };
                } else if (error.message === "Bad Request") {
                  return { val: false, erro: error };
                }
            }
              return { val: false, erro: "Internal Server Error" };
        }
    
    }
    return{
        getchat  
    }

}

export {ChatStateController}