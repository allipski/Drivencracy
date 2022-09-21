import db from '../database/db.js'
import { ObjectId } from 'mongodb';

async function postChoice(req, res) {
    const {title: title, pollId: pollId} = req.body
    try {
        await db.collection('choice').insertOne({ title:title, pollId: new ObjectId(pollId) });
        const choice = await db.collection('choice').findOne({ title:title, pollId: new ObjectId(pollId) });
        return res.send(choice).status(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function fetchChoices(req, res) {
    const { id } = req.params
    try {
        const choices = await db.collection('choice').find( {pollId: id }).toArray();
        return res.send(choices).status(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { postChoice, fetchChoices };