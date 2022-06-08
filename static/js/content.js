// This part of JS contains functions to render the page content

// We have to decide with Billie if we want to do this creating elements and looping through them in JS or if we want to use EJS and work from the HTML. 



const divToAppend = document.querySelector('#divToAppend')

//////////////////////////////////////////////////////////////////
// In here we can actually pass other parameters so to feed the main button event listener when it refers to the modal!!
//////////////////////////////////////////////////////////////////

function createDivHabit(habitText, habitID, goalStreakText, currentN, goalN, frequencyText){
    //Target div to append and remove content

    let variable = ''

    switch (frequencyText) {
        case 'Daily':
            variable = ' btn-success'
            break;

        case 'Weekly':
            variable = ' btn-info'
            break;
    
        default:
            variable = ' btn-primary'
            break;
    }

    const fields = [
        {tag: 'button', value: '-',attributes: {type: 'button', style:'font-size: 25px;', class: 'btn text-white mt-3 border-0 shadow-none' + variable}},
        {tag: 'button', value: habitText, attributes: {type: 'button', style:'font-size: 25px;', class: 'btn text-white mt-3 border-0 w-100 shadow-none' + variable, 'data-toggle': "modal", 'data-target': "#trackHabit"}},
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
                field.addEventListener('click', e=>{

                    if(currentN == 0 || currentN == goalN){
                        field.setAttribute('disabled', '')
                    }else{
                        minusClicked(e, habitID)
                        currentN -= 1
                    }

                })
                break;
            case '+':
                field.addEventListener('click', e=>{
                    
                    if(currentN == goalN){
                        field.setAttribute('disabled', '')
                        goalStreakText += 1
                    } 
                    else{
                        plusClicked(e, habitID)
                        currentN += 1
                    }
                    
                    if(currentN != 0 && currentN != goalN){
                        field.parentNode.firstChild.removeAttribute('disabled')
                    }       
                    
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


        if(d.habits.length > 0){
            const newHabits = orderArray(d.habits)

            newHabits.forEach((o)=>{
            console.log(o)
            createDivHabit(o.title, o.id, o.streak, o.current, o.goal, o.frequency)
        })
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

