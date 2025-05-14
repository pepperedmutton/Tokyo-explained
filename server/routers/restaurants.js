import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import knex from '../knex.js';
import getPlaces from '../tools/getPlaces.js';
import detailedInfo from '../tools/deailedInfo.js';
dotenv.config();

const restaurantRouter = express.Router();
restaurantRouter.post('/', async (req, res) => {
    const param = req.body;
    const result = await getPlaces(param);
    
    res.json(result);
})
restaurantRouter.post('/:id', async (req, res) => {
    const param = req.body;
    const id = req.params.id;
    const result = await detailedInfo(param,id);
    res.json(result);
})

export default restaurantRouter;