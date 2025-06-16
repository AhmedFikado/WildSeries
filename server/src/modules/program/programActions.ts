// Some data to make the trick

const programs = [
  {
    id: 1,
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
  },
  {
    id: 2,
    title: "Dark",
    synopsis:
      "Quatre familles affolées par la disparition d'un enfant cherchent des réponses et tombent sur un mystère impliquant trois générations qui finit de les déstabiliser.",
    poster:
      "https://img.betaseries.com/zDxfeFudy3HWjxa6J8QIED9iaVw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2Fc47135385da176a87d0dd9177c5f6a41.jpg",
    country: "Allemagne",
    year: 2017,
  },
];

// Declare the action

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
// Export it to import it somewhere else

export default { browse, read, edit, add, destroy, validate };
