import { useState } from "react";
import { chatValidator } from "../../Service/Validators/chatValidator";
import { Chat } from "../../Service/Entities/chatEntities";
import  {Message} from "../../Service/Entities/messageEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import ChatPersistence from "../../Service/Persistence/chatPersistence";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { chatRepository } from "../../Data Access/Repository/chatRepository";

const ChatStateController = () =>{

    const getchat = async(): Promise <IReturnAdapter> => {    
   

        try {
          const chatID = await GetOnStorage('chatID')
            const chatRepositoryInstance = new chatRepository();
            const req = await chatRepositoryInstance.getMessages(chatID.info)
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
            const newChat = new Chat(chatData[0].UserID, chat, chatID.info)
            const MyChat = ChatPersistence.getInstance()
            MyChat.setchat(newChat)
            return { val: true, data: 'ChatID criado com sucesso' };
          }catch (error) {
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