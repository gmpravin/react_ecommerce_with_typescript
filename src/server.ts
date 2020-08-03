import app from './app';
import * as mongoose from 'mongoose';

const PORT = 8000;
mongoose
  .connect(
    'mongodb://gmpravin:gopal5678@cluster0-shard-00-00-jalvu.mongodb.net:27017,cluster0-shard-00-01-jalvu.mongodb.net:27017,cluster0-shard-00-02-jalvu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('Mongodb Connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
});
