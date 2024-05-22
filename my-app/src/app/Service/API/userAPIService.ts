class userServices {
    fetchUsers = async () => {
        const response = await fetch('https://boopeepapir.onrender.com/users')
        return response.json();
    }
}

export default userServices;