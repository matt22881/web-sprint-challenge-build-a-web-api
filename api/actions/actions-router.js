// Write your "actions" router here!
const express = require('express')

const actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res) => {
    actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({message: 'There was and error GETing the actions', error: err})
        })
})

router.get('/:id', (req, res) => {
    actions.get(req.params.id)
    .then(action => {
        if (!action){
            res.status(404).json({message: `Error, action ID# ${req.params.id} does not exist in the database.`})
        } else res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({message: `There was an error GETing the action with ID# ${id}`, error: err})
        })
})

router.post('/', (req, res) => {
    actions.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({message: `There was an error POSTing the action: \n ${res.body}`, error: err})
        })
})

router.put('/:id', (req, res) => {
    actions.update(req.params.id, req.body)
        .then(action => {
            action && res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({message: `There was an error PUTing the object with ID# ${res.params.id}`, error: err})
        })
})

router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
        .then(() => {
            res.status(200).json({message: `The following action with ID# ${req.params.id} has been deleted`, })
        })
        .catch(err => {
            res.status(500).json({message: `There was an error deleting action ID# ${req.params.id}`, error: err})
        })
})

module.exports = router