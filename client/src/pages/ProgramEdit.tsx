import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProgramForm from "../components/ProgramForm";
import type { Program } from "../types/Program";

function ProgramEdit() {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Modifier la série
      </h1>
      {program && (
        <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
          <ProgramForm
            defaultValue={program}
            onSubmit={(programData) => {
              fetch(
                `${import.meta.env.VITE_API_URL}/api/programs/${program.id}`,
                {
                  method: "put",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(programData),
                },
              ).then((response) => {
                if (response.status === 204) {
                  navigate(`/programs/${program.id}`);
                }
              });
            }}
          >
            Modifier
          </ProgramForm>
        </div>
      )}
    </div>
  );
}

export default ProgramEdit;
