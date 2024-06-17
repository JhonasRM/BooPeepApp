import { format } from 'date-fns';
export class Post {
    public createdAt: string;
    public UserID: string;
    public description: string;
    public postId: string;
    //public title: string;
    public local: string;
    public status: number;
    
    constructor(
        UserID: string, 
        description: string, 
        /*title: string,*/ 
        local: string,
        postID?: string,
        status?: number,
        createdAt?: string
    ) {
        this.createdAt = 'Agora',
        this.UserID = UserID,
        this.description = description,
        this.postId = "",
        //this.title = title,
        this.local = local,
        this.status = 0
        if(status){
            this.status = status
        }
        if(postID){
            this.postId = postID
        }
        if(createdAt){
            const agora = Date.now()
            this.createdAt = format(createdAt, 'dd/MM/yyyy HH:mm:ss')
        }
    }
}