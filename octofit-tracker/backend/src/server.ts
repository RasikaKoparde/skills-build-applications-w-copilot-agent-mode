import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  if (_request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

for (const component of ['activities', 'leaderboard', 'teams', 'users', 'workouts']) {
  app.get(`/api/${component}`, (_request, response) => {
    response.json([]);
  });
}

const startServer = async (): Promise<void> => {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API', error);
  process.exitCode = 1;
});