export class Coment{
    public readonly comentID?: string;
    public postID: string;
    public uid: string;
    public text: string;
    public createdAt: number

    constructor(postID: string, uid: string, text: string, createdAt?: number, comentID?: string){
        this.postID = postID;
        this.uid = uid;
        this. text = text
        this.createdAt = Date.now()
        if(comentID){
        this.comentID = comentID; 
        }
        if(createdAt){
            this.createdAt = createdAt
        }
    }
}