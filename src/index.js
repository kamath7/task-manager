const app = require('./app');

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


app.listen(port, ()=>{
    console.log('Server is up on port ',port);
});

//Code below is experimentation

