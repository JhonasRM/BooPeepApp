import axios from "axios"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"
import { Coment } from "../../Service/Entities/comentEntities";

export class comentRepository {
    private endpointcoment: string

    constructor() {        
        this.endpointcoment = "https://boopeepapir.onrender.com/coment"
    };

    async getComents(postID: string): Promise<IReturnAdapter> {
        try {
            console.log("getPosts foi chamado!");
            const resp = await axios.get(this.endpointcoment, {
                params: {
                    postID: postID
                },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            console.log('Response from API:');
            console.log(resp.data);

            if (resp.status !== 200) {
                console.log('getPosts respondeu com ERRO!')
                throw new Error(resp.statusText)
            };
            console.log('getPosts respondeu com SUCESSO!');
            return { val: true, data: resp.data as Coment[] };

        } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error.message }
            };
            return { val: false, erro: 'Internal Server Error' };
        };
    };

    async createComent(
        coment: Coment
    ): Promise<IReturnAdapter> {
        try {
            console.log("createPost foi chamado!");
            const sendComent = {
                postID: coment.postID,
                uid: coment.uid,
                text: coment.text
            };
            const resp = await axios.post(this.endpointcoment, sendComent, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            if (resp.status !== 200) {
                console.log("createPost respondeu com ERRO!");
                throw new Error(resp.statusText);
            };

            console.log("createPost respondeu com SUCESSO!");
            console.log(resp.data);
            return {val: true, data: resp.data};

        } catch (error) {
            if (error instanceof Error) {
                return {val: false, erro: error.message};
            };
            return {val: false, erro: 'Internal Server Error'};
        };
    }

    async deletePost(postID: string, comentID: string) {
        try {
            const resp = await axios.delete(this.endpointcoment, {
                params: {
                    postID: postID,
                    comentID: comentID
                },
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })

            if (resp.status !== 200) {
                console.log(`postRepository respondeu com ERRO!`)
                throw new Error(resp.statusText)
            }
            return {val: true, data: resp.data}
        } catch (error) {
            if (error instanceof Error) {
                return {val: false, erro: error.message}
            }
            return { val: false, erro: `Erro interno da aplicação: ${error}` }
        }
    }

    //----------------------------------------------------------------------------------------//

    async updatePost(postID: string, comentID: string, newValue: string ): Promise<IReturnAdapter> {
        const updateData = {
            postID: postID,
            comentID: comentID,
            newValue: newValue
        }
        try {
            console.log("updatePost foi chamado!")
            const resp = await axios.put(this.endpointcoment, updateData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })

            if (resp.status !== 200) {
                console.log('updatePost respondeu com ERRO!')
                throw new Error(resp.statusText)
            }

            console.log('updatePost respondeu com SUCESSO!')
            console.log(resp.data)
            return { val: true, data: resp.data }
        } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error.message }
            }
            
            return { val: false, erro: `Erro interno da aplicação: ${error}` }
        }
    }
};

