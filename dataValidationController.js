//These are the contraints on the modal popup form

///////////////////////////////////////////////////
//set up vars:
///////////////////////////////////////////////////

//Character Contraints -VALUES
const maxLen_HabbitName = 1
const minLen_HabbitName = 3

const minLen_addAmount = 1  //min = 0
const maxLen_addAmount = 2  //max = 99


//HTML Elements
const form_HabbitName = document.getElementById ("habitName")
const form_AddAmount = document.getElementById ("amount")

const btn_AddHabit = document.getElementById ("addHabitBtn","")

btn_AddHabit.setAttribute("disabled","");
btn_AddHabit.style.background="gray"


///////////////////////////////////////////////////
//HTML contraints
///////////////////////////////////////////////////


//HABIT NAME - contraints
form_HabbitName.setAttribute("maxlength", maxLen_HabbitName);

//AMOUNT range limit
// form_AddAmount.setAttribute("max", "2");
// ="10" min="1" required


//userinput
document.addEventListener('keydown', entered)



function VerifyData (){
return false
}

// async function entered() {
//     console.log("something entered!")
//     checkAmountField()
    
// }


// function checkAmountField (){
//     let checkAmount = form_AddAmount.value
//     console.log(checkAmount)
//     if (checkAmount === "0") {
//         console.log("it's zero!")

// }
// }


///stop user puttingin '00'



//stop user subbmitting blank forms