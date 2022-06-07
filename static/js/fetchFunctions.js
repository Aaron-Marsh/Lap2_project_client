async function getHabitsByUser(userId){
    try{
        let url = `${heroku_url}/user/${userId}`
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        return data

    }catch(err){
        console.log({message: err.message})
    }
}
