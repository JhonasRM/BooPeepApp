import { format } from 'date-fns';
import { User } from './userEntities';
import { userRepository } from '../../Data Access/Repository/userRepository';
export class Post {
    public createdAt: string;
    public UserID: string;
    public description: string;
    public postId: string;
    public local: string;
    public status: number;
    public user: User | null = null
    private uRepository: userRepository
    constructor(
        UserID: string, 
        description: string, 
        local: string,
        postID?: string,
        status?: number,
        createdAt?: string,
    ) {
        this.uRepository = new userRepository
        const agora = Date.now()
        this.UserID = UserID,
        this.createdAt =  format(agora, 'dd/MM/yyyy HH:mm:ss'),
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
            this.createdAt = format(createdAt, 'dd/MM/yyyy HH:mm:ss')
        }
        this.setUser()
    }

    async setUser(){
        if(this.user === null){
        const reqUser = await this.uRepository.getUserByUID(this.UserID)
                if(reqUser.val === false){
                    throw new Error(reqUser.erro as string)
                }
                const userData = reqUser.data as User
                const newUser = new User({
                    displayName: reqUser.data.displayName,
                    course: userData.course,
                    shift: userData.shift
                })
                this.user = newUser
            }
            return this.user
    }
}