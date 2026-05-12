const Branch = require('../models/Branch')

// GET BRANCHES
const getBranches =
async (req, res) => {

  try {
    const branches =
      await Branch.find()
    res.json(branches)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Failed to fetch branches'
    })
  }
}

// ADD BRANCH
const addBranch =
async (req, res) => {
  try {
    const {
      branch,
      manager,
      phone,
      location,
      email
    } = req.body


    const newBranch =
    new Branch({
      branch,
      manager,
      phone,
      location,
      email
    })


    const savedBranch = await newBranch.save()

    res.status(201).json({
      message:
      'Branch Added',
      branch:
      savedBranch
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Branch not saved'
    })
  }
}

// DELETE BRANCH
const deleteBranch =
async (req, res) => {
  try {
    await Branch.findByIdAndDelete(
      req.params.id
    )
    res.json({
      message:
      'Branch Deleted'
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:
      'Delete failed'
    })
  }
}

// UPDATE BRANCH
const updateBranch =
async (req, res) => {
  try {
    const updatedBranch =
      await Branch.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      )
    res.json(
      updatedBranch
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
  getBranches,
  addBranch,
  deleteBranch,
  updateBranch
}