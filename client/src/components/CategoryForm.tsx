import type { ReactNode } from "react";

type CategoryData = {
  name: string;
};

interface CategoryFormProps {
  children: ReactNode;
  onSubmit: (category: CategoryData) => void;
}

function CategoryForm({ children, onSubmit }: CategoryFormProps) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        onSubmit({
          name,
        });
      }}
    >
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Nom de la catégorie
        <input
          type="text"
          name="name"
          required
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded shadow mt-4 transition"
      >
        {children}
      </button>
    </form>
  );
}

export default CategoryForm;
