import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ProgramDeleteForm from "../components/ProgramDeleteForm";
import type { Program } from "../types/Program";

function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null as null | Program);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program &&
    program.id !== undefined && (
      <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          {program.title}
        </h1>
        <img
          src={program.poster}
          alt={`Poster of ${program.title}`}
          className="w-72 h-96 object-cover rounded-lg shadow-lg mb-6"
        />
        <div className="flex gap-4 mb-8">
          <Link
            to={`/programs/${program.id}/edit`}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
          >
            Modifier
          </Link>
          <ProgramDeleteForm id={program.id}>
            <span className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow cursor-pointer">
              Supprimer
            </span>
          </ProgramDeleteForm>
        </div>
      </div>
    )
  );
}

export default ProgramDetail;
