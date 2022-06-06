// This part of JS contains functions to render the page content

// We have to decide with Billie if we want to do this creating elements and looping through them in JS or if we want to use EJS and work from the HTML. 



const divToAppend = document.querySelector('#divToAppend')




// <div class="btn-group">
//                 <button class="btn btn-primary text-white mt-3 border-0 " type="button" style="font-size: 25px;" id="minusBtn">-</button>
//                 <button class="btn btn-primary text-white mt-3 border-0 w-100" type="button" style="font-size: 25px;" data-toggle="modal" data-target="#trackHabit">5 a day</button>
//                 <button class="btn btn-primary text-white mt-3 border-0" type="button" style="font-size: 25px;" id="plusBtn">+</button>
//                 </div>

//                 <button class="btn-lg btn-primary text-white mt-3 rounded-pill border-0 w-100 " type="button" data-toggle="modal" data-target="#exampleModalCenter" style="font-size: 25px;">Add habit!</button>





function renderLoginForm() {
    const fields = [
        { tag: 'input', attributes: { type: 'email', name: 'email', placeholder: 'Email' } },
        { tag: 'input', attributes: { type: 'password', name: 'password', placeholder: 'Password' } },
        { tag: 'input', attributes: { type: 'submit', value: 'Login' } }
    ]
    const form = document.createElement('form');
    fields.forEach(f => {
        let field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => {
            field.setAttribute(a, v);
            form.appendChild(field);
        })
    })
    form.addEventListener('submit', requestLogin)
    main.appendChild(form);
}


function createDivHabit(habitText, habitID){
    const fields = [
        {tag: 'button', value: '-',attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0'}},
        {tag: 'button', value: habitText, attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0 w-100', 'data-toggle': "modal", 'data-target': "#trackHabit"}},
        {tag: 'button', value: '+', attributes: {type: 'button', style:'font-size: 25px;', class: 'btn btn-primary text-white mt-3 border-0'}},
    ]

    //declare main div here 
    const mainDiv = document.createElement('div')
    mainDiv.className = 'btn-group'

    fields.forEach(f =>{
        let field = document.createElement(f.tag)
        Object.entries(f.attributes).forEach(([a, v])=>{
            field.setAttribute(a, v)

            //add the event listener of interest!!!
            
            mainDiv.appendChild(field)
        })

        field.textContent = f.value

        // REMEMBER TO ADD THE EVENT LISTENER!!!!!

        console.log(field)

        
    })

    divToAppend.appendChild(mainDiv)
    

}


createDivHabit('this is some sample text', 'sorry its boring')
createDivHabit('this is some sample text', 'sorry its boring')
createDivHabit('this is some sample text', 'sorry its boring')




function minusWasClicked(habitID){
    // fetch...
    // send in the request the habitID, letting it know that the - button was clicked so the backend can update this info

}
