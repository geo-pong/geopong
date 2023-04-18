import { Pool } from 'pg';
import { config } from 'dotenv';
config();

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

module.exports = {
  query: (text: string, params: any[], callback: any) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
