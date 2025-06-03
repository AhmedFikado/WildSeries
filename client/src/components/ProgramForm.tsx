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
      <label>
        Titre
        <input
          type="text"
          name="title"
          placeholder="Ex: The Good Place"
          defaultValue={defaultValue.title || ""}
          required
        />
      </label>
      <label>
        Synopsis
        <textarea
          name="synopsis"
          placeholder="Résumé du programme"
          defaultValue={defaultValue.synopsis || ""}
          required
          minLength={10}
        />
        <small>
          Décrivez brièvement le programme (au moins 10 caractères).
        </small>
      </label>
      <label>
        Affiche (URL)
        <input
          type="url"
          name="poster"
          placeholder="https://..."
          defaultValue={defaultValue.poster || ""}
          required
        />
        <small>Collez l’URL de l’image d’affiche.</small>
      </label>
      <label>
        Pays
        <input
          type="text"
          name="country"
          placeholder="Ex: France"
          defaultValue={defaultValue.country || ""}
          required
        />
      </label>
      <label>
        Année
        <input
          type="number"
          name="year"
          placeholder="Ex: 2024"
          defaultValue={defaultValue.year || ""}
          required
          min={1800}
          max={2100}
        />
      </label>
      {/* Changement à faire: passer via un select pour sélectionner les catégories */}
      <label>
        Catégorie
        <input
          type="number"
          name="category_id"
          placeholder="Ex: 1"
          defaultValue={defaultValue.category_id || ""}
          required
          min={1}
          max={2}
        />
        <small>
          Renseignez l’ID de la catégorie (ex: 1 pour Comédie, 2 pour
          Science-Fiction).
        </small>
      </label>
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
