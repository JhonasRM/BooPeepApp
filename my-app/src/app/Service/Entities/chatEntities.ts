
export class Chat{
    public  uid: string;
    public chatid: string;
    public messages: string;
  
    constructor(uid:string, messages: string, chatid?: string,){
        this.uid = uid
        this.messages = messages
        this.chatid = ""
        if(chatid){
            this.chatid = chatid
        }
    }
}