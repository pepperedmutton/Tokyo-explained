import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import knex from '../knex.js';
import authMiddleware from '../tools/auth.js';
import { authMiddlewarePaid } from '../tools/auth.js';
dotenv.config();

const commentRouter = express.Router();

commentRouter.post("/:target",authMiddleware,async (req, res) => {
    const comment = req.body.content;
    const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log(user); // you can use user.id or user.username if available

    const [saved] = await knex('comment')
      .insert({
        placeId: req.params.target,
        content: comment,
        userid: user.id 
      })
      .returning(['id', 'content', 'placeId']);
    res.json(saved);
});


commentRouter.get("/:target", async (req, res) => {
  try {
    const comments = await knex('comment')
      .select('*')
      .where('placeId', req.params.target);

    res.json(comments);
  } catch (err) {
    console.error('GET /comment/:target error:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


commentRouter.delete("/:target/:comment",authMiddlewarePaid,async (req,res)=>{
  const id = req.params.comment;
  console.log(id);
  await knex("comment").delete('*').where({id});
  res.json({status:"success"})
})
export default commentRouter;
