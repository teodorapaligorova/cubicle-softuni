const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        validate: /[a-zA-Z0-9 ]/
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 20,
        validate: /[a-zA-Z0-9 ]/
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^http?/,
            message: 'Image url should be a link'
        }
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
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

cubeSchema.path('imageUrl').validate(function(){
    return this.imageUrl.startsWith('http'); 
},'Image url shoul be a link')

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;