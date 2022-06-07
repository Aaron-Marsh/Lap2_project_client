
const heroku_url = 'https://glacial-plains-13166.herokuapp.com'

async function fetchGetHabitsByUser(userId){
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

// const dataAaron = fetchGetHabitsByUser('Aaron')

// console.log(dataAaron)


async function fetchDeleteHabit(habitId){
    try{
        let url = `${heroku_url}/habits/${habitId}`
        const response = await fetch(url, {
            method: 'DELETE', 
        })
        const data = await response.text()
        return 'Habit was deleted'

    }catch(err){
        return({message: err.message})
    }
}

// console.log(fetchDeleteHabit('629f2322f6598ab936693fb3'))







// {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   }
