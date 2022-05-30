const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use('/static', express.static('static'));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './src/views')

app.get('/', (req,res)=>{
    res.send('');
})

app.listen(5000, ()=>console.log('yes'))