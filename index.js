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
        .json({error: "Error with database"})
    })
})

server.get('/api/projects/:id', (req, res) => {
  
})

server.post('/api/projects', (req, res) => {
  
})

server.delete('/api/projects/:id', (req, res) => {
  
})

server.put('/api/projects/:id', (req, res) => {
  
})

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})