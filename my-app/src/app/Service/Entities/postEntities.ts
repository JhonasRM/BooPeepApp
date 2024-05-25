export class Post {
    public createdAt: number;
    public UserID: string;
    public description: string;
    public postId: string;
    //public title: string;
    public local: string;
    public status: number;
    
    constructor(
        createdAt: number,
        UserID: string, 
        description: string, 
        postId: string, 
        /*title: string,*/ 
        local: string, 
        status: number 
    ) {
        this.createdAt = createdAt,
        this.UserID = UserID,
        this.description = description,
        this.postId = postId,
        //this.title = title,
        this.local = local,
        this.status = status
    }
}