import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config({
    path: `${process.cwd()}/.env`
})

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
