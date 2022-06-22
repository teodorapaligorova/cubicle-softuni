const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
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
    description: {
        type: String,
        maxlength: 100,
        minlength: 20,
        required: true,
        validate: /[a-zA-Z0-9 ]/
    },
    cubes: [
    {
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }
 ]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;