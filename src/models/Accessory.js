const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^http?/;
            message: 'Image url should be a link'
        },
        description: {
            type: String,
            maxlength: 100,
            required: true
        }
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;