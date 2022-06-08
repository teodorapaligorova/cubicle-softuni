const cubes = require('../db.json');
const Cube = require('../models/Cube')


exports.getOne = (cubeId) => Cube.findById(cubeId);
exports.getAll = async () =>{
let cubes = await Cube.find().lean();
return cubes
} 

exports.create = (cube) => Cube.create(cube);
