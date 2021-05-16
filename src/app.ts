import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { notFound, errorHandler, invalidMethod } from './middleware';
import controllers from './controllers';

const app = express();

app.use(morgan('dev'));
app.use(helmet({ crossOriginResourcePolicy: true }));
app.use(cors());
app.use(json());

app.use(invalidMethod);
app.use(notFound);
app.use(errorHandler);

app.use(controllers);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
