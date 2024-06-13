import { shift } from "../../utils/types/shift";

export interface IUserDTO{
    displayName?: string,
    nickname?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    uid?: string,
    postID?: string[],
    chatID?: string,
    course?: string,
    shift?: string
    description?: string
}

