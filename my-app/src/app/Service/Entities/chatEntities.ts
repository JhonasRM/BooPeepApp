import { Message } from "./messageEntities";

export class Chat{
    public  uid: string;
    public chatid: string;
    public messages?: Message[];
  
    constructor(uid:string,  chatid?: string, messages?: Message[],){
        this.uid = uid
        this.messages = messages
        this.chatid = ""
        if(chatid){
            this.chatid = chatid
        }
    }
}