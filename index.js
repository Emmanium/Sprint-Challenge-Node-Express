//imports
express = require('express');
server = express();

projects = require('./data/helpers/projectModel');
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
server.get('/api/projects', (req, res) => {
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

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.get(id)
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
})

server.post('/api/projects', (req, res) => {
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

server.delete('/api/projects/:id', (req, res) => {
  
})

server.put('/api/projects/:id', (req, res) => {
  
})

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})