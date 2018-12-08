const express = require('express');
const router = express.Router();

actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  actions.get()
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
  actions.get(id)
    .then(action => {
        res.json(action)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action doesn't exist" })
    })
})

router.post('/', (req, res) => {
  const body = req.body;
  if (body.project_id && body.description && body.notes) {
    actions.insert(body)
      .then(action => {
        res.json(action)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "Error with database" })
      })
  } else {
    res
      .status(400)
      .json({ message: "Please make sure to include a project ID, description, and notes" })
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  actions.remove(id)
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
  if (body.project_id && body.description && body.notes) {
    actions.update(id, body)
      .then(action => {
        if (action) {
          res.json(action)
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
      .json({ message: "Please make sure to include a project ID, description, and notes" })
  }
})

module.exports = router;