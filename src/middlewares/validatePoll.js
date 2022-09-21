import joi from "joi";

async function validatePoll(req, res, next) {

  const pollSchema = joi.object({
    title: joi.string().required().trim().min(1),
    expireAt: joi.string().required(),
  });

  const validation =  pollSchema.validate(req.body, { abortEarly: false })

  if(validation.error) {
    const errors = validation.error.details.map(error => error.message);
    return res.status(422).send(errors);
}

  next();
}

export default validatePoll;
