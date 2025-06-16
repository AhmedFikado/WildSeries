import { useNavigate } from "react-router";
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "The Good Place",
    synopsis:
      "À sa mort, Eleanor Shellstrop est envoyée au Bon Endroit, un paradis fantaisiste réservé aux individus exceptionnellement bienveillants. Or Eleanor n'est pas exactement une « bonne personne » et comprend vite qu'il y a eu erreur sur la personne. Avec l'aide de Chidi, sa prétendue âme sœur dans l'au-delà, la jeune femme est bien décidée à se redécouvrir.",
    poster:
      "https://img.betaseries.com/JwRqyGD3f9KvO_OlfIXHZUA3Ypw=/600x900/smart/https%3A%2F%2Fpictures.betaseries.com%2Ffonds%2Fposter%2F94857341d71c795c69b9e5b23c4bf3e7.jpg",
    country: "USA",
    year: 2016,
    category_id: 1,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Ajouter une série
      </h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
        <ProgramForm
          defaultValue={newProgram}
          onSubmit={(programData) => {
            fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(programData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (typeof data.insertId === "number") {
                  navigate(`/programs/${data.insertId}`);
                } else {
                  navigate("/programs");
                }
              });
          }}
        >
          Ajouter
        </ProgramForm>
      </div>
    </div>
  );
}

export default ProgramNew;
