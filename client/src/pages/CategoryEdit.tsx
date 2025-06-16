import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CategoryForm from "../components/CategoryForm";

type Category = {
  id: number;
  name: string;
};

function CategoryEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categorys/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Modifier la catégorie
      </h1>
      {category && (
        <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
          <CategoryForm
            onSubmit={(categoryData) => {
              fetch(
                `${import.meta.env.VITE_API_URL}/api/categories/${category.id}`,
                {
                  method: "put",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(categoryData),
                },
              ).then((response) => {
                if (response.status === 204) {
                  navigate(`/categories/${category.id}`);
                }
              });
            }}
          >
            Modifier
          </CategoryForm>
        </div>
      )}
    </div>
  );
}

export default CategoryEdit;
