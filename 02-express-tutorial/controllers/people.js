let { people } = require('../data')

const getPeople = (req, res) => {
    res.status(200).json({success: true, data: people})
}

const createPerson = (req, res) => {
    const{name} = req.body
    if(!name) {
        return res.status(401).json({success: false, msg: 'Please provide a name'})
    }
    return res.status(201).json({success: true, person: name})
}

const createPersonPostman = (req, res) => {
    const{name} = req.body
    if(!name) {
        return res.status(401).json({ success: true, msg: 'Please provide a name'})
    }
    return res.status(200).json({ success: true, data:[...people, name]})
}

const updatePerson = (req, res) => {

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

}

const deletPerson = (req, res) => {

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

}

module.exports = {

    getPeople, 
    createPerson,
    createPersonPostman, 
    updatePerson,
    deletPerson
}