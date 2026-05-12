const Customer = require('../models/Customer')

// GET CUSTOMERS
const getCustomers =
async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Failed to fetch customers'
    })
  }
}

// ADD CUSTOMER
const addCustomer =
async (req, res) => {
  console.log(req.body)
  try {
    const {
      name,
      email
    } = req.body

    const customer = new Customer({
      name,
      email
    })

    const savedCustomer = await customer.save()

    res.status(201).json(
      savedCustomer
    )

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Customer not saved'
    })
  }
}

// DELETE CUSTOMER
const deleteCustomer =
async (req, res) => {
  try {
    await Customer.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message:
      'Customer Deleted'
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Delete failed'
    })
  }
}

// UPDATE CUSTOMER
const updateCustomer =
async (req, res) => {
  try {
    const updatedCustomer =
      await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      )
    res.json(
      updatedCustomer
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
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer
}