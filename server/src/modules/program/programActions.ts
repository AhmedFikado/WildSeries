import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res) => {
  const programFromDB = await programRepository.readAll();

  res.json(programFromDB);
};

const read: RequestHandler = async (req, res) => {
  const programId = Number(req.params.id);

  const program = await programRepository.read(programId);

  if (program == null) {
    res.sendStatus(404);
  } else {
    res.json(program);
  }
};

const edit: RequestHandler = async (req, res) => {
  const program = {
    id: Number(req.params.id),
    title: req.body.title,
    synopsis: req.body.synopsis,
    poster: req.body.poster,
    country: req.body.country,
    year: req.body.year,
    category_id: req.body.category_id,
  };
  const affectedRows = await programRepository.update(program);
  if (affectedRows === 0) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
};

const add: RequestHandler = async (req, res) => {
  const newProgram = {
    title: req.body.title,
    synopsis: req.body.synopsis,
    poster: req.body.poster,
    country: req.body.country,
    year: req.body.year,
    category_id: req.body.category_id,
  };
  const insertId = await programRepository.create(newProgram);
  res.status(201).json({ insertId });
};

const destroy: RequestHandler = async (req, res) => {
  const programId = Number(req.params.id);

  await programRepository.delete(programId);
  res.sendStatus(204);
};

import joi from "joi";

const movieSchema = joi.object({
  title: joi.string().max(255).required(),
  synopsis: joi.string().max(1000).required(),
  poster: joi.string().max(255).required(),
  country: joi.string().max(55).required(),
  year: joi.string().max(4).required(),
});

const validate: RequestHandler = (req, res, next) => {
  const { error } = movieSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res.status(400).json({ validationErrors: error.details });
  }
};

export default { browse, read, edit, add, destroy, validate };
