import axios from "axios"
import { Post } from "../../Service/Entities/postEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"

export class postRepository {
    private endpointposts: string
    private endpointpost: string
    private endpointest: string
    private endpointests: string
    private endpointusers: string

    constructor() {        
        // this.endpointposts = "https://special-couscous-g97g6xgv4jxh9w97-3000.app.github.dev//posts"
        this.endpointposts = "https://boopeepapir.onrender.com/posts"
        this.endpointpost = "https://boopeepapir.onrender.com/post"
        this.endpointest = "http://localhost:3000/post"
        this.endpointests = "http://localhost:3000/posts"
        this.endpointusers = "https://boopeepapir.onrender.com/users"
    };

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
            const resp = await axios.get(this.endpointposts, {
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

    // ------------------------------------------------------------------------------------ //

    async getUsers(): Promise<IReturnAdapter> {
        try {
            console.log("getUsers foi chamado!")
            const resp = await axios.get(this.endpointusers, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    "Access-Control-Allow-Methods": "GET",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })

            if (resp.status !== 200) {
                console.log('getUsers respondeu com ERRO!')
                throw new Error(resp.statusText)
            };
            console.log('getUsers respondeu com SUCESSO!');
            return { val: true, data: resp.data as Post[] };
        } catch (error) {
            if (error instanceof Error) {
                return { val: false, erro: error.message }
            };
            return { val: false, erro: 'Internal Server Error' };
        }
    }

    // ------------------------------------------------------------------------------------ //

    async getPostFromUser(param: string): Promise<{ 
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[] 
    }> {        
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
                    UserID: String(param)
                }
            });

            console.log(`resp: ${resp}`)

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

    //------------------------------------------------------------------

    async getSpecificPost(param: string): Promise<{
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[]
    }> {                
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

    //------------------------------------------------------------------

    async createPost(
        post: Post
    ): Promise<{
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[]}> {
        try {
            console.log("createPost foi chamado!");
            const sendPost = {
                UserID: post.UserID,
                description: post.description,
                local: post.local,
                status: post.status
                
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
    async deletePost(postID: string) {
        try {
            const resp = await axios.delete(this.endpointpost, {
                params: {
                    postID: postID
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

    async updatePost(postID: string | undefined, fieldToUpdate: string, newValue: string): Promise<IReturnAdapter> {
        const updateData = {
            postID: postID,
            fieldToUpdate: fieldToUpdate,
            newValue: newValue
        }
        try {
            console.log("updatePost foi chamado!")
            const resp = await axios.put(this.endpointpost, updateData, {
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
