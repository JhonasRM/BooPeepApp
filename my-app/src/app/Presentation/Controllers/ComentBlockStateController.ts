import { useState } from "react";
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters";
import { Post } from "../../Service/Entities/postEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { User } from "../../Service/Entities/userEntities";
import { postRepository } from "../../Data Access/Repository/postRepository";
import { Coment } from "../../Service/Entities/comentEntities";
import { comentRepository } from "../../Data Access/Repository/comentRepository";

const ComentBlockStateController = () => {
    const [coments, setComents] = useState<Coment[]>([]);
    const cRepository: comentRepository = new comentRepository();
    const uRepository: userRepository = new userRepository();

    const handleFetchUserPosts = async (postID: string): Promise<IReturnAdapter> => {
        try {
                const req = await cRepository.getComents(postID);
                if (req.val === false) {
                    throw new Error(req.erro as string);
                }
                const comentsData = req.data as unknown as Coment[];
                const comentArray: Coment[] = []
                comentsData.forEach((coment: Coment) => {
                    const newComent = new Coment(
                        coment.postID,
                        coment.uid,
                        coment.text,
                        coment.createdAt,
                        coment.comentID
                    );
                    comentArray.push(newComent)
                })
            const comentData = await Promise.all(comentsData);
            setComents(comentArray);
            return { val: true, data: comentData };
        } catch (error) {
            console.log(error);
            return { val: false, erro: error as string };
        }
    };

    return {
        coments,
        handleFetchUserPosts,
    };
};

export { ComentBlockStateController };
