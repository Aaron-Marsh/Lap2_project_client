
const userName = document.querySelector('#exampleInputUsername')
const password = document.querySelector('#exampleInputPassword1')

const loginBtn = document.querySelector('#loginBtn')
const signupBtn = document.querySelector('#signupBtn')


// loginBtn.addEventListener('submit', e=>{requestLogin(e)})

loginBtn.addEventListener('click', e=>{
    e.preventDefault()


    const userData = fetchLogin(userName.value, password.value)

    userData.then((d)=>{
        if(d.username){
            localStorage.setItem('username', d.username)
            localStorage.setItem('userid', d.userId)
            window.open('mainpage_changes.html', '_self')
        }else{
            //Prompt user to register!!!
        }
    })
    
    userName.value = ''
    password.value = ''


    console.log('login clicked')
})



// signupBtn.addEventListener('click', e=>{requestRegistration(e)})

signupBtn.addEventListener('click', e=>{
    e.preventDefault()

    const responseRegistration = fetchCreateUser(userName.value, password.value)

    responseRegistration.then((i)=>{
        console.log(i)
    })

    password.value = ''

    // popup!
})
