import { format } from 'date-fns';
export class Post {
    public UserID: string;
    public createdAt: string;
    public description: string;
    public local: string;
    public postId: string;
    public status: number;
    
    constructor(
        UserID: string, 
        createdAt: string,
        description: string, 
        local: string,
        postID?: string,
        status?: number
    ) {
        this.UserID = UserID,
        this.createdAt = 'Agora',
        this.description = description,
        //this.title = title,
        this.local = local,
        this.postId = "",
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