import { SetStateAction, useState } from "react";
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
    const [createdAt, setCreatedAt] = useState(0);
    const [description, setDescription] = useState("");
    const [postId, setPostId] = useState("");
    const [local, setLocal] = useState("ETEC ZONA LESTE");
    const [status, setStatus] = useState(0);
    const [imageUri, setImageUri] = useState<string | null>(null); // Adicionando estado para a imagem

    const validator: postValidator = new postValidator();
    const pRepository: postRepository = new postRepository();

    const setState: postStateAndSetters = {
        description: setDescription,
        local: setLocal,
    };

    const handleFieldChange = async (
        field: string,
        value: string,
    ): Promise<{ valido: boolean, value: number, erro?: string | Error }> => {
        if (field in setState) {
            setState[field as keyof postStateAndSetters](value);
            const valfield = await validator.valByField(field, value);

            if (valfield.valido === false) {
                console.log(valfield.erro);
                return { valido: false, value: 401, erro: valfield.erro };
            }

            console.log("");
            console.log("-----createPostStateController-----");
            console.log(`field: ${field}, value: ${value}`);
            console.log("validação concluída");
            return { valido: true, value: 200 };
        }

        console.error(
            `Campo "${field}" não é uma chave válida em postStateAndSetters.`
        );

        return { valido: false, value: 400, erro: `Campo "${field}" não é uma chave válida em postStateAndSetters.` };
    };

    const handleCreatePost = async (
        UserID: string,
        description: string,
        local: string,
        imageUri?: string, // Adicionando parâmetro para a imagem
    ): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post }> => {
        if (description === '') {
            return { valido: false, value: 400, erro: `Preeencha todos os campos para realizar o cadastro.` };
        }
        const post: Post = new Post(
            UserID,
            description,
            local
        );
        try {
            console.log(post);
            const req = await pRepository.createPost(post, imageUri);
            if (req.valido === false) {
                throw new Error(req.erro as string);
            };
            return { valido: true, value: 201, data: post };

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                    return { valido: false, value: 401, erro: error };
                } else if (error.message === "Bad Request") {
                    return { valido: false, value: 400, erro: error };
                }
                return { valido: false, value: 400, erro: error };
            }
            return { valido: false, value: 500, erro: "Internal Server Error" };
        }
    };

    const UpdatePost = async (updateThis: string, postData: Post): Promise<IReturnAdapter> => {
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
                    if (typedKey === "description") {
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
                    const req = await pRepository.updatePost(updateThis, fieldToUpdate, newValue)
                    
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
        createdAt,
        description,
        postId,
        local,
        status,
        imageUri, // Adicionando o estado da imagem ao retorno
        setImageUri, // Adicionando o setter da imagem ao retorno
        handleFieldChange,
        //handleCheckDescriptionChange,
        handleCreatePost,
        UpdatePost
    };
};

export { createPostStateController };