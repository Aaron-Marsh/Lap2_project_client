/**
* @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../mainpage_changes.html'), 'utf8');
global.fetch = require('jest-fetch-mock')
const siteBackendUrl = `https://glacial-plains-13166.herokuapp.com/`;

let app;
let funcs

describe('java', () => {
    beforeEach( () => {
        // localStorage.setItem('userid', '629f8820a84519212982bb30')
        document.documentElement.innerHTML = html.toString();
        funcs = require('../static/js/fetchFunctions')
        // app = require('../bundle.js')
        // app.fetchLogin('monia','pass')

    })
    afterEach(() => {
        fetch.resetMocks();

    })
         test('test get habits ', async() => {  
             fetch.mockResponse(JSON.stringify( {"habits":[]}))
            const returnVal = await funcs.fetchGetHabitsByUser('monia')
            expect(fetch).toHaveBeenCalled()
            expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/user/monia')
            // expect(returnVal).toContain({habits:[]})
        })

        test('test delete habits', async() => {  
            fetch.mockResponse(JSON.stringify( {"habits":[]}))
           const returnVal = await funcs.fetchDeleteHabit('monia')
           expect(fetch).toHaveBeenCalled()
           expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/monia',{"method": "DELETE"})
           // expect(returnVal).toContain({habits:[]})
       })

       test('test create habit', async() => {  
        fetch.mockResponse(JSON.stringify( habitData={
            "title": 'drink',
            "frequency": 'daily',
            "goal": 8,
            "startdate": '01/01/21',
            "userId": 'monia'
        }))
       const returnVal = await funcs.fetchCreateHabit('drink','daily',8,'01/01/21','monia')
       expect(fetch).toHaveBeenCalled()
       expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/new',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( "{title:monia}") 
      })
       // expect(returnVal).toContain({habits:[]})
   })

   test('test patch habit', async() => {  
    fetch.mockResponse(JSON.stringify( habitData={
        "id": 'monia',
        "command": '1'
    }))
   const returnVal = await funcs.fetchPatchHabit('monia',1)
   expect(fetch).toHaveBeenCalled()
   expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/monia',{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(habitData) 
  })
   // expect(returnVal).toContain({habits:[]})
})
    })