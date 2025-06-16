import type { ReactNode } from "react";
import { useNavigate } from "react-router";

type ProgramDeleteFormProps = {
  id: number;
  children: ReactNode;
};

function ProgramDeleteForm({ id, children }: ProgramDeleteFormProps) {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`, {
          method: "delete",
        }).then((response) => {
          if (response.status === 204) {
            navigate("/programs");
          }
        });
      }}
    >
      <button
        type="submit"
        className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded shadow transition"
      >
        {children}
      </button>
    </form>
  );
}

export default ProgramDeleteForm;
