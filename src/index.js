const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');

const app = express();

app.use('/static', express.static('static'));

app.engine('hbs', handlebars.engine({

    extname: 'hbs'

}));

app.set('view engine', 'hbs');
app.set('views', './src/views')

app.use(router)

app.listen(5000, ()=>console.log('yes'))