const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({

  branch: {
    type: String,
    required: true
  },

  manager: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  }

}, {
  timestamps: true
})

module.exports = mongoose.model(
  'Branch',
  branchSchema
)