import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import tweetRouter from "./route/tweets";
import authRouter from "./route/auth";
import { initSocket } from "./socket/socket";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/tweets", tweetRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

const server = app.listen(8080);
initSocket(server);
