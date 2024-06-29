import { useState } from "react";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { Coment } from "../../Service/Entities/comentEntities";
import { comentRepository } from "../../Data Access/Repository/comentRepository";
import { useRouter } from "expo-router";

const ComentBlockStateController = () => {
    const [coments, setComents] = useState<Coment[]>([]);
    const cRepository: comentRepository = new comentRepository();
    const uRepository: userRepository = new userRepository();
    const router = useRouter();

    const handleFetchComents = async (postID: string): Promise<IReturnAdapter> => {
        try {
            const req = await cRepository.getComents(postID);
            if (req.val === false) {
                throw new Error(req.erro as string);
            }
            const comentsData = req.data as Coment[];
            const comentArray: Coment[] = comentsData.map((coment: Coment) => ({
                ...coment
            }));
            setComents(comentArray);
            return { val: true, data: comentsData };
        } catch (error) {
            console.log(error);
            return { val: false, erro: error as string };
        }
    };

    const createComent = async (postID: string, text: string): Promise<IReturnAdapter> => {
        try {
            const uid = await GetOnStorage('uid');
            if (uid.val === false) {
                router.push('/');
            }
            const newComent = new Coment(postID, uid.info, text); // Assuming Coment constructor matches the fields
            const req = await cRepository.createComent(newComent);
            if (req.val === false) {
                throw new Error(req.erro as string);
            }
            console.log(req.data);
            return { val: true, data: newComent };
        } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error.message };
            } else {
                return { val: false, erro: `Erro interno da aplicação: ${error as string}` };
            }
        }
    };

    return {
        coments,
        handleFetchComents,
        createComent
    };
};

export { ComentBlockStateController };