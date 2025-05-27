import type { RequestHandler } from "express";

const sayHello: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series !");
};
export default { sayHello };
