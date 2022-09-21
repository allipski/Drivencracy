import express from 'express';
import validatePoll from '../middlewares/validatePoll.js';
import { postPoll, fetchPolls } from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', validatePoll, postPoll);
pollRouter.get('/poll', fetchPolls);

export default pollRouter;