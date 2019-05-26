const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Tasks = require('./models/Tasks');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');


const app = express();
const port = process.env.PORT;

// app.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send('GET requests disabled!');
//     }else{
//         next();
//     }
// });//Using middleware






//Maintenance mode 
// app.use((req,res,next)=>{
//     if(req.method){
//         res.status(503).send("Under Maintenance!");
//     }
// });



app.use(express.json()); //parse incoming json
app.use(userRouter);
app.use(taskRouter);





app.listen(port, ()=>{
    console.log('Server is up on port ',port);
});

//Code below is experimentation

