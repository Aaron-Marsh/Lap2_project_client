// This file changes the navbar links and renders the page using content.js functions based on the hash of the page

// It's going to be the last file we have to make and pretty much encapsules all functions in other ones




let sample = ['Daily', 'Weekly', 'Monthly', 'Daily', 'Weekly', 'Monthly', 'Daily', 'Weekly', 'Monthly']




function orderArray(array){

    let newArray = []

    array.forEach(e => {
        if(e == 'Daily'){ //e.frequency
            newArray.push(e)
        }
    });

    array.forEach(e => {
        if(e == 'Weekly'){ //e.frequency
            newArray.push(e)
        }
    });

    array.forEach(e => {
        if(e == 'Monthly'){ //e.frequency
            newArray.push(e)
        }
    });

    return newArray

}

console.log(sample)
console.log(orderArray(sample))
