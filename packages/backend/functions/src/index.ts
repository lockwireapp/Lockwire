import express from 'express';
import { errorHandler } from './utils/errorHandler';
import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { RegisterRoutes } from '../openapi/routes';
import { notFoundHandler } from './utils/notFoundHandler';

initializeApp();

const app = express();
RegisterRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(notFoundHandler);

export const api = onRequest(app);
