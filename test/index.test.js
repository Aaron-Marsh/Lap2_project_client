const renderDOM = require('./helpers')
//before describe
let dom
let document

//inside describe, replace beforeEach()
beforeEach(async ()=>{
	dom = await renderDOM('mainpage_changes.html')
	document = await dom.window.document
})


it('displays "morning" when button is clicked', ()=>{
	const btn = document.querySelector('button')
	//Click button and check content after

	//have the DOM create the new Event
	btn.dispatchEvent(new dom.window.Event('click'))

	const h1 = document.querySelector('h1')
	expect(h1.innerHTML).toContain('Rabbit')

})


//other example
it('adds the input value to the h1', ()=>{
	const form = document.querySelector('form')
	const h1 = document.querySelector('h1')

	const input = document.querySelector('#name')
	input.value = 'baby yoda'

	//Send event
	form.dispatchEvent(new dom.window.Event('submit'))

	expect(h1.innerHTML).toBe(input.value)

})


// it('Test click event', () => {
//     const mockCallBack = jest.fn();
//     const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
//     button.find('button').simulate('click');
//     expect(mockCallBack.mock.calls.length).toEqual(1); // check if it has been called once
//   });






///////////////NEW TESTS:

//check the heading is Rabbit Habit!
it('heading is correct', ()=>{
	const h1 = document.querySelector('h1')
	expect(h1.innerHTML).toBe("Rabbit Habits!")
})

//check the title is correct
it('title is correct', ()=>{
	const title = document.querySelector('title')
	expect(title.innerHTML).toBe("Rabbit Habits")
})
 
//////////////////// NOT WORKING
//check the favicon is correct
it('NOT WORKING:favicon script is not blank', ()=>{
	const favicon = document.querySelector('head')
	expect(favicon).toContain('<link rel="icon" type="image/x-icon" href="imgs\favicon.ico">')
})

///////////////////check the logo NOT WORKING
it('NOT WORKING: logo is correct', ()=>{
	const logo = document.querySelector('rabbit_logo')
	console.log(logo)
	expect(logo.src).toBeMatch('./imgs/logo.png')
})


//BUTTON.type =btn
it ('buttons types are button', ()=>{
const button = document.querySelector("button")
expect(button.type).toBe("button")
})


