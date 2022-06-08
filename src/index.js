const express = require('express');
const router = require('./router');
const { initaliseDatabase } = require('./config/database')
const app = express();
require('./config/handlebars')(app);

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: false}));
app.use(router);

initaliseDatabase()
.then(()=>{
    app.listen(5000, ()=>console.log('App is listening'));
})
.catch((err)=> {
    console.log('Cannot connecto to DB', err);
})
