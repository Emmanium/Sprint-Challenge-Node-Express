const express = require('express');
const router = express.Router();

projects = require('../data/helpers/projectModel');
actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  projects.get()
    .then(array => {
      res.json(array)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error with database" })
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  projects.get(id)
    .then(project => {
        res.json(project)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project doesn't exist" })
    })
})

router.get('/actions/:project_id', (req, res) => {
  const { project_id } = req.params;
  projects.getProjectActions(project_id)
    .then(actions => {
      if (actions.length > 0) {
        res.json(actions)
      } else {
        res
          .status(404)
          .json({ message: "Invalid project ID" })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error with database" })
    })
})

router.post('/', (req, res) => {
  const body = req.body;
  if (body.name && body.description) {
    projects.insert(body)
      .then(project => {
        res.json(project)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Error with database" })
      })
  } else {
    res
      .status(400)
      .json({ message: "Please include a name and description" })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  projects.remove(id)
    .then(count => {
      if (count) {
        res.json(count)
      } else {
        res
          .status(404)
          .json({ message: "Invalid ID" })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Error with database" })
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (body.name && body.description) {
    projects.update(id, body)
      .then(project => {
        if (project) {
          res.json(project)
        } else {
          res
            .status(404)
            .json({ message: "Invalid ID" })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Error with database" })
      })
  } else {
    res
      .status(400)
      .json({ message: "Please include a name and description" })
  }
})

module.exports = router;