//imports
express = require('express');
server = express();

projectRouter = require('./routers/project_router');
actions = require('./data/helpers/actionModel');

helmet = require('helmet');
morgan = require('morgan');
const PORT = 3000;

//middleware
server.use(
  express.json(),
  helmet(),
  morgan('tiny')
);

//routing
server.use('/api/projects', projectRouter);

server.get('/api/actions', (req, res) => {
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

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actions.get(id)
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
})

server.post('/api/actions', (req, res) => {
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

server.delete('/api/actions/:id', (req, res) => {
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

server.put('/api/actions/:id', (req, res) => {
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

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})