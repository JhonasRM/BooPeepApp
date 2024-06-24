import { useState } from "react"
import { Message } from "../../Service/Entities/messageEntities";
import {User} from "../../Service/Entities/userEntities"
import { chatValidator } from "../../Service/Validators/chatValidator";
import { ChatStateAndSetters } from "../../utils/Interfaces/ChatStateAndSetters";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { chatRepository } from "../../Data Access/Repository/chatRepository";


const createMessageStateController = () =>{
    const [UserID, setUserID] = useState("");
    const [displayname, setdisplayname] = useState("");
    const [lastmessage, setlastmessage] = useState("");
    const [dataTime, setdataTime] = useState(0);
    const [chatid, setchatid] = useState("");

    const validator : chatValidator = new chatValidator();
    
    const setState: ChatStateAndSetters ={
        lastmessage: setlastmessage
    };

    const handleFieldChange = async (field: string, value: string ): Promise<IReturnAdapter> => {
        if (field in setState) {
            setState[field as keyof ChatStateAndSetters](value);
            const valfield = await validator.valByField(field, value);
              
            if (valfield.valido === false) {
                console.log(valfield.erro);
                return {val: false, erro: valfield.erro}
            }

            console.log("")
            console.log("-----createChatStateController-----");
            console.log(`field: ${field}, value: ${value}`)
            console.log("validação concluída");
            return { val: true };
        }

        console.error(
            `Campo "${field}" não é uma chave válida em chatStateAndSetters.`
        );

        return {val: false, erro: `Campo "${field}" não é uma chave válida em chatStateAndSetters.`}
    }
   
    const checkChatExistence = (): boolean => {
        const existingChat = GetOnStorage('chatid') as unknown as string;
        return existingChat ? true : false;
    };
 
    const handleCreateChat = async ( lastmessage: string ): Promise<IReturnAdapter> => {
        if (lastmessage === '') {
            return {val: false,  erro: `Preeencha todos os campos para realizar o cadastro.`}
        }
       
        if (checkChatExistence()) {
            return { val: false, erro: `Já existe um chat com o chatid especificado.` };
        }


        const uid = GetOnStorage('uid') as unknown as string
        setUserID(uid)
        const chatid = GetOnStorage('uid') as unknown as string
        setchatid(chatid)
        const displayname = GetOnStorage('uid') as unknown as string
        setdisplayname(displayname)
    
      
        const message: Message = new Message(
            uid, 
            chatid,
            displayname,
            lastmessage, 

        );

        try {
            console.log(message);
            const ChatRepository = new chatRepository();

            const req = await ChatRepository.createmessage(message);
            if (req.val === false) {
                throw new Error("Bad Request");
            };
            return {val: true, data: message};

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                    return {val: false, erro: error}
                } else if (error.message === "Bad Request") {
                    return {val: false, erro: error}
                }
                return {val: false, erro: error}
            }
            return {val: false, erro: "Internal Server Error"};
        }
    };

    return{
        UserID,
        displayname, 
        lastmessage,
        dataTime, 
        chatid,
        handleFieldChange,   
        handleCreateChat
         
    }

}
export { createMessageStateController }