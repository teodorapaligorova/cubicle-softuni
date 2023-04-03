const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,
   
    },
    difficultyLevel: {
        type: Number,
        required: true,
       
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});


const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;