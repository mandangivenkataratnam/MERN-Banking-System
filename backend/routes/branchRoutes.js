const express = require('express')

const router = express.Router()

const {getBranches, addBranch, deleteBranch, updateBranch} = require('../controllers/branchController')

router.get( '/', getBranches)

router.post( '/', addBranch)

router.delete( '/:id', deleteBranch)

router.put( '/:id', updateBranch)

module.exports = router