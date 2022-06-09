const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imageUrl: {
        type: String,
        required: true,

    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    accessiories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ]
});

cubeSchema.path('imageUrl').validate(function(){
    return this.imageUrl.startsWith('http'); 
},'Image url shoul be a link')

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;