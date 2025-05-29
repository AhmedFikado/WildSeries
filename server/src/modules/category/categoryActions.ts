// Some data to make the trick

import type { RequestHandler } from "express";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions
const browse: RequestHandler = (req, res) => {
  const query = (req.query.q as string).toLowerCase();
  if (req.query.q != null) {
    const filteredCategory = categories.filter((category) =>
      category.name.toLowerCase().includes(query),
    );
    res.json(filteredCategory);
  } else {
    res.json(categories);
  }
};

/* Here you code */
const read: RequestHandler = (req, res) => {
  const parseId = Number.parseInt(req.params.id);
  const category = categories.find((p) => p.id === parseId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};
// Export them to import them somewhere else

/* Here you export */
export default { browse, read };
