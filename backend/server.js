require('dotenv').config()

const express = require('express')

const cors = require('cors')

const connectDB = require('./config/db')

const customerRoutes = require('./routes/customerRoutes')

const transactionRoutes = require('./routes/transactionRoutes')

const authRoutes = require('./routes/authRoutes')

const branchRoutes = require('./routes/branchRoutes')


const app = express()


connectDB()

app.use(cors())

app.use(express.json())


// ROUTES
app.use(
  '/customers',
  customerRoutes
)

app.use(
  '/transactions',
  transactionRoutes
)

app.use(
  '/auth',
  authRoutes
)

app.use(
  '/branches',
  branchRoutes
)


const PORT = 4300

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  )
})