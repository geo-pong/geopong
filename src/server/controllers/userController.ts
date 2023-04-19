import { Request, Response, NextFunction, RequestHandler } from 'express';
import pg from './models/database';
import dotenv from 'dotenv';
dotenv.config();

interface userController {
  createUser: RequestHandler;
  addUserScore: RequestHandler;
  getAllScores: RequestHandler;
}

// create user in db

const userController: userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName } = req.body;
      console.log(userName);
      const email = `${userName}@cool.com`; // need to update this with email later...
      const date = new Date();
      const queryString = `INSERT INTO users (email, name, date, topScore, gamesPlayed)
                           VALUES($1, $2, $3, $4, $5);`;
      const params = [email, userName, date, 0, 0];
      const query = await pg.query(queryString, params);
      res.locals.newUser = query;
      return next();
    } catch (error) {
      return next({
        log: `Error in userController.createUser: ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  // add users score to db
  addUserScore: async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const { userID } = req.params;
    //   const query = await pg.query();
    //   res.locals.userScore = query.rows;
    //   return next();
    // } catch (error) {
    //   return next({
    //     log: `Error in userController.addUserScore: ${error}`,
    //     status: 400,
    //     message: { error },
    //   });
    // }
  },

  // send all scores from db
  getAllScores: async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const query = await pg.query();
    //   res.locals.allScores = query;
    // } catch (error) {
    //   return next({
    //     log: `Error in userController.getAllScores: ${error}`,
    //     status: 400,
    //     message: { error },
    //   });
    // }
  },
};

export default userController;


