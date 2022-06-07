
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


async function fetchCreateHabit(title, frequency, goal, date, userId){
    try{
        let url = `${heroku_url}/habits/new`
        const habitData = {
            "title": title,
            "frequency": frequency,
            "goal": goal,
            "startdate": date,
            "userId": userId
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        console.log(data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

// const newHabit = fetchCreateHabit('Different habit from fetch', 'daily', 6, '22-12-10', 'Aaron')

// console.log(newHabit)






async function fetchPatchHabit(habitId, command){
    try{
        let url = `${heroku_url}/habits/${habitId}`
        const habitData = {
            "id": habitId,
            "command": command
        }
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        console.log(data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

// const patchHabit = fetchPatchHabit('629dd294da9aff4209426a5d', -1)

// console.log(patchHabit)



async function fetchCreateUser(username, password){
    try{
        let url = `${heroku_url}/auth/register`
        const habitData = {
            "username": username,
            "password": password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.text()
        console.log(data)
        return data

    }catch(err){
        return({message: err.message})
    }
}

// const newUser = fetchCreateUser('Gio', 'pass')
// console.log(newUser)












//Logs in and sets local storage for userid and username, changes location.hash to mainpage

async function fetchLogin(username, password){
    try{
        let url = `${heroku_url}/auth/login`
        const habitData = {
            "username": username,
            "password": password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(habitData) 
          })
        const data = await response.json()

        console.log(data.userId)

        localStorage.setItem('userid', data.userId);
        localStorage.setItem('username', data.username);

        location.hash = '#mainpage'

        return data

    }catch(err){
        return({message: err.message})
    }
}

// const loginExample = fetchLogin('Gio', 'pass')

// loginExample.then((data)=>{
//     const {username, userId, prevDate} = data
//     console.log( username,userId,prevDate)
// })


// console.log('localstorage=' + localStorage.getItem('userid'))














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
