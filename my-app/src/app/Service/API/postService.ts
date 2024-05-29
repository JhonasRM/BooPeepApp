import axios from "axios"
import { Post } from "../Entities/postEntities"

export class postServices {
    private endpointpost: string

    constructor() {        
        this.endpointpost = "https://boopeepapir.onrender.com/posts"
    };

    //------------------------------------------------------------------

    async getPosts(): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post[] }> {
        // const Posts = {
        //     createdAt: post.createdAt,
        //     UserID: post.UserID,
        //     description: post.description,
        //     postId: post.postId,
        //     local: post.local,
        //     status: post.status,
        // };

        try {
            console.log("getPosts foi chamado!");
            const resp = await axios.get(this.endpointpost, {
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
            return { valido: true, value: 200, data: resp.data as Post[] };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message }
            };
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        };
    };

    //------------------------------------------------------------------

    async getPostFromUser(post: Post): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post }> {
        const Posts = {
            createdAt: post.createdAt,
            UserID: post.UserID,
            description: post.description,
            postId: post.postId,
            local: post.local,
            status: post.status,
        };
        
        try {
            console.log("getPostFromUser for chamado!");
            const resp = await axios.get(this.endpointpost, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                params: {
                    UserID: post.UserID
                }
            });

            if (resp.status !== 201) {
                console.log('getPostFromUser respondeu com ERRO!');
                throw new Error(resp.statusText);
            };
            console.log('getPostFromUser respondeu com SUCESSO!');
            return { valido: true, value: 200, data: resp.data };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message };
            };
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        }
    }

    //------------------------------------------------------------------

    async getSpecificPost(post: Post): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> {        
        const Posts = {
            createdAt: post.createdAt,
            UserID: post.UserID,
            description: post.description,
            postId: post.postId,
            local: post.local,
            status: post.status,
        };
        
        try {
            console.log("getSpecificPost foi chamado!");
            const resp = await axios.get(this.endpointpost, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                params: {
                    postId: post.postId
                }
            });

            if (resp.status !== 201) {
                console.log('getSpecificPost respondeu com ERRO!');
                throw new Error(resp.statusText);
            };
            console.log('getSpecificPost respondeu com SUCESSO!');
            return { valido: true, value: 200, data: resp.data };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message };
            };
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        };
    };

    //------------------------------------------------------------------

    async createPost(
        post: Post 
    ): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> {
        try {
            console.log("createPost foi chamado!");
            const sendPost = {
                //title: title
                createdAt: post.createdAt,
                //UserID: UserID,
                description: post.description,
                //postId: postId,
                local: post.local,
                status: post.status,
            };
            const resp = await axios.post(this.endpointpost, sendPost, {
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
            return {valido: true, value: 200, data: resp.data};

        } catch (error) {
            if (error instanceof Error) {
                return {valido: false, value: 400, erro: error.message};
            };
            return {valido: false, value: 500, erro: 'Internal Server Error'};
        };
    }

    //------------------------------------------------------------------
    //Melhor ver isso com o Jonathan:
    async deletePost(post: Post): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> {
        try {
            console.log("deletePost for chamado!");
            const resp = await axios.delete(this.endpointpost, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                //Lembre-se, DELETE/UPDATE tem que ter WHERE se não a vaca vai pro brejo
                params: {
                    postId: post.postId
                }
            });

            if (resp.status !== 201) {
                console.log('deletePost respondeu com ERRO!');
                throw new Error(resp.statusText);
            }
            console.log('deletePost respondeu com SUCESSO!');
            return { valido: true, value: 200, data: resp.data };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message };
            };
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        };
    };
};


// fetchPosts = async () => {
//     const response = await fetch('https://boopeepapir.onrender.com/posts');
//     if (!response.ok) {
//         throw new Error('Fetch response is not ok!');
//     }
//     return response.json();
// }

// //VERIFICAR A API, ENTÃO VER SE ELE SÓ PEGA OS POSTS DO USUÁRIO
// fetchPostsfromUser = async (UserID: string) => {
//     const response = await fetch(`https://boopeepapir.onrender.com/posts/${UserID}`)
//     if (!response.ok) {
//         throw new Error('Fetch response is not ok!');
//     }
//     return response.json();
// }

// fetchPostsfromPost = async (postId: string) => {
//     const response = await fetch(`https://boopeepapir.onrender.com/posts/${postId}`)
//     if ("response.ok") {
//         throw new Error('Fetch response is not ok!')
//     }
//     return response.json();
// }
