import { useParams } from "react-router-dom";
import { EditExercise } from "../components/EditExercise";
import { ErrorMessage } from "../components/ErrorMessage";
import { useCategories } from "../const/categories";
import { useExercise } from "../hooks/useExercise";

export const EditExercisePage = () => {
  const { id } = useParams();
  const { exercise, loading, error } = useExercise(id);
  const { categories } = useCategories();

  if (loading) return <p>Cargando ejercicio...</p>;
  if (error) return <ErrorMessage message={error} />;

  return <EditExercise id={id} exercise={exercise} categories={categories} />;
};
