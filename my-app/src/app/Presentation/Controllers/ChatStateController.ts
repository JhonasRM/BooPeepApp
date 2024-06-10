import { useState } from "react"
import { Message } from "../../Service/Entities/messageEntities";
import {User} from "../../Service/Entities/userEntities"
import { searchOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { chatValidator } from "../../Service/Validators/chatValidor";
import { chatService} from "../../Service/API/chatService";
import { ChatStateAndSetters } from "../../utils/Interfaces/ChatStateAndSetters";

const createChatStateController = () =>{
    const [uid, setuid] = useState("");
    const [displayname, setdisplamayname] = useState("");
    const [lastmessage, setlastmessage] = useState("");
    const [dataTime, setdataTime] = useState(0);
    const [chatid, setchatid] = useState("");

    const validator : chatValidator = new chatValidator();
    const chatServices : chatService = new chatService() ;

    const setState: ChatStateAndSetters ={
        lastmessage: setlastmessage
    };

    const handleFieldChange = async (field: string, value: string ): Promise<{valido: boolean, value: number, erro?: string | Error}> => {
        if (field in setState) {
            setState[field as keyof ChatStateAndSetters](value);
            const valfield = await validator.valByField(field, value);
            
            if (valfield.valido === false) {
                console.log(valfield.erro);
                return {valido: false, value: 401, erro: valfield.erro}
            }

            console.log("")
            console.log("-----createChatStateController-----");
            console.log(`field: ${field}, value: ${value}`)
            console.log("validação concluída");
            return { valido: true, value: 200 };
        }

        console.error(
            `Campo "${field}" não é uma chave válida em chatStateAndSetters.`
        );

        return {valido: false, value: 400, erro: `Campo "${field}" não é uma chave válida em chatStateAndSetters.`}
    }
 
    const handleCreateChat = async ( lastmessage: string ): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Message}> => {
        if (lastmessage === '') {
            return {valido: false, value: 400, erro: `Preeencha todos os campos para realizar o cadastro.`}
        }
        const uid = searchOnStorage('uid') as unknown as string
        setuid(uid)
        const message: Message = new Message(
            uid, 
            displayname,
            lastmessage, 

        );
        try {
            console.log(message);
            const req = await chatService.createmessage(message);
            if (req.valido === false) {
                throw new Error("Bad Request");
            };
            return {valido: true, value: 201, data: message};

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                    return {valido: false, value: 401, erro: error}
                } else if (error.message === "Bad Request") {
                    return {valido: false, value: 400, erro: error}
                }
                return {valido: false, value: 400, erro: error}
            }
            return {valido: false, value: 500, erro: "Internal Server Error"};
        }
    }
}