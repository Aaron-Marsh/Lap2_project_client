(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//These are the contraints on the modal popup form

///////////////////////////////////////////////////
//set up vars:
///////////////////////////////////////////////////

//Character Contraints -VALUES
const maxLen_HabbitName = 10
const minLen_HabbitName = 2

const minLen_addAmount = 1  //min = 0
const maxLen_addAmount = 2  //max = 99


//HTML Elements
const form_HabbitName = document.getElementById ("habitName")
const form_AddAmount = document.getElementById ("amount")

const issue_HabbitName = document.getElementById ("label_issue_habitname")
const issue_Amount = document.getElementById ("label_issue_amount")


const btn_AddHabit = document.getElementById ("addHabitBtn","")

btn_AddHabit.setAttribute("disabled","");
btn_AddHabit.style.background="gray"

// issue_HabbitName.style.display="none"
issue_HabbitName.style.color="red"
issue_HabbitName.style.visibility="hidden"

issue_Amount.style.color="red"
issue_Amount.style.visibility="hidden"


///////////////////////////////////////////////////
//HTML contraints
///////////////////////////////////////////////////


//HABIT NAME - contraints
form_HabbitName.setAttribute("maxlength", maxLen_HabbitName);

//AMOUNT range limit
// form_AddAmount.setAttribute("max", "2");
// ="10" min="1" required


console.log(document.querySelector('#frequency').value)

async function entered() {
    checkHabitNameField()
    checkAmountField()
    
    if (checkAmountField()===true && checkHabitNameField() && document.querySelector('#frequency').value !== 'Frequency') {
        
        console.log("BUTTON ON!")
        btn_AddHabit.removeAttribute("disabled","");
        btn_AddHabit.style.background="#0093AB"

    }
    else {
        console.log("BUTTON off")
        btn_AddHabit.setAttribute("disabled","");
        btn_AddHabit.style.background="gray"
    }
}




function checkHabitNameField() { 
    console.log("CHECKING THIS") 
    if (form_HabbitName.value.length === 0 ){
        form_HabbitName.style.background="white"
         console.log ("habit name is empty again")
         issue_HabbitName.style.visibility="hidden"

         return false
    }
    else if (form_HabbitName.value.length <= 2) {
        console.log("name's too short,", form_HabbitName.value)
        // form_HabbitName.style.background="red"
        form_HabbitName.style.color="red"
        // form_HabbitName.classList.add("border-danger")
        issue_HabbitName.style.visibility="visible"
        
        return false
    }
    if (form_HabbitName.value.length >= 3) {
        console.log("name's too short,", form_HabbitName.value)
        form_HabbitName.style.color="black"
        issue_HabbitName.style.visibility="hidden"
        return true
    }    
}

function checkAmountField (){
    
    let checkAmount = form_AddAmount.value
    
    console.log("form_AddAmount.value", form_AddAmount.value)
    if (form_AddAmount.value.length === 0 ){
    //    form_AddAmount.style.background="white"
        form_AddAmount.style.color="black"
        issue_Amount.style.visibility="hidden"
        console.log ("AMOUNT is empty again")
        return false
    }
    else if (checkAmount > 99  || checkAmount <= "0"  ) {
        // form_AddAmount.style.background="red"
        console.log("AMOUNT too high or too low!")
        form_AddAmount.style.color="red"
        issue_Amount.style.visibility="visible"
        return false
    }
    else{
        // form_AddAmount.style.background="white"
        form_AddAmount.style.color="black"
        console.log ("AMOUNT is valid")
        issue_Amount.style.visibility="hidden"
        return true
    }
}

module.exports = {entered, checkHabitNameField, checkAmountField}
},{}],2:[function(require,module,exports){
// This part of JS contains functions to render the page content

// We have to decide with Billie if we want to do this creating elements and looping through them in JS or if we want to use EJS and work from the HTML. 
const {fetchGetHabitsByUser,fetchDeleteHabit,fetchCreateHabit,fetchPatchHabit,fetchCreateUser, fetchLogin} = require('./fetchFunctions')

const {entered, checkHabitNameField, checkAmountField} = require('../../dataValidationController')

const hexCompletedColour = '#8FD694'

const divToAppend = document.querySelector('#divToAppend')

//////////////////////////////////////////////////////////////////
// In here we can actually pass other parameters so to feed the main button event listener when it refers to the modal!!
//////////////////////////////////////////////////////////////////

function createDivHabit(habitText, habitID, goalStreakText, currentN, goalN, frequencyText){
    //Target div to append and remove content

    let variable = ''

    switch (frequencyText) {
        case 'Daily':
            variable = ' btn-danger'
            break;

        case 'Weekly':
            variable = ' btn-success'
            break;
    
        default:
            variable = ' btn-info'
            break;
    }

    const fields = [
        {tag: 'button', value: '-',attributes: {type: 'button', style:'font-size: 25px;', class: 'btn text-white mt-3 border-0 shadow-none' + variable}},
        {tag: 'button', value: `${habitText} ${currentN}/${goalN}`, attributes: {type: 'button', style:'font-size: 25px;', class: 'btn text-white mt-3 border-0 w-100 shadow-none' + variable, 'data-toggle': "modal", 'data-target': "#trackHabit"}},
        {tag: 'button', value: '+', attributes: {type: 'button', style:'font-size: 25px;', class: 'btn text-white mt-3 border-0 shadow-none' + variable}},
    ]

    //declare main div here 
    const mainDiv = document.createElement('div')
    mainDiv.className = 'btn-group'

    fields.forEach(f =>{
        let field = document.createElement(f.tag)
        Object.entries(f.attributes).forEach(([a, v])=>{
            field.setAttribute(a, v)

             //event listener

            mainDiv.appendChild(field)
        })



        field.textContent = f.value
    
        // switch statement to add event listener based on f.value
        switch(f.value){
            case '-':
                if(currentN == 0 || currentN == goalN){
                    field.setAttribute('disabled', '')
                }
                field.addEventListener('click', e=>{

                    if(currentN == 0 || currentN == goalN){
                        field.setAttribute('disabled', '')
                    }else{
                        minusClicked(e, habitID)
                        currentN -= 1
                        field.nextElementSibling.textContent = `${habitText} ${currentN}/${goalN}`
                    }

                })
                break;
            case '+':
                if(currentN == goalN){
                    field.setAttribute('disabled', '')
                }
                field.addEventListener('click', e=>{
                    
                    if(currentN == goalN -1 ){
                        field.setAttribute('disabled', '')
                        field.parentNode.firstChild.setAttribute('disabled', '')
                        goalStreakText += 1
                        plusClicked(e, habitID)
                        currentN += 1

                        field.previousElementSibling.style.background = hexCompletedColour

                        field.previousElementSibling.textContent = `${habitText} ${currentN}/${goalN}`

                    } 
                    else{
                        plusClicked(e, habitID)
                        currentN += 1
                        field.previousElementSibling.textContent = `${habitText} ${currentN}/${goalN}`
                    }
                    
                    if(currentN != 0 && currentN != goalN){
                        field.parentNode.firstChild.removeAttribute('disabled')
                    }
                    
                    
                })
                break;
            default:
                if(currentN == goalN){
                    field.style.background = hexCompletedColour
                }   


                field.addEventListener('click', e=>{
                    // In here you can pass way more stuff so to do it once 

                    mainClicked(e, habitID, goalStreakText, currentN, goalN)
                })
        } 
    })

    divToAppend.appendChild(mainDiv)

}

// let goalStreakText = 'this is changed now '+ habitID
// let currentN = 3
// let goalN = 5


function minusClicked(e, habitID){
    e.preventDefault()

    fetchPatchHabit(habitID, -1)

    console.log('minus was clicked with habit id: ' + habitID)
}

function plusClicked(e, habitID){
    e.preventDefault()

    fetchPatchHabit(habitID, 1)

    console.log('plus was clicked with habit id: ' + habitID)
}


function mainClicked(e, habitID, goalStreakText,currentN, goalN){
    e.preventDefault()
    modalUpdate(habitID, goalStreakText, currentN, goalN)
    console.log('main was clicked with habit id: ' + habitID)
}



///////////////////////////////////////////////////////////
// MODAL STUFF

const streakText = document.querySelector('#streakText')
const goalText = document.querySelector('#goalText')
const deleteHabitBtn = document.querySelector('#deleteHabit')


const addHabitBtn = document.querySelector('#addHabitBtn')


// This is the event listener for the delete button which retrieves the local storage for the current habitId and calls delete habit which has a fetch function
deleteHabitBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let habitID = localStorage.getItem('habitId')

    fetchDeleteHabit(habitID).then((d)=>{
        refreshPage()
    })
    
})

