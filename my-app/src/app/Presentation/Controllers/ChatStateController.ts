import { useState } from "react";
import { chatValidator } from "../../Service/Validators/chatValidator";
import { chatService } from "../../Service/API/chatService";
import { Chat } from "../../Service/Entities/chatEntities";
import  {Message} from "../../Service/Entities/messageEntities"
import { searchOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

const ChatStateController = () =>{
    const [UserID, setUserID] = useState("");
    const [displayname, setdisplayname] = useState("");
    const [message, setmessage] = useState("");
    const [chatid, setchatid] = useState("");

    const getchat = async(): Promise <IReturnAdapter> => {    
   

        try {
            const chatServiceInstance = new chatService();
            const req = await chatServiceInstance.getMessages()
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

            if (chat[0] instanceof Message) {
                return { val: true, data: chat };
            }

            throw new Error('Nenhum Chat encontrado.')
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
        UserID,
        chatid,
        message,
        getchat  
    }

}

export {ChatStateController}