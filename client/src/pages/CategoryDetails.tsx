import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CategoryDeleteForm from "../components/CategoryDeleteForm";
import type { Program } from "../types/Program";

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">{category.name}</h1>
          <Link
            to={`/categories/${category.id}/edit`}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
          >
            Modifier
          </Link>
          <CategoryDeleteForm id={category.id}>
            <span className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded shadow cursor-pointer">
              Supprimer
            </span>
          </CategoryDeleteForm>
        </div>
        <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Séries</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {category.programs.map((program) => (
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
                <p className="text-xl font-semibold text-cyan-300">
                  {program.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default CategoryDetails;
