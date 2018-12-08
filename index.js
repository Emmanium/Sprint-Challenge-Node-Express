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
  helmet(),
  morgan('tiny')
);

//routing

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})