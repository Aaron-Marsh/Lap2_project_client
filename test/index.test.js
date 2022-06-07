/**
* @jest-environment jsdom
*/

const renderDOM = require('./helpers.js')

let dom;
let document;

describe('mainpage.html', () => {
    beforeEach(async ()=>{
        dom = await renderDOM('../mainpage_changes.html')
        document = await dom.window.document
    })

    it('adds the input value to the h1', ()=>{
        const h1 = document.querySelector('h1')
        expect(h1.innerHTML).toBeTruthy()
    })

 })
