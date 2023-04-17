import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface userController {
  createUser: RequestHandler;
}

// create user in db

const userController: userController = {
  createUser: async (req,res,next) => {
    try {

    } catch (error) {
      return next({

      })
    }
  }
}

// add users score to db

// send all scores from db
export default userController;