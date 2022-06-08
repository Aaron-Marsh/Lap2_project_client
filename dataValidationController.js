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




async function entered() {
    checkHabitNameField()
    checkAmountField()
    
    if (checkAmountField()===true && checkHabitNameField()) {
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
