import express from 'express';
import validatePoll from '../middlewares/validatePoll.js';
import { postPoll, fetchPolls } from '../controllers/pollController.js';
import { fetchChoices } from '../controllers/choiceController.js';
import validatePollExists from '../middlewares/validatePollExists.js';

const pollRouter = express.Router();

pollRouter.post('/poll', validatePoll, postPoll);
pollRouter.get('/poll', fetchPolls);
pollRouter.get('/poll/:id/choice', validatePollExists, fetchChoices);

export default pollRouter;