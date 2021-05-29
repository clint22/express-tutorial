const express = require('express')

const router = express.Router()

const {
    getPeople, 
    createPerson,
    createPersonPostman, 
    updatePerson,
    deletPerson
} = require('../controllers/people')

// router.get('/', getPeople)
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletPerson)

router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletPerson)
module.exports = router