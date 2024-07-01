// auth.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();

export function generateAuthToken(user) {
  // Your secret key should be stored securely and not hard-coded in real applications.
  // It's used to sign the JWT token and should be kept confidential.
  const secretKey = process.env.AUTH_SECRET_KEY;

  // The payload could include user information and claims
  // For example, you might want to include the user's ID and roles
  const payload = {
    id: user.id,
    // Add other user properties or claims as needed
  };

  // Sign the JWT token with your secret key
  // The token will expire in 1 hour ('1h'). Adjust the expiration as needed.
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}