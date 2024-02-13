import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/hapi')
  .then(db => console.log('DB Mongo is connected'))
  .catch(err => console.log(`Error in mongo connectation: ${err}`))