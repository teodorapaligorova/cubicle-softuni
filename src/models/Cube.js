const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
    dificultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    }
});

cubeSchema.path('imageUrl').validate(function(){
    return this.imageUrl.startsWith('http'); 
},'Image url shoul be a link')

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;