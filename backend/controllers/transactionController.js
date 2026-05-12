const Transaction = require('../models/Transaction')

// GET TRANSACTIONS
const getTransactions =
async (req, res) => {
  try {
    const transactions = await Transaction.find()
    res.json(transactions)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Failed to fetch transactions'
    })
  }
}

// ADD TRANSACTION
const addTransaction =
async (req, res) => {
  try {
    const {
      sender,
      receiver,
      amount,
      type,
      status,
      date
    } = req.body

    const transaction =
    new Transaction({
      sender,
      receiver,
      amount,
      type,
      status,
      date
    })


    const savedTransaction = await transaction.save()

    res.status(201).json({
      message:
      'Transaction Added',
      transaction:
      savedTransaction
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Transaction not saved'
    })
  }
}

// DELETE TRANSACTION
const deleteTransaction =
async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(
      req.params.id
    )
    res.json({
      message:
      'Transaction Deleted'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Delete failed'
    })
  }
}

// UPDATE TRANSACTION
const updateTransaction =
async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(

        req.params.id,
        req.body,

        {
          new: true
        }
      )

    res.json(
      updatedTransaction
    )

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Update failed'
    })
  }
}

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction
}