import express from 'express';
import validatePoll from '../middlewares/validatePoll';
import { postPoll } from '../controllers/pollController';

const pollRouter = express.Router();

pollRouter.post('/poll', validatePoll, postPoll);

export default pollRouter;