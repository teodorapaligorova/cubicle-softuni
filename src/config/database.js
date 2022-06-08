const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/softuni-cubicle';

exports.initaliseDatabase = () => mongoose.connect(connectionString);