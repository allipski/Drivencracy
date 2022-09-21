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

export { postPoll }