import { json } from "express";
import express from 'express';
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import identityRouter from "./routers/identityRouter.js";
import restaurantRouter from "./routers/restaurants.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.use("/api/identity",identityRouter);
app.use("/api/restaurants",restaurantRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
