const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    client: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    plots: { type: Array, default: [] },
    csv: { type: String, default: '' }
})

const JsonData = mongoose.model('userSchema', userSchema);

module.exports = JsonData;