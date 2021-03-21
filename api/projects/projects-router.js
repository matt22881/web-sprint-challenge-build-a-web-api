// Write your "projects" router here!
const express = require('express')

const projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: 'There was and error GETing the projects', error: err})
        })
})

router.get('/:id', (req, res) => {
    projects.get(req.params.id)
    .then(project => {
        if (!project){
            res.status(404).json({message: `Error, project ID# ${req.params.id} does not exist in the database.`})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        res.status(500).json({message: `There was an error GETing the project with ID# ${id}`, error: err})
    })
})

router.get('/:id/actions', (req, res) => {
    projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({message: `there was an error retrieving the actions for project ID# ${req.params.id}`, error: err})
        })
})

router.post('/', (req, res) => {
    if (!req.body){
        res.status(400).json({message: `Error: no request body`})
    } else {
    projects.insert(req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: `There was an error POSTing the project: \n ${res.body}`, error: err})
        })
    }
})

router.put('/:id', (req, res) => {
    projects.update(req.params.id, req.body)
        .then(project => {
            project && res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: `There was an error PUTing the object with ID# ${res.params.id}`, error: err})
        })
})

router.delete('/:id', (req, res) => {
    projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({message: `The following project with ID# ${req.params.id} has been deleted`})
        })
        .catch(err => {
            res.status(500).json({message: `There was an error deleting project ID# ${req.params.id}`, error: err})
        })
})

module.exports = router