import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface userController {
  createUser: RequestHandler;
  addUserScore: RequestHandler;
  getAllScores: RequestHandler;
}

// create user in db
const userController: userController = {
  createUser: async (req, res, next) => {
    try {
      const { userName } = req.body;
      const query = await pg.query();
      res.locals.newUser = query.rows[0];
      return next();
    } catch (error) {
      return next({
        log: `Error in userController.createUser: ${error}`,
        status: 400,
        message: { error },
      });
      1;
    }
  },

  // add users score to db
  addUserScore: async (req, res, next) => {
    try {
      const { userID } = req.params;
      const query = await pg.query();
      res.locals.userScore = query.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error in userController.addUserScore: ${error}`,
        status: 400,
        message: { error },
      });
    }
  },

  // send all scores from db
  getAllScores: async (req, res, next) => {
    try {
      const query = await pg.query();
      res.locals.allScores = query;
    } catch (error) {
      return next({
        log: `Error in userController.getAllScores: ${error}`,
        status: 400,
        message: { error },
      });
    }
  },
};

export default userController;
