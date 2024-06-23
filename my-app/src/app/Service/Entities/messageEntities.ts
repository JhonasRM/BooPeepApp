export class Message{
    public  chatid: string;
    public UserID: string;
   
    public displayName: string;
    public lastmsg: string;
    public dateTime: Date;
  
    constructor( uid: string, displayName: string, lastmsg: string, chatid?:string){
        this.UserID = uid,
        this.displayName = displayName,
        this.lastmsg = lastmsg,
        this.dateTime = new Date(),
        this.chatid = ""
    }
}