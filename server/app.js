import express from "express";
import cors from "cors";
import tweetRouter from "./route/tweets.js";
import authRouter from "./route/auth.js";
import { config } from "./config.js";
import { initSocket } from "./socket/socket.js";
import { db } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

db.getConnection().then((connection) => console.log("connected"));

const server = app.listen(config.host.port);
initSocket(server);
