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
