
// Complete your server here!
// Do NOT `server.listen()` inside this file!

const express = require('express');

const actions = require('./actions/actions-router')
const projects = require('./projects/projects-router')

const server = express();

server.use(express.json())

server.use('/actions', actions)
server.use('/projects', projects)

server.get('/', (req, res) => {
    res.status(200).send(`<h1>Welcome to the API</h1>`)
})

module.exports = server;
