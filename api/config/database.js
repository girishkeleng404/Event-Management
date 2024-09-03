// import { Pool } from 'pg';

import pkg from 'pg';
const { Pool } = pkg;

import config from './config.js'; // Ensure this path is correct

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

console.log('Config:', config);
console.log('Database Config for Environment:', dbConfig);


if (!dbConfig) {
  throw new Error(`Database configuration for environment ${env} not found`);
}

const db = new Pool({
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  port: dbConfig.port,
});

db.connect()
  .then(client => {
    return client.query('SELECT NOW()')
      .then(res => {
        console.log('Connected to database:', res.rows[0].now);
        client.release();
      })
      .catch(err => {
        client.release();
        console.error('Error executing query', err.stack);
      });
  })
  .catch(err => {
    console.error('Error connecting to the database', err.stack);
  });

export default db;
