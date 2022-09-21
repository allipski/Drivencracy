import db from "../database/db.js";
import { ObjectId } from "mongodb";

async function pollResults(req, res) {
  const { id } = req.params;

  try {
    const poll = await db
    .collection("poll")
    .findOne({ _id: new ObjectId(id) });

    const pollChoices = await db
      .collection("choice")
      .find({ pollId: new ObjectId(id) })
      .toArray();

    let pollVotes = [];

    for (let i = 0; i < pollChoices.length; i++) {
        pollVotes = pollVotes.concat(await db
            .collection("vote")
            .find({ choiceId: ObjectId(pollChoices[i]._id).toString() })
            .toArray());
    }

    const choices = pollVotes.reduce((acc, cur) => {
        acc[cur.choiceId] = (acc[cur.choiceId] || 0) + 1;
        return acc;
      }, {});

    const values = Object.values(choices);

    let mostVotes = values[0];
    let index = 0;

    for (let i = 0; i < values.length; i++) {
        if(mostVotes < values[i]) {
            mostVotes = values[i];
            index = i;
        }
    }
    const winner = await db
    .collection("choice")
    .findOne({ _id: new ObjectId((Object.keys(choices))[index]) });

    const finalResult = {
        _id: id,
        title: poll.title,
        expireAt: poll.expireAt,
        result : {
            title: winner.title,
            votes: mostVotes
        }
    }

    console.log(finalResult);
    return res.send(finalResult);

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { pollResults };
