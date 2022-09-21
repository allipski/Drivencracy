import joi from "joi";
import { ObjectId } from 'mongodb';
import db from '../database/db.js';

async function validateChoice(req, res, next) {
  const {title: title, pollId: pollId} = req.body

  const existePoll = await db.collection('poll').findOne({ _id: new ObjectId(pollId) });

  if(!existePoll) {
    return res.send('There is no poll with id ' + pollId).status(404);
  }

  const now = new Date();
  const pollExpire = new Date(existePoll.expireAt)
  
  if(pollExpire < now) {
    return res.send('This poll has already expired!').status(403);
  }

  const choiceSchema = joi.object({
    title: joi.string().required().trim().min(1),
  });

  const validation = choiceSchema.validate(
    { title: title },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return res.status(422).send(errors);
  }

  const choiceTitle = await db.collection('choice').findOne({ title:title });

  if(choiceTitle) {
    return res.send('There is already a choice with this title. Please create a new title.').status(409);
  }

  next();
}

export default validateChoice;
