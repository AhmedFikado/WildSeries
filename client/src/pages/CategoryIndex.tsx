import { useEffect, useState } from "react";
import { Link } from "react-router";

type Category = {
  id: number;
  name: string;
};

function CategoryIndex() {
  const [categories, setCategories] = useState([] as Category[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data: Category[]) => {
        setCategories(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cyan-400">Catégories</h1>
        <Link
          to={"/categories/new"}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
        >
          Ajouter
        </Link>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform"
          >
            <Link
              to={`/categories/${category.id}`}
              className="block text-xl font-semibold text-cyan-300"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryIndex;
