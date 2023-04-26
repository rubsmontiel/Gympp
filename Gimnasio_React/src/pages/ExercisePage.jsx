import { useParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { Exercise } from "../components/Exercise";
import { useExercise } from "../hooks/useExercise";

export const ExercisePage = () => {
  const { id } = useParams();
  const { exercise, loading, error, updateLikeExercise } = useExercise(id);

  if (loading) return <p>Cargando ejercicios...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="exercise">
      <Exercise exercise={exercise} updateLikeExercise={updateLikeExercise} />
    </section>
  );
};
