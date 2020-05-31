import mongoose from 'mongoose';

const user = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    birthday: Date,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ],
    homeaddress: {
      city: String,
      province: String,
      zone: String,
      hood: String,
      mainstreet: String,
      intersection: String,
      number: String,
      hometype: String,
      reference: String,
      location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
      phone: String,
      payrent: Boolean
    },
    busnessaddress: {
      busnnessinhome: Boolean,
      city: String,
      province: String,
      zone: String,
      hood: String,
      mainstreet: String,
      intersection: String,
      number: String,
      reference: String,
      location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
      category: String,
      name: String,
      description: String,
      phone: String,
      email: String
    },
    economicsituation: String
  })
);

export default user;
