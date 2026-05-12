const express = require('express')

const router = express.Router()

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction
} = require('../controllers/transactionController')


// GET
router.get(
  '/',
  getTransactions
)


// ADD
router.post(
  '/',
  addTransaction
)


// DELETE
router.delete(
  '/:id',
  deleteTransaction
)


// UPDATE
router.put(
  '/:id',
  updateTransaction
)

module.exports = router