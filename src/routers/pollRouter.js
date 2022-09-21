import express from 'express';
import validatePoll from '../middlewares/validatePoll.js';
import { postPoll } from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', validatePoll, postPoll);

export default pollRouter;