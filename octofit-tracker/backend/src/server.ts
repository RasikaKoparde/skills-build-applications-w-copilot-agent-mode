import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

app.get('/api/users', (_request, response) => {
  response.json([]);
});

app.get('/api/activities', (_request, response) => {
  response.json([]);
});

const startServer = async (): Promise<void> => {
  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API', error);
  process.exitCode = 1;
});