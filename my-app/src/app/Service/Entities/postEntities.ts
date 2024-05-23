export class Post {
    public createdAt: number;
    public UserID: string;
    public postId: string;
    public local: string;
    public status: number;
    public description: string;
    
    constructor(createdAt: number, UserID: string, postId: string, local: string, status: number, description: string) {
        this.createdAt = createdAt,
        this.UserID = UserID,
        this.postId = postId,
        this.local = local,
        this.status = status
        this.description = description
    }
}