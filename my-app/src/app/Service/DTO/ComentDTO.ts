import { Coment } from "../Entities/comentEntities";
import { User } from "../Entities/userEntities";

export interface IComentDTO{
    coment: Coment,
    user: User
}