import { Post } from "../../Service/Entities/postEntities"

export interface PostFeed {
    name: string,
    nickname: string,
    course: string,
    shift: string,
    description: string,
    local: string,
    status: number,
    createdAt: string
}