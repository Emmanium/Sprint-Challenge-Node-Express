//imports
express = require('express');
server = express();

projectRouter = require('./routers/project_router');
actionRouter = require('./routers/action_router');

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
server.use('/api/actions', actionRouter);

//server listen
server.listen(PORT, (req, res) => {
  console.log(`Server is listening on PORT ${PORT}`)
})