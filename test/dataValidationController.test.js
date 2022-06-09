/**
* @jest-environment jsdom
*/

const { JestEnvironment } = require('@jest/environment');
const fs = require('fs'); 
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../mainpage_changes.html'), 'utf8'); //get the html
let app; //placehodler var for the .js file


describe('Toms crappy test*name of the suite', ()=> {
    
    beforeEach(()=>{
        document.documentElement.innerHTML = html.toString();
        app=require("../dataValidationController")
    })
    
    test('calling setup func and set attributes', () => {
        app.SetUpDataVal()
        expect(document.querySelector('#label_issue_habitname').hasAttribute("style")).toBe(true)   //coverage doesn't count 
        expect(document.querySelector('#firstaddhabit').hasAttribute("style")).toBe(true)   //coverage doesn't count
        expect(app.SetUpDataVal()).toBeTruthy()  //coverage counts
    })

    test('allow because string is the right length', () => {

        const form_HabitName = document.getElementById ("habitName")
        form_HabitName.value = "go running"
        expect(app.checkHabitNameField()).toBe(true)  //coverage counts
    })

    test('dont allow because string is too short', () => {

        const form_HabitName = document.getElementById ("habitName")
        form_HabitName.value = "go"
        expect(app.checkHabitNameField()).toBe(false)  //coverage counts
    })

    test('dont allow string of only spaces in habit name', () => {

        const form_HabitName = document.getElementById ("habitName")
        form_HabitName.value = "     "
        expect(app.checkHabitNameField()).toBe(false)  //coverage counts
    })

    test('dont allow empty string in habit name', () => {
        const form_HabitName = document.getElementById ("habitName")
        form_HabitName.value.length = 0
        expect(app.checkHabitNameField()).toBe(false)  //coverage counts
    })

    test('dont allow 0 as an amount', () => {
        const form_AddAmount = document.getElementById ("amount")
        form_AddAmount.value = 0
        expect(app.checkAmountField()).toBe(false)  //coverage counts
    })

    test('dont allow over 99 as an amount', () => {
        const form_AddAmount = document.getElementById ("amount")
        form_AddAmount.value = 101
        expect(app.checkAmountField()).toBe(false)  //coverage counts
    })

    test('allows a valid amount num', () => {
        const form_AddAmount = document.getElementById ("amount")
        form_AddAmount.value = 32
        expect(app.checkAmountField()).toBe(true)  //coverage counts
    })

    test('fields are not correct, button disabled', () => {
        app.CheckFormData()
        expect(document.getElementById ("addHabitBtn","").style.background).toBe("gray")  //btn turned off and greyed out
    })

    test('fields are correct, button enabled', () => {
        //set valid habit name
        const form_HabitName = document.getElementById ("habitName")
        form_HabitName.value = "go running"

        //set valid frequency
        document.querySelector('#frequency').value="Daily"

        //set valid amount
        const form_AddAmount = document.getElementById ("amount")
        form_AddAmount.value = 32

        app.CheckFormData()
        expect(document.getElementById ("addHabitBtn","").style.background).toBe("rgb(0, 147, 171)")  //btn turned off and greyed out
    })
   
  });






























    


