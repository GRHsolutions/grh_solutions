import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';
import { MONGO_URI } from './config';
import { globalComponents, globalPaths } from './swagger/global.swagger';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Log Node.js version
console.log(`Running on Node.js version: ${process.version}`);

// Middleware
app.use(cors());
app.use(express.json({
  limit: '600kb'
}));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grh Solutions api',
      version: '1.0.0',
      description: ''
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    components: globalComponents,
    paths: globalPaths,
    security: [{ bearerAuth: []}]
  },
  apis: []
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// MongoDB Connection
mongoose.connect(MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware before handling endpoint, global middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("request right before executing any endpoint", req.headers);
  console.log("authorization item", req.headers.authorization);
  next();
});

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://192.168.1.14:${PORT}/swagger`);
});