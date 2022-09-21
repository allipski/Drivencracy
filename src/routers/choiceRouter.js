import express from 'express';
import validateChoice from '../middlewares/validateChoice.js';
import { postChoice, fetchChoices } from '../controllers/choiceController.js';

const choiceRouter = express.Router();

choiceRouter.post('/choice', validateChoice, postChoice);
choiceRouter.get('/choice', fetchChoices);

export default choiceRouter;