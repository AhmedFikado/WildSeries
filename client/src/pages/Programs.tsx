import { useEffect, useState } from "react";
import type { Program } from "../types/Program";

const Programs = () => {
  const [series, setSeries] = useState<Program[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => res.json())
      .then((data) => setSeries(data));
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold">Séries populaires</h1>
      {series.map((el) => (
        <ul key={el.id} className="flex flex-col gap-2">
          <li>
            <img
              src={el.poster}
              alt="Poster of film"
              className="md:w-200 md:h-200"
            />
          </li>
          <li className="flex flex-col gap-2 mb-3 w-[70ch]">
            <h2 className="text-2xl font-semibold">{el.title}</h2>

            <p>{el.synopsis}</p>

            <p>{el.country}</p>

            <p>{el.year}</p>
          </li>
        </ul>
      ))}
    </>
  );
};
export default Programs;
