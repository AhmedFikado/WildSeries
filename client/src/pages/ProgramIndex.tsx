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
    <>
      <Link to={"/programs/new"}>Ajouter</Link>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <Link to={`/programs/${program.id}`}>{program.title}</Link>
            <img src={program.poster} alt={`poster of ${program.title}`} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProgramIndex;
