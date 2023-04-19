import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

export default {
  query: (text: string, params: any[] = [], callback?: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
