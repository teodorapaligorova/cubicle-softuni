const express = require('express');

const app = express();

app.use('/static', express.static('static'));

app.get('/', (req,res)=>{
    res.send('');
})

app.listen(5000, ()=>console.log('yes'))