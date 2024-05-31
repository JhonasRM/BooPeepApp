class postServices {
    fetchPosts = async () => {
        const response = await fetch('https://boopeepapir.onrender.com/posts');
        return response.json();
    }
}

export default postServices