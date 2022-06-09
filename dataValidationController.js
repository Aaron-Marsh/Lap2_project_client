//These are the contraints on the modal popup form

///////////////////////////////////////////////////
//set up vars:
///////////////////////////////////////////////////

//Character Contraints -VALUES
const minLen_HabitName = 2

const minLen_addAmount = 1  //min = 0
const maxLen_addAmount = 2  //max = 99


//HTML Elements
const form_HabitName = document.getElementById ("habitName")
const form_AddAmount = document.getElementById ("amount")

const issue_HabitName = document.getElementById ("label_issue_habitname")
const issue_Amount = document.getElementById ("label_issue_amount")


const btn_AddHabit = document.getElementById ("addHabitBtn","")

btn_AddHabit.setAttribute("disabled","");
btn_AddHabit.style.background="gray"

issue_HabitName.style.color="red"
issue_HabitName.style.visibility="hidden"

issue_Amount.style.color="red"
issue_Amount.style.visibility="hidden"


///////////////////////////////////////////////////
//HTML contraints
///////////////////////////////////////////////////





function SetUpDataVal() {
    //set the habit name character limit
    const maxLen_HabitName = 20
    form_HabitName.setAttribute("maxlength", maxLen_HabitName);



}
SetUpDataVal()


//this func: 
//   -checks the data in the 'add habit' form when a value is changed or added to the form
//   - if conditions met, submit btn is then turned off 
async function CheckFormData() {
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

    function checkHabitNameField() { 
        if (form_HabitName.value.length === 0 ){
            form_HabitName.style.background="white"
             issue_HabitName.style.visibility="hidden"
    
             return false
        }
        else if (form_HabitName.value.length <= 2) {
            form_HabitName.style.color="red"
            issue_HabitName.style.visibility="visible"
            
            return false
        }
        if (form_HabitName.value.length >= 3) {
            form_HabitName.style.color="black"
            issue_HabitName.style.visibility="hidden"
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
}
