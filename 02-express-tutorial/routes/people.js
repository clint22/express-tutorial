const express = require('express')
const router = express.Router()

let { people } = require('../data')

router.get('/', (req, res) => {
    res.status(200).json({success: true, data: people})
})

router.post('/', (req, res) => {
    const{name} = req.body
    if(!name) {
        return res.status(401).json({success: false, msg: 'Please provide a name'})
    }
    return res.status(201).json({success: true, person: name})
})

router.post('/postman', (req, res) => {
    const{name} = req.body
    if(!name) {
        return res.status(401).json({ success: true, msg: 'Please provide a name'})
    }
    return res.status(200).json({ success: true, data:[...people, name]})
})


router.put('/:id', (req, res) => {

    const {id} = req.params
    const{name} = req.body
    
    const  person  = people.find((person) => person.id === Number(id))
    if(!person) {
        return res
            .status(401)
            .json({success: false, msg:`Person with id ${id} doesn't exist`})
    }

    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name
        }
       return person
    })

    res.status(200).json({ success: true, data: newPeople})

})


router.delete('/:id', (req, res) => {

    const  person  = people.find((person) => person.id === Number(req.params.id))
    if(!person) {
        return res
            .status(401)
            .json({success: false, msg:`Person with id ${req.params.id} doesn't exist`})
    }

    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    )

    return res.status(200).json({success: true, data: newPeople})

})

module.exports = router