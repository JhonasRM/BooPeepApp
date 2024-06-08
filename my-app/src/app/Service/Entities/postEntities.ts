export class Post {
    public createdAt: Date;
    public UserID: string;
    public description: string;
    public postId: string;
    //public title: string;
    public local: string;
    public status: number;
    
    constructor(
        createdAt: Date,
        UserID: string, 
        description: string, 
        /*title: string,*/ 
        local: string,
        postID?: string,
        status?: number,
    ) {
        this.createdAt = new Date(),
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
    }
}