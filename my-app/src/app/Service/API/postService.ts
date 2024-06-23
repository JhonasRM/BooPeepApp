import axios from "axios";
import { Post } from "../Entities/postEntities";

export class postServices {
    private endpointposts: string;
    private endpointpost: string;
    private endpointest: string;
    private endpointests: string;

    constructor() {        
        this.endpointposts = "https://special-couscous-g97g6xgv4jxh9w97-3000.app.github.dev//posts"
        this.endpointpost = "https://boopeepapir.onrender.com/post"
        this.endpointest = "https://boopeepapir.onrender.com/post"
        this.endpointests = "https://boopeepapir.onrender.com/posts"

    };

    async getPosts(): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post[] }> {


        try {
            console.log("getPosts foi chamado!");
            const resp = await axios.get(this.endpointests, {
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
                throw new Error(resp.statusText);
            };
            console.log('getPosts respondeu com SUCESSO!');
            return { valido: true, value: 200, data: resp.data as Post[] };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message };
            };
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        };
    };

    async getPostFromUser(param: string): Promise<{ 
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[] 
    }> {        
        try {
            console.log("getPostFromUser foi chamado!");
            const resp = await axios.get(this.endpointest, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                params: {
                    postId: String(param)
                }
            });

            console.log(`resp: ${resp}`);

            if (resp.status !== 200) {
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

    async getSpecificPost(param: string): Promise<{ 
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[]
    }> {                
        try {
            console.log("getSpecificPost foi chamado!");
            const resp = await axios.get(this.endpointest, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                },
                params: {
                    postID: String(param)
                }
            });

            if (resp.status !== 200) {
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

    async createPost(
        post: Post,
        imageUri?: string
    ): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post[] }> {
        try {
            console.log("createPost foi chamado!");

            const formData = new FormData();
            formData.append('UserID', post.UserID);
            formData.append('description', post.description);
            formData.append('local', post.local);
            formData.append('status', post.status);

            if (imageUri) {
                const file = {
                    uri: imageUri,
                    name: imageUri.split('/').pop(),
                    type: 'image/jpeg'
                };
                formData.append('file', file);
            }

            const resp = await axios.post(this.endpointpost, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (resp.status !== 200) {
                console.log("createPost respondeu com ERRO!");
                throw new Error(resp.statusText);
            }

            console.log("createPost respondeu com SUCESSO!");
            console.log(resp.data);
            return { valido: true, value: 200, data: resp.data };

        } catch (error) {
            if (error instanceof Error) {
                return { valido: false, value: 400, erro: error.message };
            }
            return { valido: false, value: 500, erro: 'Internal Server Error' };
        }
    }

    async deletePost(post: Post): Promise<{ valido: boolean, value?: number, erro?: string | Error, data?: Post }> {
        try {
            console.log("deletePost foi chamado!");
            const resp = await axios.delete(this.endpointpost, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                    "Content-Type": "application/json;charset=UTF-8"
                },
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
