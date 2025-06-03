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
      <>
        <h1>{program.title}</h1>
        <img src={program.poster} alt={`Poster of ${program.title}`} />
        <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
        <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
      </>
    )
  );
}

export default ProgramDetail;
