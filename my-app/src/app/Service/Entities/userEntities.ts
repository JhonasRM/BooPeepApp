import { shift } from "../../utils/types/shift";
import { IUserDTO } from "../DTO/IUserDTO";

export class User{
    public readonly uid: string;
    public  name: string;
    public nickname: string
    public email: string;
    public password: string;
    public postID: string[];
    public chatID: string;
    public course: string;
    public shift: string;
    public description: string;
    constructor({displayName= "Não definido", nickname= "Não definido", email="Não definido",  password="Não definido", confirmPassword="Não definido", uid="Não definido", postID=["Não definido"], chatID="Não definido", course="Não definido", shift="Não definido", description="Adicione sua biografia aqui"}: IUserDTO){
        const name = displayName.split(' ')
        this.name = name[0]
        this.nickname = name.slice(1).join(' ')
        this.email = email,
        this.password = password,
        this.uid = '',
        this.postID = [],
        this.chatID = ''
        this.course = course,
        this.shift = shift
        this.description = description
        if(nickname !== "Não definido"  && nickname !== "" ){
            this.name = `${displayName} ${nickname}`
        }
        if(uid !== "Não definido" && uid !==  ""){
            this.uid = uid
        }
        if(postID[0] !== "Não definido" && postID[0] !== "" || " "){
            this.postID = postID
        }
        if(chatID !== "Não definido" && chatID !== "" || " "){
            this.chatID = chatID
        }
    }

}