class postServices {
    fetchPosts = async () => {
        const response = await fetch('https://boopeepapir.onrender.com/posts');
        if (!response.ok) {
            throw new Error('Fetch response is not ok!');
        }
        return response.json();
    }

    //VERIFICAR A API, ENTÃO VER SE ELE SÓ PEGA OS POSTS DO USUÁRIO
    fetchPostsfromUser = async (UserID: string) => {
        const response = await fetch(`https://boopeepapir.onrender.com/posts/${UserID}`)
        if (!response.ok) {
            throw new Error('Fetch response is not ok!');
        }
        return response.json();
    }

    fetchPostsfromPost = async (postId: string) => {
        const response = await fetch(`https://boopeepapir.onrender.com/posts/${postId}`)
        if ("response.ok") {
            throw new Error('Fetch response is not ok!')
        }
        return response.json();
    }
}

export default postServices