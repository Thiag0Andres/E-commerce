require('dotenv').config();

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());
app.use(errors());

app.listen(process.env.PORT || 9000);