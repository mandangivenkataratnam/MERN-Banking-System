const express = require('express')

const router = express.Router()

const {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer
} = require('../controllers/customerController')


// GET
router.get(
  '/',
  getCustomers
)

// ADD
router.post(
  '/',
  addCustomer
)

// DELETE
router.delete(
  '/:id',
  deleteCustomer
)


// UPDATE
router.put(
  '/:id',
  updateCustomer
)

module.exports = router