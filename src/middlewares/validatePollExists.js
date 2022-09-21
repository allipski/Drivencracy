import db from '../database/db.js';
import { ObjectId } from 'mongodb';

async function validatePollExists(req, res, next) {
    const { id } = req.params

    if (id.length != 24) {
        return res.send('Poll ID must be 24 hexadecimal characters long');
    }

    const poll = await db.collection('poll').findOne({ _id: new ObjectId(id) });
    if(!poll) {
        return res.send('There is no poll with id ' + id).status(404);
    }
 
    next();
}

export default validatePollExists;