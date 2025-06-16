import type { ReactNode } from "react";
import type { Program } from "../types/Program";

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: Program;
  onSubmit: (program: Program) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        onSubmit({
          title: formData.get("title") as string,
          synopsis: formData.get("synopsis") as string,
          poster: formData.get("poster") as string,
          country: formData.get("country") as string,
          year: formData.get("year") ? Number(formData.get("year")) : 0,
          category_id: formData.get("category_id")
            ? Number(formData.get("category_id"))
            : 0,
        });
      }}
    >
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Titre
        <input
          type="text"
          name="title"
          placeholder="Ex: The Good Place"
          defaultValue={defaultValue.title || ""}
          required
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Synopsis
        <textarea
          name="synopsis"
          placeholder="Résumé du programme"
          defaultValue={defaultValue.synopsis || ""}
          required
          minLength={10}
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <small className="text-gray-400">
          Décrivez brièvement le programme (au moins 10 caractères).
        </small>
      </label>
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Affiche (URL)
        <input
          type="url"
          name="poster"
          placeholder="https://..."
          defaultValue={defaultValue.poster || ""}
          required
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <small className="text-gray-400">
          Collez l’URL de l’image d’affiche.
        </small>
      </label>
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Pays
        <input
          type="text"
          name="country"
          placeholder="Ex: France"
          defaultValue={defaultValue.country || ""}
          required
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Année
        <input
          type="number"
          name="year"
          placeholder="Ex: 2024"
          defaultValue={defaultValue.year || ""}
          required
          min={1800}
          max={2100}
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </label>
      <label className="flex flex-col gap-1 text-cyan-200 font-medium">
        Catégorie
        <input
          type="number"
          name="category_id"
          placeholder="Ex: 1"
          defaultValue={defaultValue.category_id || ""}
          required
          min={1}
          max={2}
          className="bg-gray-900 border border-cyan-600 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <small className="text-gray-400">
          Renseignez l’ID de la catégorie (ex: 1 pour Comédie, 2 pour
          Science-Fiction).
        </small>
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

export default ProgramForm;
