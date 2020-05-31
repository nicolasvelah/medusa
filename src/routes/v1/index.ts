import { Application } from 'express';
import auth from './auth';

export default (app: Application) => {
  app.use('/api/v1', auth);
};
