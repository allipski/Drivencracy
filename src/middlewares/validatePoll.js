import joi from "joi";
import dayjs from "dayjs";

async function validatePoll(req, res, next) {
  const { title: title, expireAt: expireAt } = req.body;

  let nextMonth;
  let expireMonth;

  if (expireAt === "" || expireAt === undefined || expireAt === null) {
    expireMonth = oneMonth();
  }

  function oneMonth() {
    const today = dayjs().format("YYYY-MM-DD HH:mm");
    const thisMonth = Number(today.slice(5, 7));
    if (thisMonth === 12) {
      nextMonth = 1;
    } else {
      nextMonth = thisMonth + 1;
    }
    if (nextMonth < 10) {
      nextMonth = "0" + String(nextMonth);
    }
    return String(nextMonth);
  }

  function createExpireDate() {
    const today = dayjs().format("YYYY-MM-DD HH:mm");
    return today.slice(0, 5) + expireMonth + today.slice(7);
  }

  function date() {
    if (expireAt === "" || expireAt === undefined || expireAt === null) {
      return createExpireDate();
    } else {
      return expireAt;
    }
  }

  const pollSchema = joi.object({
    title: joi.string().required().trim().min(1),
    expireAt: joi.date()
  });

  const validation = pollSchema.validate(
    { title: title, expireAt: date() },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return res.status(422).send(errors);
  }

  res.locals.date = date();
  
  console.log(res.locals.date, expireMonth, title, expireAt);

  next();
}

export default validatePoll;
