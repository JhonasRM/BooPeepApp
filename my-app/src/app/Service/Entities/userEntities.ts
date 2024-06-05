export class User{
    public readonly uid: string;
    public  name: string;
    public email: string;
    public password: string;
    public postID: string[];
    public chatID: string
    constructor(name: string, sobrenome: string, email: string,  password: string, confirmPassword: string, uid?: string, postID?: string[], chatID?: string){
        this.name = `${name} ${sobrenome}`,
        this.email = email,
        this.password = password,
        this.uid = '',
        this.postID = [],
        this.chatID = ''
        if(uid){
            this.uid = uid
        }
        if(postID){
            this.postID = postID
        }
        if(chatID){
            this.chatID = chatID
        }
    }
}