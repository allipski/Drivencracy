import db from '../database/db.js'

async function postPoll() {
    const { title:title, expireAt:expireAt } = req.body;
    try {
        const poll = await db.collection('poll').insertOne({ title:title, expireAt:expireAt });
        return res.send(poll).status(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export { postPoll }