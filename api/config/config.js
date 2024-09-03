import dotenv from 'dotenv';

dotenv.config();

export default function config(){

 const config = {
   development:{
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
   },
   test: {
    user: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    port: 5432, // Default PostgreSQL port
  },
  production: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  }
 }   
 return config;
}