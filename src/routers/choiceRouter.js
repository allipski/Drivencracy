import express from 'express';
import validateChoice from '../middlewares/validateChoice.js';
import { postChoice, fetchChoices } from '../controllers/choiceController.js';
import { validateVote } from '../middlewares/validateVote.js';
import { postVote } from '../controllers/voteController.js';

const choiceRouter = express.Router();

choiceRouter.post('/choice', validateChoice, postChoice);
choiceRouter.post('/choice/:id/vote', validateVote, postVote);
choiceRouter.get('/choice', fetchChoices);

export default choiceRouter;