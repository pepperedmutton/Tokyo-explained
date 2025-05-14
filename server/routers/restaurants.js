import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import knex from '../knex.js';
import getPlaces from '../tools/getPlaces.js';
dotenv.config();

const restaurantRouter = express.Router();
restaurantRouter.post('/', async (req, res) => {
    const param = req.body;
    const result = await getPlaces(param);
    console.log(result);
    res.json(result);
})
export default restaurantRouter;