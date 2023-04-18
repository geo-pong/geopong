import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

interface authController: {
  :RequestHandler;
}

const authController: authController = {

}

export default authController;