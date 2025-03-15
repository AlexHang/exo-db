import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { serve, setup } from 'swagger-ui-express';
import { swaggerConfig } from './docs/swagger.js';
import exoplanetsRouter from './routes/exoplanet-routes.js';
import authRouter from './routes/auth-routes.js';

connectDB();

const app = express();

app.use(cors());
app.use(json());

app.use('/api/exoplanets', exoplanetsRouter);
app.use('/api/auth', authRouter);

app.use('/api-docs', serve, setup(swaggerConfig));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));