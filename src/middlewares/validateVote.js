import { ObjectId } from 'mongodb';
import db from '../database/db.js';

async function validateVote(req, res, next) {
  const { id } = req.params

  const existChoice = await db.collection('choice').findOne({ _id: new ObjectId(id) });

  if(!existChoice) {
    return res.send('There is no choice with id ' + id).status(404);
  }

  const existPoll = await db.collection('poll').findOne({ _id: new ObjectId(existChoice.pollId) });

  if(!existChoice) {
    return res.send('There is no poll with id ' + existChoice.pollId).status(404);
  }

  const now = new Date();
  const pollExpire = new Date(existPoll.expireAt)
  
  if(pollExpire < now) {
    return res.send('This poll has already expired!').status(403);
  }

  next();
}

export { validateVote };
