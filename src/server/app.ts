import express, { Request, Response, NextFunction } from 'express';
import userController from './controllers/userController';

const app = express();

// General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create user in db
app.post(
  '/createUser',
  userController.createUser,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.newUser);
  }
);

// add users score in db
app.post(
  '/addUserScore/:id',
  userController.addUserScore,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.userScore);
  }
);

// get all scores from db
app.get(
  '/getAllScores',
  userController.getAllScores,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.allScores);
  }
);

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
