import mongoose from 'mongoose';

const { Schema } = mongoose;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IToken extends mongoose.Document {
  token: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  payload: Object;
}

const schema: mongoose.Schema = new Schema({
  token: { type: String, require: true, unique: true },
  payload: { type: Object }
});

const model = mongoose.model<IToken>('token', schema);

export default model;
