async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST', // Not sure this is a post, maybe more a GET... double check with Aaron
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target))) //Double check that this object is actually fine with backend (main thing is check together with Billie that all the 'name' attributes of the form data matches w backend parameters)
        }
        const r = await fetch(`http://localhost:3000/auth/login`, options) // Login endpoint needs to be checked
        const data = await r.json()
        if (data.err){ throw Error(data.err); }
        login(data);
    } catch (err) {
        console.warn(`Error: ${err}`);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target))) // same as before, doublecheck w backend
        }
        const r = await fetch(`http://localhost:3000/auth/register`, options) // endpoint needs to be checked 
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}

function login(data){
    localStorage.setItem('username', data.user);
    location.hash = '#feed'; // this would be mainpage once everything is linked
}

function logout(){
    localStorage.clear();
    location.hash = '#login';
}

function currentUser(){
    const username = localStorage.getItem('username')
    return username;
}
