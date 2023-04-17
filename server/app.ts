import express, { Request, Response, NextFunction } from 'express';

const app = express();

// General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catch all 404
app.use('/', (req: Request, res: Response) => {
  res.status(404).json('Error: This is not the page you are looking for');
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: `An error occured: ${err}` },
  };
  console.log(err.log);
  console.log(err.message);
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

export default app;