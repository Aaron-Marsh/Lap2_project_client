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
        // app = require('./static/js/content.js')
        // app.fetchLogin('monia','pass')

    })
    afterEach(() => {
        fetch.resetMocks();

    })
         test('test get habits ', async() => {  
             fetch.mockResponse(JSON.stringify( {"habits":[]}))
             fetch.mockReject(new Error('Fake disaster'))
            const returnVal = await funcs.fetchGetHabitsByUser('monia')
            expect(fetch).toHaveBeenCalled()
            expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/user/monia')
            expect(JSON.stringify(returnVal)).toContain('Fake disaster')
            // expect(JSON.stringify(returnVal)).toContain({habits:[]})
        })
        test('test get habits 2 ', async() => {  
            fetch.mockResponse(JSON.stringify( {"habits":[]}))
            
           const returnVal = await funcs.fetchGetHabitsByUser('monia')
  
           expect(JSON.stringify(returnVal)).toContain(JSON.stringify({'habits':[]}))
       })

        test('test delete habits', async() => {  
            fetch.mockResponse(JSON.stringify( {"habits":[]}))
           const returnVal = await funcs.fetchDeleteHabit('monia')
           expect(fetch).toHaveBeenCalled()
           expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/monia',{"method": "DELETE"})
           // expect(returnVal).toContain({habits:[]})
       })

       test('test create habit', async() => {  
        fetch.mockResponse( habitData={
            "title": 'drink',
            "frequency": 'daily',
            "goal": 8,
            "startdate": '01/01/21',
            "userId": 'monia'
        })
       const returnVal = await funcs.fetchCreateHabit('drink','daily',8,'01/01/21','monia')
       expect(fetch).toHaveBeenCalled()
       expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/new',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( habitData) 
      })
       // expect(returnVal).toContain({habits:[]})
   })

   test('test patch habit', async() => {  
    fetch.mockResponse(habitData={
        "id":'monia',
        "command":'1'
    })
   const returnVal = await funcs.fetchPatchHabit('monia',1)
   expect(fetch).toHaveBeenCalled()
   expect(fetch).toHaveBeenCalledTimes(1)
   expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/habits/monia',{"body": "{\"id\":\"monia\",\"command\":1}", "headers": {"Content-Type": "application/json"}, "method": "PATCH"})
   // expect(returnVal).toContain({habits:[]})
})


test('test create user', async() => {  
    fetch.mockResponse( habitData={
        "username": 'username',
        "password": 'password'
    })
   const returnVal = await funcs.fetchCreateUser('username','password')
   expect(fetch).toHaveBeenCalled()
   expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/auth/register',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( habitData) 
  })
   // expect(returnVal).toContain({habits:[]})
})

test('test fetch login', async() => {  
    fetch.mockResponse( habitData={
        "username": 'username',
        "password": 'password'
    })
   const returnVal = await funcs.fetchLogin('username','password')
   expect(fetch).toHaveBeenCalled()
   expect(fetch).toHaveBeenCalledWith('https://glacial-plains-13166.herokuapp.com/auth/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( habitData) 
  })
   // expect(returnVal).toContain({habits:[]})
})
    })