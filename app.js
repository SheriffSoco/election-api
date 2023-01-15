const express = require('express');

const initiativeRoutes = require('./routes/initiative-routes');
const signatureRoutes = require('./routes/signature-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use('/api/initiative', initiativeRoutes);

app.use('/api/signature', signatureRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred.'});
})

app.listen(5001)