
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
            alert('Incorrect username or password!')
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

    if (userName.value === '' || password.value === '') {
        alert('To create a new account, enter a new username and password then click sign up!')
    } else {

        const responseRegistration = fetchCreateUser(userName.value, password.value)
        
        console.log('Signup clicked')
        
        
        responseRegistration.then((i)=>{
            
            console.log(i)
            
            
            if(i == '{"msg":"Username taken"}'){
                alert('Please choose another username! That one is taken!')
            }else{
                alert('Username registered, please re-insert your password to login!')
            }
        })
        
        password.value = ''
    }
        

    // popup!
})
