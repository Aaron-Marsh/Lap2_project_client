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

 })
