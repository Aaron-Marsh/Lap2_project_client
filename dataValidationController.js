// //concat.js
// function concat(x, y) {
//     return x + y;
//    }

//DATA VALIDATION FOR THE 'ADD HABIT POPUP'
async function SetUpDataVal() {

    //set the text for invaild inputs 
    const issue_HabitName = document.getElementById ("label_issue_habitname")
    const issue_Amount = document.getElementById ("label_issue_amount")
    
    issue_HabitName.style.color="red"
    issue_HabitName.style.visibility="hidden"
    issue_Amount.style.color="red"
    issue_Amount.style.visibility="hidden"

    //set the habit name character limit
    const maxLen_HabitName = 20
    const form_HabitName = document.getElementById ("habitName")
    form_HabitName.setAttribute("maxlength", maxLen_HabitName);
 
    //turn off 'Add habit btn'
    const btn_AddHabit = document.getElementById ("addHabitBtn","")
    btn_AddHabit.setAttribute("disabled","");
    btn_AddHabit.style.background="gray"
    return false
}
SetUpDataVal()

//this func: 
//   -checks the data in the 'add habit' form when a value is changed or added to the form
//   - if conditions met, submit btn is then turned off 
async function CheckFormData() {
    console.log("main func called")
    checkHabitNameField()
    checkAmountField()

    const btn_AddHabit = document.getElementById ("addHabitBtn","")
    
    //if all fields are ok, turn on/off submit btn 
    if (checkAmountField()===true && checkHabitNameField() && document.querySelector('#frequency').value !== 'Frequency') {
        btn_AddHabit.removeAttribute("disabled","");
        btn_AddHabit.style.background="#0093AB"
        return true
    }
    else {
        btn_AddHabit.setAttribute("disabled","");
        btn_AddHabit.style.background="gray"
        return false
    }
}

function checkHabitNameField() {
    console.log("2nd func called") 
    const minLen_HabitName = 2
    const form_HabitName = document.getElementById ("habitName")
    const issue_HabitName = document.getElementById ("label_issue_habitname")
    issue_HabitName.style.visibility="hidden"

    // //check if nothing is in the field - remove warning text
    //check if the field is too short- show warning text
    if (form_HabitName.value.length <= minLen_HabitName && form_HabitName.value.length > 0 || form_HabitName.value.trim().length === 0 ) {
        form_HabitName.style.color="red"
        issue_HabitName.style.visibility="visible"
        return false
    }
    else{
        form_HabitName.style.color="black"
        issue_HabitName.style.visibility="hidden"
        // if (form_HabitName.value.length === 0) {
        //    return false
        // }
        return true
    }  
}

function checkAmountField (){
    const issue_Amount = document.getElementById ("label_issue_amount")
    const form_AddAmount = document.getElementById ("amount")
    let checkAmount = form_AddAmount.value
    issue_Amount.style.visibility="hidden"

    //check if the field is empty- remove warning text
    if (checkAmount > 99  || checkAmount <= "0" && checkAmount.length !==0  ) {
            form_AddAmount.style.color="red"
            issue_Amount.style.visibility="visible"
            return false
    }
    else {
        form_AddAmount.style.color="black"
        issue_Amount.style.visibility="hidden"
        if (form_AddAmount.value.length === 0) {
            return false
         }
        return true
    }
}




module.exports = {checkAmountField,checkHabitNameField,CheckFormData,SetUpDataVal}
