const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true, useCreateIndex: true,useFindAndModify: true});
//to avoid deprecation warning, useFindAndModify is set to true