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

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})