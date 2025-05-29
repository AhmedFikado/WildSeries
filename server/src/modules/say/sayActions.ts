import type { RequestHandler } from "express";

const sayHello: RequestHandler = (req, res) => {
  console.info(req.query);
  res.send(`Welcome to Wild Series, ${req.query.name} !`);
};
export default { sayHello };
