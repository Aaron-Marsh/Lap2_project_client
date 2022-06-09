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
}
SetUpDataVal()

//this func: 
//   -checks the data in the 'add habit' form when a value is changed or added to the form
//   - if conditions met, submit btn is then turned off 
async function CheckFormData() {
    const btn_AddHabit = document.getElementById ("addHabitBtn","")
    const issue_HabitName = document.getElementById ("label_issue_habitname")
    const issue_Amount = document.getElementById ("label_issue_amount")
    const form_AddAmount = document.getElementById ("amount")
    checkHabitNameField()
    checkAmountField()
    
    //if all fields are ok, turn on/off submit btn 
    if (checkAmountField()===true && checkHabitNameField() && document.querySelector('#frequency').value !== 'Frequency') {
        btn_AddHabit.removeAttribute("disabled","");
        btn_AddHabit.style.background="#0093AB"
    }
    else {
        btn_AddHabit.setAttribute("disabled","");
        btn_AddHabit.style.background="gray"
    }

    function checkHabitNameField() { 
        const minLen_HabitName = 2
        const form_HabitName = document.getElementById ("habitName")

        //check if nothing is in the field - remove warning text
        if (form_HabitName.value.length === 0 ){
            form_HabitName.style.background="white"
             issue_HabitName.style.visibility="hidden"
             return false
        }
        //check if the field is too short- show warning text
        else if (form_HabitName.value.length <= minLen_HabitName) {
            form_HabitName.style.color="red"
            issue_HabitName.style.visibility="visible"
            return false
        }
        //check if field value is long enough- remove warning text
        if (form_HabitName.value.length > minLen_HabitName) {
            form_HabitName.style.color="black"
            issue_HabitName.style.visibility="hidden"
            return true
        }    
    }
    
    function checkAmountField (){
        let checkAmount = form_AddAmount.value
        //check if the field is empty- remove warning text
        if (form_AddAmount.value.length === 0 ){
            form_AddAmount.style.color="black"
            issue_Amount.style.visibility="hidden"
            return false
        }
        //check if amount field is the wrong num - show warning text
        else if (checkAmount > 99  || checkAmount <= "0"  ) {
            form_AddAmount.style.color="red"
            issue_Amount.style.visibility="visible"
            return false
        }
        //check if the field is ok, remove warning text
        else{
            form_AddAmount.style.color="black"
            issue_Amount.style.visibility="hidden"
            return true
        }
    }
}