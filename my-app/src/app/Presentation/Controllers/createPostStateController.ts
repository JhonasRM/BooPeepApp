import { SetStateAction, useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator";
import { postRepository } from "../../Data Access/Repository/postRepository";
import { Post } from "../../Service/Entities/postEntities";
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

interface FieldUpdate {
    fieldToUpdate: string;
    NewValue: any;
}

const createPostStateController = () => {
    //const [title, setTitle] = useState("")
    // //const [checkTitle, setCheckTitle] = useState("")
    const [createdAt, setCreatedAt] = useState(0);
    const [description, setDescription] = useState("");
    // const [checkDescription, setCheckDescription] = useState("")
    const [postId, setPostId] = useState("");
    const [local, setLocal] = useState("ETEC ZONA LESTE");
    const [status, setStatus] = useState(0);

    const validator: postValidator = new postValidator();
    const postrepository: postRepository = new postRepository();

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
        //title: string,
        UserID: string,
        description: string,
        local: string,
    ): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> => {
        if (/*title === '' ||*/ description === '') {
            return {valido: false, value: 400, erro: `Preeencha todos os campos para realizar o cadastro.`}
        }
        const post: Post = new Post(
            UserID,
            description,
            local
        );
        try {
            console.log(post);
            const req = await postrepository.createPost(post);
            if (req.valido === false) {
                throw new Error(req.erro as string);
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

    const UpdatePost = async (postData: Post, updateThis: string): Promise<IReturnAdapter> => {
        console.log(`UpdatePost's updateThis: ${updateThis}`)
        try {
            const updatedFields: FieldUpdate[] = [];
            Object.keys(postData).forEach(key => {
                const typedKey = key as keyof Post;
                if (
                    typedKey !== "UserID" && 
                    typedKey !== "createdAt" &&
                    typedKey !== "postId" &&
                    typedKey !== "local" &&
                    postData[typedKey] !== "" && postData[typedKey] !== ""
                ) {
                    if (typedKey === "description" || typedKey === "status") {
                        updatedFields.push({
                            fieldToUpdate: key,
                            NewValue: postData[typedKey]
                        })
                    } else {
                        return
                    }
                }
            });

            updatedFields.forEach(async (updatedInfo) => {
                let fieldToUpdate = updatedInfo.fieldToUpdate
                let newValue = updatedInfo.NewValue

                if (newValue === '' || newValue === ' ') {
                    return
                }

                try {
                    const req = await postrepository.updatePost(updateThis, fieldToUpdate, newValue)
                    
                    if (req.val === false) {
                        throw new Error(req.erro as string);
                    }

                    return
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error('Erro ao atualizar está postagem: ' + error.message);
                    }
                    throw new Error(`Erro interno da aplicação: ${error}`)
                }
            })

            return { val: true, data: 'Postagem alterada com sucesso!'};
        } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error.message }
            }

            return {val: false, erro: "Internal Server Error"};
        }
    }

    return {
        //title,
        createdAt,
        description,
        postId,
        local,
        status,
        handleFieldChange,
        //handleCheckDescriptionChange,
        handleCreatePost,
        UpdatePost
    };
};

export { createPostStateController }