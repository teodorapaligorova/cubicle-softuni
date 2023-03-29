const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router');
const { initaliseDatabase } = require('./config/database');
const { user } = require('./middlewares/userMiddleware');



const app = express();
require('./config/handlebars')(app);

app.use('/static', express.static('static'));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(user);
app.use(router);


initaliseDatabase()
.then(()=>{
    app.listen(5000, ()=>console.log('App is listening'));
})
.catch((err)=> {
    console.log('Cannot connect to to DB', err);
})
