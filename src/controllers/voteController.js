import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import db from '../database/db.js'

async function postVote(req, res) {
    const { id } = req.params

    try {
        await db.collection('vote').insertOne({ createdAt: dayjs().format("YYYY-MM-DD HH:mm"), choiceId: new ObjectId(id)});
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { postVote };