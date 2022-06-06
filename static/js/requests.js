// This file in theory contains functions to retrieve data from the API which is not really meant to be protected by any authorisation.... Maybe this would be the place where the user retrieves all of its activities in an 'authorised' manner instead of non-authorised endpoint

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Aaron:hHw659AirIPVfL5O@cluster0.6znh3nh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function addHabit(title, frequency, goal, userId) {

    client.connect(async err => {
        const collection = client.db("habitrabbits").collection("habits");
        // perform actions on the collection object
        
        let today = new Date;
        let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
        
        let add = await collection.insertOne({ title: title, frequency: frequency, goal: goal, startdate: currentdate, userId: userId })
           
        console.log(agg)
        console.log(agg[0].title)
        
        client.close();
    });
    
}
