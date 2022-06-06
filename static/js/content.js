// This part of JS contains functions to render the page content

// We have to decide with Billie if we want to do this creating elements and looping through them in JS or if we want to use EJS and work from the HTML. 



const divToAppend = document.querySelector('#divToAppend')

//////////////////////////////////////////////////////////////////
// In here we can actually pass other parameters so to feed the main button event listener when it refers to the modal!!
//////////////////////////////////////////////////////////////////

function createDivHabit(habitText, habitID){
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
                    let goalStreakText = 'this is changed now '+ habitID
                    let currentN = 3
                    let goalN = 5
                    mainClicked(e, habitID, goalStreakText, currentN, goalN)
                })
        }        
    })

    divToAppend.appendChild(mainDiv)

}


createDivHabit('this is some sample text', 'ID 1')
createDivHabit('this is some sample text', 'ID 2')
createDivHabit('this is some sample text', 'ID 3')




function minusClicked(e, habitID){
    e.preventDefault()
    // fetch...
    // send in the request the habitID, letting it know that the - button was clicked so the backend can update this info
    console.log('minus was clicked with habit id: ' + habitID)
}

function plusClicked(e, habitID){
    e.preventDefault()
    console.log('plus was clicked with habit id: ' + habitID)
    //
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


// This is the event listener for the delete button which retrieves the local storage for the current habitId and calls delete habit which has a fetch function
deleteHabitBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let habitID = localStorage.getItem('habitId')
    deleteHabit(habitID)
})



//Called every time an habit button is pressed, changes the text in the modal popup and sets the habitID variable in localstorage for the delete button
function modalUpdate(habitID, goalStreakText, currentN, goalN){
    console.log('modal update was called')
    streakText.textContent = goalStreakText
    goalText.textContent = `Today you have tracked ${currentN} out of your goal ${goalN}`

    localStorage.setItem('habitId', habitID)

    //call 
}


function deleteHabit(habitID){
    // fetch function to delete based on habitID
    
    console.log('habit deleted '+ habitID)
    
}




function addHabit(habitID){


}



