// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  visitors: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Visitor', visitorSchema);
