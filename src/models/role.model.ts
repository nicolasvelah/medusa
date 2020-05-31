import mongoose from 'mongoose';

const role = mongoose.model(
  'Role',
  new mongoose.Schema({
    name: String
  })
);

export default role;
