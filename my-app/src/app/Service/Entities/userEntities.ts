import { IUserDTO } from "../DTO/IUserDTO";

export class User{
    public readonly uid: string;
    public  name: string;
    public email: string;
    public password: string;
    public postID: string[];
    public chatID: string
    constructor({displayName= "Não definido", sobrenome="Não definido", email="Não definido",  password="Não definido", confirmPassword="Não definido", uid="Não definido", postID=["Não definido"], chatID="Não definido"}: IUserDTO){
        console.log(displayName)
        this.name = displayName,
        this.email = email,
        this.password = password,
        this.uid = '',
        this.postID = [],
        this.chatID = ''
        if(sobrenome !== "Não definido"){
            this.name = `${displayName} ${sobrenome}`
        }
        if(uid !== "Não definido"){
            this.uid = uid
        }
        if(postID[0] !== "Não definido"){
            this.postID = postID
        }
        if(chatID !== "Não definido"){
            this.chatID = chatID
        }
    }
}