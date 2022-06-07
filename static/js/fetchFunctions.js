
const heroku_url = 'https://glacial-plains-13166.herokuapp.com'

async function getHabitsByUser(userId){
    console.log('function is called')
    try{
        let url = `${heroku_url}/habits/user/${userId}`
        const response = await fetch(url)
        const data = await response.text()
        console.log('this is the fetched data ' +data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

const dataAaron = getHabitsByUser('Aaron')

console.log(dataAaron)
