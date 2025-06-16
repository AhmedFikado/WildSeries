import { useNavigate } from "react-router";
import CategoryForm from "../components/CategoryForm";

function CategoryNew() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-6 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Ajouter une catégorie
      </h1>
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
        <CategoryForm
          onSubmit={(categoryData) => {
            fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(categoryData),
            })
              .then((response) => response.json())
              .then((data) => {
                if (typeof data.insertId === "number") {
                  navigate(`/categories/${data.insertId}`);
                } else {
                  navigate("/categories");
                }
              });
          }}
        >
          Ajouter
        </CategoryForm>
      </div>
    </div>
  );
}

export default CategoryNew;
