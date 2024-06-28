import { Post } from "../../Service/Entities/postEntities"
import { User } from "../../Service/Entities/userEntities"

export interface PostFeed {
    post: Post,
    user: User
}