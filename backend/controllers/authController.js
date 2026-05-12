const User = require('../models/User')

const loginUser =
async (req, res) => {

  try {
    const {
      email,
      password
    } = req.body

    const user =
      await User.findOne({
        email,
        password
      })

    if (!user) {
      return res.status(401).json({
        message:
        'Invalid Email or Password'
      })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Login failed'
    })
  }
}

module.exports = {
  loginUser
}