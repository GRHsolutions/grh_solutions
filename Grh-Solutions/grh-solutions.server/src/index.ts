import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/routes';
import { MONGO_URI } from './config';
import { swaggerComponents, swaggerPaths } from './swagger/initializations';

dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Log Node.js version
console.log(`Running on Node.js version: ${process.version}`);

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task and Report API',
      version: '1.0.0',
      description: 'A simple API for managing tasks and reports'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ],
    components: swaggerComponents,
    paths: swaggerPaths
  },
  apis: []
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// MongoDB Connection
mongoose.connect(MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});