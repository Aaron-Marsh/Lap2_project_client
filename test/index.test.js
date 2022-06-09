const renderDOM = require('./helpers')
//before describe
let dom
let document



//inside describe, replace beforeEach()
beforeEach(async ()=>{
	dom = await renderDOM('mainpage_changes.html')
	document = await dom.window.document
})


// it('displays "morning" when button is clicked', ()=>{
// 	const btn = document.querySelector('button')
// 	//Click button and check content after

// 	//have the DOM create the new Event
// 	btn.dispatchEvent(new dom.window.Event('click'))

// 	const h1 = document.querySelector('h1')
// 	expect(h1.innerHTML).toContain('Rabbit')

// })


//other example
// it('adds the input value to the h1', ()=>{
// 	const form = document.querySelector('form')
// 	const h1 = document.querySelector('h1')

// 	const input = document.querySelector('#name')
// 	input.value = 'baby yoda'

// 	//Send event
// 	form.dispatchEvent(new dom.window.Event('submit'))

// 	expect(h1.innerHTML).toBe(input.value)

// })


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
 
//BUTTON.type =btn
it ('buttons types are button', ()=>{
const button = document.querySelector("button")
expect(button.type).toBe("button")
})

//form  habbit name
it ('form "habbit name" has the correct placeholder', ()=>{
	const form = document.querySelector("#habitName")
	expect(form.placeholder).toBe("Habit name")
})
	
//form frequency
// it ('form "frequency" has the correct placeholder', ()=>{
// 	const form = document.querySelector("#frequency")
// 	expect(form.placeholder).toBe("Frequency")
// })

//form frequency
// it ('form "amount" has the correct placeholder', ()=>{
// 	const form = document.querySelector("#amount")
// 	expect(form.placeholder).toBe("Amount")
// })





///////////////////////////
//broken tests
///////////////////////////

// //broken
// it('"Add habbit" popup btn has "data-toggle="model""', ()=>{
// 	//when clicked check #addHabitBtn  is  linked to  .model  - not sure if possible
// 	const btn = document.querySelector('#addHabitBtn')
// 	btn.dispatchEvent(new dom.window.Event('click'))
// 	// const modal = document.querySelector('model')
// 	// console.log("hhhhOOOOO",modal.classList.value)
// 	//Click button and check content after
// 	//have the DOM create the new Event
// 	expect(btn.classList.value).toContain('data-dismiss="modal"')
// })

// it('"modal" is hidden at start', ()=>{	
// 	const modal1 = document.querySelector('#exampleModalCenter')
// 	// console.log("BBdsdasdasdasdasBOOOOOO",modal1.classList.value)
// 	// console.log("BBdsdasdasdasdasBOOOOOO",modal1.data-dismiss.value)
// // aria-hidden="true"  exampleModalCenter
// 	expect(modal1.classList.value).toContain('modal fade')
// })

// //broken
// it('add backdrop when model clicked', ()=>{
// 	const btn = document.querySelector('#addHabitBtn')
// 	btn.dispatchEvent(new dom.window.Event('click'))
// 	const backdrop = document.querySelector('modal-backdrop')

// 	expect(backdrop).toBeTruthy()
// })

// //broken
// it('background colour of the button', ()=>{
// 	const bg = document.querySelector('.btn')
// 	const color = 'rgb(140, 52, 30)';
// 	expect(bg).toHaveStyle(`background: ${color}`); 
// })

// //broken
// it('logo is correct', ()=>{
// 	const logo = document.querySelector('rabbit_logo')
// 	expect(logo.src).toBeMatch('./imgs/logo.png')
// })

// //broken
// it('favicon script is not blank', ()=>{
// 	const head = document.querySelector('head')
// 	const faviconlink = '<link rel="icon" type="image/x-icon" href="imgs\favicon.ico">'
// 	// expect(favicon).toContain('<link rel="icon" type="image/x-icon" href="imgs\favicon.ico">')
// 	// expect(head.hasAttribute('href="imgs\favicon.ico"')).toBe(true)
// })

// ////////////////////NOTES FOR TOM FROM TOM: there are 2 habit btns, make sure you are targeting the correct one
// /// model vs modal
// // class vs att


// it('"modal" has a style attribute', ()=>{	
// 	const addhabitbtn = document.querySelector('#firstaddhabit')
// 	expect(addhabitbtn.hasAttribute("style")).toBe(true)
// })


// it('"modal" has data-toggle', ()=>{	
// 	const addhabitbtn = document.querySelector('#firstaddhabit')
// 	expect(addhabitbtn.hasAttribute("data-toggle")).toBe(true)
// })



//a blank one
// it.only('...', ()=>{	
// 	const addhabitbtn = document.querySelector('#firstaddhabit')
// 	expect(addhabitbtn.hasAttribute("data-toggle")).toBe(true)
// })