import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-weeks.aiqhn.mongodb.net/omnistack-week-8-tindev?retryWrites=true&w=majority', {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.use(express.json());
server.use(routes);

server.listen(8888, () => {
  console.log('Server started on port 8888!');
});