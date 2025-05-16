import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader;
  const decoded = jwt.verify(token,JWT_SECRET);
  req.user = decoded;
  next(); 
  
}

export function authMiddlewarePaid(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader;
  const decoded = jwt.verify(token,JWT_SECRET);
  console.log(decoded);
  if (decoded.id!==1){
    return res.status(401).json({error:"paid service"});
  }

  req.user = decoded;
  next();
  
}
