// This part of JS contains functions to render the page content

// We have to decide with Billie if we want to do this creating elements and looping through them in JS or if we want to use EJS and work from the HTML. 



const divToAppend = document.querySelector('#divToAppend')

//////////////////////////////////////////////////////////////////
// In here we can actually pass other parameters so to feed the main button event listener when it refers to the modal!!
//////////////////////////////////////////////////////////////////

function createDivHabit(habitText, habitID, goalStreakText, currentN, goalN){
    const fields = [
        {tag: 'button', value: '-',attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0'}},
        {tag: 'button', value: habitText, attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0 w-100', 'data-toggle': "modal", 'data-target': "#trackHabit"}},
        {tag: 'button', value: '+', attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0'}},
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
                field.addEventListener('click', e=>{
                    minusClicked(e, habitID)
                })
                break;
            case '+':
                field.addEventListener('click', e=>{
                    plusClicked(e, habitID)
                })
                break;
            default:
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

    fetchDeleteHabit(habitID)
})

addHabitBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const habitName = document.querySelector('#habitName').value
    document.querySelector('#habitName').value = ''

    const frequency = document.querySelector('#frequency').value
    document.querySelector('#frequency').value = ''

    const amount = document.querySelector('#amount').value
    document.querySelector('#amount').value = ''

    let today = new Date;
    let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
    
    addHabit(habitName, frequency, amount, currentdate)
    // console.log(e.params.habitName, e.params.frequency, e.params.amount)

    //We have to pass the form data in here 
})


function addHabit(habitName, frequency, goal, date){

    //Fetch function to add habit
    const userId = localStorage.getItem('userid')
    fetchCreateHabit(habitName, frequency, goal, date, userId)

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








function refreshPage(){
    // get user id from local storage
    let userId = localStorage.getItem('userid')
    userId = 'Billie'

    //fetch request to the server
    const data = fetchGetHabitsByUser(userId)

    data.then((d)=>{
        d.habits.forEach((o)=>{
            createDivHabit(o.title, o.id, o.frequency, o.current, o.goal)
        })
    })
    

    console.log('the page was refreshed')
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


createDivHabit('this is some sample text', 'ID 1')
createDivHabit('this is ', 'ID 2')
createDivHabit('this is some sample text', 'ID 3')

refreshPage()
