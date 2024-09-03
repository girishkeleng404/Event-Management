import { Pool } from 'pg';
import config from './config';

const env = process.env.NODE_ENV || 'development';
const db = new Pool(config[env]);

const connectToDatabase = async () => {
  try {
    const client = await db.connect();
    try {
      const res = await client.query('SELECT NOW()');
      console.log('Connected to database:', res.rows[0].now);
    } finally {
      client.release();  
    }
  } catch (err) {
    console.error('Error connecting to the database or executing query', err.stack);
  }
};

connectToDatabase();

export default db;
