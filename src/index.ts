import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models';
import apiV1 from './routes/v1';

import seedRole from './seeds/role.seed';
import seedUser from './seeds/user.seed';

dotenv.config(); //enable read files from .env

const app: Application = express(); // creates a express app
app.use(cors()); // enable cors
app.use(bodyParser.json()); // convert the incomming request to json
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded to false
app.use(express.static('public'));
process.env.TZ = 'America/Guayaquil';

// START API V1
apiV1(app); // initialize the API v1
// END API V1

const server: http.Server = new http.Server(app);
const PORT = process.env.PORT || 9091;

db.mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    server.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });

    //SEEDS
    seedRole();
    seedUser();
  })
  .catch((err) => {
    console.error('MongoDB Connection error', err);
    process.exit();
  });
