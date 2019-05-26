// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient,ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id.length);
console.log(id.toHexString().length);

MongoClient.connect(connectionURL,{useNewUrlParser: true},(error,client)=>{
    if(error){
        return console.log('Unable to connect. Following error occured:',error);

    }
    const db = client.db(databaseName);

    // db.collection('users').deleteMany({age: 55}).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // });

    db.collection('tasks').deleteOne({description:'Buy groceries'}).then((result)=>{
        console.log(result.deletedCount);
    }).catch((error)=>{
        console.log(error);
    });

});

//Mongo db update operators: 