addHabitBtn.addEventListener('click', (e)=>{
    e.preventDefault()


    const habitName = document.querySelector('#habitName').value

    document.querySelector('#habitName').value = ''

    const frequency = document.querySelector('#frequency').value
    document.querySelector('#frequency').value = 'Frequency'

    const amount = document.querySelector('#amount').value
    document.querySelector('#amount').value = ''

    let today = new Date;
    let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    
    if(habitName == '' || amount == '' || frequency == 'Frequency'){
        alert('All fields required')
    }else{   
        addHabit(habitName, frequency, amount, currentdate)
    }



    // console.log(e.params.habitName, e.params.frequency, e.params.amount)

    //We have to pass the form data in here 
})


async function addHabit(habitName, frequency, goal, date){

    //Fetch function to add habit
    let userId = localStorage.getItem('userid')


    // userId = '629f5436dd2d086bd7dd757e'



    await fetchCreateHabit(habitName, frequency, goal, date, userId)

    refreshPage()
}


//Called every time an habit button is pressed, changes the text in the modal popup and sets the habitID variable in localstorage for the delete button
function modalUpdate(habitID, goalStreakText, currentN, goalN){
    console.log('modal update was called')
    streakText.textContent = goalStreakText
    goalText.textContent = `Today you have tracked ${currentN} out of your goal ${goalN}`

    localStorage.setItem('habitId', habitID)

    //call 
}





