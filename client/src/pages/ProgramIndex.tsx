import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Program } from "../types/Program";

function ProgramIndex() {
  const [programs, setPrograms] = useState([] as Program[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs`)
      .then((response) => response.json())
      .then((data: Program[]) => {
        setPrograms(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Séries</h1>
        <Link
          to={"/programs/new"}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
        >
          Ajouter
        </Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {programs.map((program) => (
          <li
            key={program.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <Link to={`/programs/${program.id}`} className="block p-4">
              <img
                src={program.poster}
                alt={`poster of ${program.title}`}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold text-cyan-300">
                {program.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramIndex;
