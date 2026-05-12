const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

  sender: {
    type: String,
    required: true
  },

  receiver: {
    type: String,
    required: true
  },

  amount: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  }

}, {

  timestamps: true
})

module.exports = mongoose.model(
  'Transaction',
  transactionSchema
)