import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import knex from '../knex.js';

dotenv.config();

const identityRouter = express.Router();
identityRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const existing = await knex('users').where({ email }).first();
  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await knex('users').insert({ email, password: hashedPassword });

  res.json({ message: 'Signup successful' });
});
identityRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await knex('users').where({ email }).first();
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ status:"success",
    token });
});
export default identityRouter;