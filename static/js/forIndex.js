
const userName = document.querySelector('#exampleInputUsername')
const password = document.querySelector('#exampleInputPassword1')

const loginBtn = document.querySelector('#loginBtn')
const signupBtn = document.querySelector('#signupBtn')


// loginBtn.addEventListener('submit', e=>{requestLogin(e)})

loginBtn.addEventListener('click', e=>{
    e.preventDefault()
    requestLogin(userName.value, password.value)
    console.log('login clicked')
})



// signupBtn.addEventListener('click', e=>{requestRegistration(e)})

signupBtn.addEventListener('click', e=>{
    e.preventDefault()
    requestRegistration(userName.value, password.value)
    // popup!
})
