const mongoose = require('mongoose');

const estateSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    type: String,
});

module.exports = mongoose.model('Estate', estateSchema);
