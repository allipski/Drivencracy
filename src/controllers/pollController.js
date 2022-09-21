import db from '../database/db.js'

async function postPoll(req, res) {
    const title = req.body.title;
    try {
        await db.collection('poll').insertOne({ title:title, expireAt:res.locals.date });
        return res.send({ title:title, expireAt:res.locals.date }).status(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

async function fetchPolls(req, res) {
    try {
        const polls = await db.collection('poll').find().toArray();
        return res.send(polls).status(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { postPoll, fetchPolls };