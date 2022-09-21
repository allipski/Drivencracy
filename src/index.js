import './setup.js'
import express from "express";
import cors from "cors";
import pollRouter from './routers/pollRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(pollRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));