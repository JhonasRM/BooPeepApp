import { SetStateAction, useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator";
import { postServices } from "../../Service/API/postService";
import { Post } from "../../Service/Entities/postEntities";
import { postStateAndSetters } from "../../utils/types/Interfaces/postStateAndSetters";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { User } from "../../Service/Entities/userEntities";

const createPostStateController = () => {
    //const [title, setTitle] = useState("")
    // //const [checkTitle, setCheckTitle] = useState("")
    const [createdAt, setCreatedAt] = useState(0);
    const [UserID, setUserID] = useState("");
    const [description, setDescription] = useState("");
    // const [checkDescription, setCheckDescription] = useState("")
    const [postId, setPostId] = useState("");
    const [local, setLocal] = useState("ETEC ZONA LESTE");
    const [status, setStatus] = useState(0);

    const validator: postValidator = new postValidator();
    const postService: postServices = new postServices();

    const setState: postStateAndSetters = {
        //title: setTitle
        description: setDescription,
        local: setLocal,
    }

    const handleFieldChange = async (
        field: string,
        value: string,
    ): Promise<{valido: boolean, value: number, erro?: string | Error}> => {
        if (field in setState) {
            setState[field as keyof postStateAndSetters](value);
            const valfield = await validator.valByField(field, value);
            
            if (valfield.valido === false) {
                console.log(valfield.erro);
                return {valido: false, value: 401, erro: valfield.erro}
            }

            console.log("")
            console.log("-----createPostStateController-----");
            console.log(`field: ${field}, value: ${value}`)
            console.log("validação concluída");
            return { valido: true, value: 200 };
        }

        console.error(
            `Campo "${field}" não é uma chave válida em postStateAndSetters.`
        );

        return {valido: false, value: 400, erro: `Campo "${field}" não é uma chave válida em postStateAndSetters.`}
    }

    const handleCreatePost = async (
        //title: string
        description: string,
        local: string,
    ): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> => {
        if (/*title === '' ||*/ description === '') {
            return {valido: false, value: 400, erro: `Preeencha todos os campos para realizar o cadastro.`}
        }
        const uid = GetOnStorage('uid') as string
        setUserID(uid)
        const post: Post = new Post(
            UserID,
            description,
            local
        );
        try {
            console.log(post);
            const req = await postService.createPost(post);
            if (req.valido === false) {
                throw new Error("Bad Request");
            };
            return {valido: true, value: 201, data: post};

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                    return {valido: false, value: 401, erro: error}
                } else if (error.message === "Bad Request") {
                    return {valido: false, value: 400, erro: error}
                }
                return {valido: false, value: 400, erro: error}
            }
            return {valido: false, value: 500, erro: "Internal Server Error"};
        }
    };

    return {
        //title,
        createdAt,
        UserID,
        description,
        postId,
        local,
        status,
        handleFieldChange,
        //handleCheckDescriptionChange,
        handleCreatePost
    };
};

export { createPostStateController }