const spinLoad = document.querySelector('#spinLoad')


function refreshPage(){

    spinLoad.style.display = 'inline-block'

    divToAppend.innerHTML = ''

    // get user id from local storage
    let userId = localStorage.getItem('userid')
    
    // userId = '629f5436dd2d086bd7dd757e'

    //fetch request to the server
    const data = fetchGetHabitsByUser(userId)

    

    
    
    data.then((d)=>{
     
        // console.log("this is very important to knowwwwww "+ p)


        if(d.habits.length > 0){
            // const newHabits = orderArray(d.habits)

            // newHabits.forEach((o)=>{
            createDivHabit(o.title, o.id, o.streak, o.current, o.goal, o.frequency)
        // }
        }else{
            alert('You have no habits, add a habit!')
        }
        
        spinLoad.style.display = 'none'
    })



}



function orderArray(array){

    let newArray = []

    array.forEach(e => {
        if(e.frequency == 'Daily'){ //e.frequency
            newArray.push(e)
        }
    });

    array.forEach(e => {
        if(e.frequency == 'Weekly'){ //e.frequency
            newArray.push(e)
        }
    });

    array.forEach(e => {
        if(e.frequency == 'Monthly'){ //e.frequency
            newArray.push(e)
        }
    });

    return newArray

}



/////////////////////////////////////////////////
/// Logout 

const logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click', ()=>{

    localStorage.clear()

    //Jump to other HTML
    //////// Instead of jumping to other HTML it changes the location hash which renders the login page again
    window.open('../../index.html', '_self')
})



refreshPage()

module.exports = {createDivHabit, minusClicked, plusClicked, mainClicked, addHabit, modalUpdate, refreshPage, orderArray}
},{"../../dataValidationController":1,"./fetchFunctions":3}],3:[function(require,module,exports){

const heroku_url = 'https://glacial-plains-13166.herokuapp.com'

async function fetchGetHabitsByUser(userId){
    try{
        let url = `${heroku_url}/habits/user/${userId}`
        const response = await fetch(url)
        const data = await response.json()
        return data

    }catch(err){
        return({message: err.message})
    }
}

// const dataAaron = fetchGetHabitsByUser('Aaron')

// dataAaron.then((d)=>{
//     console.log(d)
// })





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

module.exports = {fetchGetHabitsByUser,fetchDeleteHabit,fetchCreateHabit,fetchPatchHabit, fetchCreateUser,fetchLogin}
},{}]},{},[2]);
