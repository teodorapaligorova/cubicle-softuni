exports.index = ('/', (req,res)=>{
    res.render('index',{cubes});
});

exports.about = (req,res) => {
    res.render('about');
}

const cubes = require('../db.json')