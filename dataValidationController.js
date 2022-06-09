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

issue_HabbitName.style.color="red"
issue_HabbitName.style.visibility="hidden"

issue_Amount.style.color="red"
issue_Amount.style.visibility="hidden"


///////////////////////////////////////////////////
//HTML contraints
///////////////////////////////////////////////////

//HABIT NAME - contraints
form_HabbitName.setAttribute("maxlength", maxLen_HabbitName);

async function entered() {
    checkHabitNameField()
    checkAmountField()
    
    if (checkAmountField()===true && checkHabitNameField() && document.querySelector('#frequency').value !== 'Frequency') {
        
        btn_AddHabit.removeAttribute("disabled","");
        btn_AddHabit.style.background="#0093AB"

    }
    else {
        btn_AddHabit.setAttribute("disabled","");
        btn_AddHabit.style.background="gray"
    }
}




function checkHabitNameField() { 
    if (form_HabbitName.value.length === 0 ){
        form_HabbitName.style.background="white"
         issue_HabbitName.style.visibility="hidden"

         return false
    }
    else if (form_HabbitName.value.length <= 2) {
        form_HabbitName.style.color="red"
        issue_HabbitName.style.visibility="visible"
        
        return false
    }
    if (form_HabbitName.value.length >= 3) {
        form_HabbitName.style.color="black"
        issue_HabbitName.style.visibility="hidden"
        return true
    }    
}

function checkAmountField (){
    
    let checkAmount = form_AddAmount.value
    
    if (form_AddAmount.value.length === 0 ){
        form_AddAmount.style.color="black"
        issue_Amount.style.visibility="hidden"
        return false
    }
    else if (checkAmount > 99  || checkAmount <= "0"  ) {
        form_AddAmount.style.color="red"
        issue_Amount.style.visibility="visible"
        return false
    }
    else{
        form_AddAmount.style.color="black"
        issue_Amount.style.visibility="hidden"
        return true
    }
}
