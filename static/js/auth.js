// async function requestLogin(e){
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST', // Not sure this is a post, maybe more a GET... double check with Aaron
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target))) //Double check that this object is actually fine with backend (main thing is check together with Billie that all the 'name' attributes of the form data matches w backend parameters)
//         }
//         const r = await fetch(`http://localhost:3000/auth/login`, options) // Login endpoint needs to be checked
//         const data = await r.json()
//         if (data.err){ throw Error(data.err); }
//         login(data);
//     } catch (err) {
//         console.warn(`Error: ${err}`);
//     }
// }

// async function requestRegistration(e) {
//     e.preventDefault();
//     try {
//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(Object.fromEntries(new FormData(e.target))) // same as before, doublecheck w backend
//         }
//         const r = await fetch(`http://localhost:3000/auth/register`, options) // endpoint needs to be checked 
//         const data = await r.json()
//         if (data.err){ throw Error(data.err) }
//         requestLogin(e);
//     } catch (err) {
//         console.warn(err);
//     }
// }

// function login(data){
//     localStorage.setItem('username', data.user);
//     location.hash = '#feed'; // this would be mainpage once everything is linked
// }

// function logout(){
//     localStorage.clear();
//     location.hash = '#login';
// }

// function currentUser(){
//     const username = localStorage.getItem('username')
//     return username;
// }



async function requestLogin(username, password){
    const userData = {
        email: username,
        password: password
    }
    console.log(userData)
    try {
        const options = {
            method: 'POST', //arguably post
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        };
        fetch('http://localhost:3000/auth/login', options)
        .then(r => r.json())
        .then(data=>{
            login(data)
            console.log('logged in!')

            // Check the server response, if the user is logged in properly - redirect to mainpage.html (change hash?)
        })
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}



function login(data){
    // localStorage.clear() (?)
    localStorage.setItem('username', data.email);
    location.hash = '#mainpage'
}



async function requestRegistration(username, password) {
    const userData = {
        email: username,
        password: password
    }
    console.log(userData)

    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { "Content-Type": "application/json" }
        };
        fetch('http://localhost:3000/auth/register', options)
        .then(r => r.json())
        .then(data=>{

            // !!!! We need to agree with Aaron what type of response is sent by the server (eg. user created, user already present, some type of other error)

            if(data.response){
                //popup to say user successfully created
            }else{
                //popup to say some error has occurred
            }

            // data.email = userData.email;
            // data.password = userData.password;
            console.log('you have registered')
        })
    } catch (err) {
        console.warn(err);
    }

    //This has to return something
}





