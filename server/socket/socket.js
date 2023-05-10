import { Server } from "socket.io";
import { isValidJwt } from "../data/jwt.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        const err = new Error("not authorized!");
        return next(err);
      }

      if (!isValidJwt(token)) {
        const err = new Error("Invalid jwt token!");
        return next(err);
      }
      next();
    });
  }
}

let socket;

export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}

export function getSocket() {
  if (!socket) {
    throw new Error("Please call initSocket function first!");
  }
  return socket.io;
}
